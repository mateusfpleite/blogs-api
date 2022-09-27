const UserService = require('../service/User');

const getUser = async (req, res) => {
    const { email, password } = req.body;
    const result = await UserService.getUser(email, password);
    if (result.type) { res.status(400).json({ message: result.message }); }
    return res.status(200).json({ token: result.message });
};

const createUser = async (req, res) => {
    const { displayName, email, password, image } = req.body;
    const result = await UserService.createUser(displayName, email, password, image);
    if (result.type) return res.status(409).json({ message: result.message });
    return res.status(201).json({ token: result.message });
};

const getAllUsers = async (req, res) => {
    const result = await UserService.getAllUsers();
    return res.status(200).json(result);
};

module.exports = { getUser, createUser, getAllUsers };
