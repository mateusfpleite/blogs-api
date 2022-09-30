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

const deletePost = async (req, res) => {
   const { type, message } = await BlogPostService.deletePost(req.params.id, req.headers.user);
   if (type) { return res.status(type).json({ message }); }
   return res.status(204).end();
};

const getPostsByQuery = async (req, res) => {
    const result = await BlogPostService.findPostByQuery(req.query.q); 
    res.status(200).json(result);
};

module.exports = { 
    createBlogPost, getPostById, getAllPosts, updatePost, deletePost, getPostsByQuery };