const express = require('express');
const {signin, signup} = require('../controllers/userController');


const route = express.Router();

route.post('/signin',signin)
route.post('/signup',signup)


module.exports = route;