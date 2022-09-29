const express = require('express');
const User = require('./controller/User');
const Category = require('./controller/Category');
const BlogPost = require('./controller/BlogPost');
const createUserValidation = require('./middlewares/createUserValidation');
const createCategoryValidation = require('./middlewares/createCategoryValidation');
const validateLogin = require('./middlewares/loginValidation');
const tokenValidation = require('./middlewares/tokenValidation');
const validateBlogPostFields = require('./middlewares/createBlogPostValidation');

const app = express();

app.use(express.json());

app.post('/login', validateLogin, User.getUser);

app.post('/user', createUserValidation, User.createUser);

app.get('/user', tokenValidation, User.getAllUsers);

app.get('/user/:id', tokenValidation, User.getUserById);

app.post('/categories', createCategoryValidation, tokenValidation, Category.createCategory);

app.get('/categories', tokenValidation, Category.getAllCategories);

app.post('/post', validateBlogPostFields, tokenValidation, BlogPost.createBlogPost);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
