const CategoryService = require('../service/Category');

const createCategory = async (req, res) => {
const { name } = req.body;
const result = await CategoryService.createCategory(name);
return res.status(201).json({ id: result.null, name });
};

const getAllCategories = async (_req, res) => {
    const result = await CategoryService.getAllCategories();
    return res.status(200).json(result);
};

module.exports = { createCategory, getAllCategories };