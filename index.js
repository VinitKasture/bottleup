require('dotenv').config();
const express = require('express');
const path = require('path')
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.MONGODB_URL, () => { console.log('Connected to database...') })

// Express body parser
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', "ejs")
app.use(expressLayouts)

//Routes
app.use(require('./routes/usersRoute'))

app.use('/', (req, res) => {
    res.sendFile('/index.html');
})

app.listen(process.env.PORT || 3000, () => { console.log('Listening') })