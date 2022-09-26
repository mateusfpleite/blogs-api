const express = require('express');
const User = require('./controller/User');
const validateLogin = require('./middlewares/loginValidation');

// ...

const app = express();

app.use(express.json());

app.use('/login', validateLogin, User.getUser);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
