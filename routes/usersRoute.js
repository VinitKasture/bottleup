const express = require('express');
const router = express.Router();

//Controllers
const { registerUser, loginUser } = require('../controllers/userController')

//Register
router.get('/api/register', (req, res) => { res.render('signup') })
router.post('/api/register', registerUser)

//Login
router.get('/api/login', (req, res) => { res.render('login') })
router.post('/api/login', loginUser)

module.exports = router;