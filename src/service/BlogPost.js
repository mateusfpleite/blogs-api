const Sequelize = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../models');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const createBlogPost = async ({ title, content, email, categoryIds }) => {
    try {
        const result = await sequelize.transaction(async (transaction) => {
            const getUserId = (await User.findOne({ where: { email } })).id;
            const now = new Date();
            const blogPostInfo = {
                title, content, userId: getUserId, published: now, updated: now,
            };
            const insertBlogPost = await BlogPost.create(blogPostInfo, { transaction });
            const postCategoryInfo = categoryIds.map(
                (categoryId) => ({ postId: insertBlogPost.null, categoryId }),
            );
            await PostCategory.bulkCreate(postCategoryInfo, { transaction });
            return insertBlogPost;
        });
        return { type: null, message: result };
    } catch (error) {
        return { type: 'BAD_REQUEST', message: '"categoryIds" not found' };
    }
};

const getAllPosts = async () => {
    const query = await BlogPost.findAll(
        {
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'displayName', 'email', 'image'],
                }, {
                    model: Category,
                    as: 'categories',
                }],
        },
    );
    return query;
};

const getPostById = async (id) => {
    const query = await BlogPost.findByPk(
        id, {
        include: [
            {
                model: User,
                as: 'user',
                attributes: ['id', 'displayName', 'email', 'image'],
            }, {
                model: Category,
                as: 'categories',
            }],
    },
    );
    return query;
};

const updatePost = async ({ id, email, title, content }) => {
    const userId = (await User.findOne({ where: { email } })).id;
    const idToBeUpdated = (await BlogPost.findByPk(id)).userId;
    const now = new Date();
    if (userId !== idToBeUpdated) { return { type: 'UNAUTHORIZED', message: 'Unauthorized user' }; }
    const update = await BlogPost.update({ title, content, updated: now }, { where: { id } });
    return { type: null, message: update };
};

module.exports = { createBlogPost, getPostById, getAllPosts, updatePost };