var express = require('express');
var router = express.Router();



const { createuser, signup, signin, profile} = require('../controllers/indexController');
const { isloggedIn } = require('../utils/islogeIn');

router.get('/profile',isloggedIn, profile);

router.post('/createUser', createuser);

router.post('/signup', signup);

router.post('/signin', signin);

//gentare jwt token

module.exports = router;