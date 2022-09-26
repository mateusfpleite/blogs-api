const UserService = require('../service/User'); 

const getUser = async (req, res) => {
const { email, password } = req.body;
const result = await UserService.getUser(email, password);
console.log(result);
if (result.type) { res.status(400).json({ message: result.message }); }
return res.status(200).json({ token: result.message });
};

module.exports = { getUser };