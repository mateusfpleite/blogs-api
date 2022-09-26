const { User } = require('../models');
const tokenGenerator = require('../utils/tokengenerator');

const getUser = async (email, password) => {
   const result = await User.findOne({
        where: {
            email,
            password,
        },
    });
    if (result === null) { return { type: 'BAD_REQUEST', message: 'Invalid fields' }; }
    const newToken = tokenGenerator(email);
    return { type: null, message: newToken };
};

module.exports = { getUser };