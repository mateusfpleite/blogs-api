const BlogPostService = require('../service/BlogPost');

const createBlogPost = async (req, res) => {
    const info = { ...req.body, email: req.headers.user };
    const result = await BlogPostService.createBlogPost(info);
    if (result.type) return res.status(400).json({ message: result.message });
    const id = result.message.null;
    return res.status(201).json({ ...result.message.dataValues, id });
};

module.exports = { createBlogPost };