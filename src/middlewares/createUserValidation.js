const createUserValidation = (req, res, next) => {
    const { displayName, email, password } = req.body;
    const minNameLength = 8;
    const minPasswordLength = 6;
    const emailValidation = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
    if (displayName.length < minNameLength) {
        return res.status(400).json(
            { message: '"displayName" length must be at least 8 characters long' },
);
    }
    if (!emailValidation) {
        return res.status(400).json({ message: '"email" must be a valid email' });
    }
    if (password.length < minPasswordLength) {
        return res.status(400).json(
            { message: '"password" length must be at least 6 characters long' },
);
    }
    return next();
};

module.exports = createUserValidation;