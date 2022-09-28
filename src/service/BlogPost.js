const Sequelize = require('sequelize');
const { BlogPost, PostCategory, User } = require('../models');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const createBlogPost = async ({ title, content, email, categoryIds }) => {
    try {
        const result = await sequelize.transaction(async (transaction) => {
            const getUserId = (await User.findOne({ where: { email } })).id;
            const now = new Date();
            const blogPostInfo = { 
                title, content, userId: getUserId, published: now, updated: now };
            const insertBlogPost = await BlogPost.create(blogPostInfo, { transaction });
            const postCategoryInfo = categoryIds.map(
                (categoryId) => ({ postId: insertBlogPost.null, categoryId }),
            );
            await PostCategory.bulkCreate(postCategoryInfo, { transaction });
            return insertBlogPost;
        });
        return { type: null, message: result };
    } catch (error) {
        console.log(error.message);
        return { type: 'BAD_REQUEST', message: '"categoryIds" not found' };
    }
};

module.exports = { createBlogPost };