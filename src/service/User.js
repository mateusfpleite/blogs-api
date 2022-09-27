const { User } = require('../models');
const tokenGenerator = require('../utils/tokengenerator');

const getUser = async (email, password) => {
    const result = await User.findOne({
        where: {
            email,
            password,
        },
    });
    if (!result) { return { type: 'BAD_REQUEST', message: 'Invalid fields' }; }
    const newToken = tokenGenerator(email);
    return { type: null, message: newToken };
};

const createUser = async (displayName, email, password, image = null) => {
    const checkDuplicate = await User.findOne({ where: { email } });
    if (checkDuplicate) {
        return {
            type: 'CONFLICT', message: 'User already registered',
        };
    }
    await User.create({ displayName, email, password, image });
    const newToken = tokenGenerator(email);
    return { type: null, message: newToken };
};

const getAllUsers = async () => {
    const result = await User.findAll();
    return result.map(({ id, displayName, email, image }) => ({ id, displayName, email, image }));
};

const getUserById = async (id) => {
    const result = await User.findByPk(id, { attributes: { exclude: ['password'] } });
    if (!result) { return { type: 'NOT_FOUND', message: 'User does not exist' }; }
    return { type: null, message: result };
};

module.exports = { getUser, createUser, getAllUsers, getUserById };