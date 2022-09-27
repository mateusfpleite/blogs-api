const express = require('express');
const User = require('./controller/User');
const createUserValidation = require('./middlewares/createUserValidation');
const validateLogin = require('./middlewares/loginValidation');
const tokenValidation = require('./middlewares/tokenValidation');

const app = express();

app.use(express.json());

app.post('/login', validateLogin, User.getUser);

app.post('/user', createUserValidation, User.createUser);

app.get('/user', tokenValidation, User.getAllUsers);

app.get('/user/:id', tokenValidation, User.getUserById);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
