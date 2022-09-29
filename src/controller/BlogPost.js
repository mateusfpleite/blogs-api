const BlogPostService = require('../service/BlogPost');

const createBlogPost = async (req, res) => {
    const info = { ...req.body, email: req.headers.user };
    const result = await BlogPostService.createBlogPost(info);
    if (result.type) return res.status(400).json({ message: result.message });
    const id = result.message.null;
    return res.status(201).json({ ...result.message.dataValues, id });
};

const getAllPosts = async (req, res) => {
    const result = await BlogPostService.getAllPosts(req.params.id);
    return res.status(200).json(result);
};

const getPostById = async (req, res) => {
    const result = await BlogPostService.getPostById(req.params.id);
    if (!result) { return res.status(404).json({ message: 'Post does not exist' }); }
    return res.status(200).json(result);
};

const updatePost = async (req, res) => {
    const { id } = req.params;
    const email = req.headers.user;
    const update = await BlogPostService.updatePost({ id, email, ...req.body });
    if (update.type) { return res.status(401).json({ message: update.message }); }
    getPostById(req, res);
};

module.exports = { createBlogPost, getPostById, getAllPosts, updatePost };