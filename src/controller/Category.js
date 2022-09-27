const CategoryService = require('../service/Category');

const createCategory = async (req, res) => {
const { name } = req.body;
const result = await CategoryService.createCategory(name);
return res.status(201).json({ id: result.null, name });
};

module.exports = { createCategory };