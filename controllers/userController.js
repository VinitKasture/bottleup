const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Models
const User = require('../models/User');

const registerUser = async(req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];
    //Validation
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields!' })
    }
    if (password.length < 6) {
        errors.push({ msg: 'Password should be atleast 6 characters!' })
    }
    if (password != password2) {
        errors.push({ msg: 'Passwords do not match!' })
    }
    if (errors.length > 0) {
        res.render('signup', { errors, name, email, password, password2 })
    } else {
        const userExists = await User.findOne({ email })
        if (userExists) {
            errors.push({ msg: 'Email is already registered!' })
            res.render('signup', { errors, name, email, password, password2 })
        } else {
            //Hash Password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt)
            const newUser = new User({ name, email, password: hashedPassword });
            newUser.save()
            res.redirect('/api/login')
        }

    }
}

const loginUser = async(req, res) => {
    let errors = []
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
        errors.push({ msg: 'Email is not registered!' })
        res.render('login', { errors, email, password })
    } else {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            res.redirect('/')
        } else {
            errors.push({ msg: 'Wrong Password!' })
            res.render('login', { errors, email })
        }
    }
}

module.exports = { registerUser, loginUser }