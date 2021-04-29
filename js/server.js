const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
let mongodb = require('mongodb');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/html/index.html')
});

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})

// database information
mongoose.connect("mongodb+srv://marinos:open123@cluster0.7pdeb.mongodb.net/Cluster0?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true});

// create schema
const { Schema } = mongoose;

// schema for new Classes
const CLASS  = new Schema({
    term: {type: String, required: true},
    courseName: {type: String, required: true},
    courseNumber: {type: Number, required: true},
    classDate: {type: Date, default: Date.now},
    classDescription: {type: String, required: true},
    capacity: {type: Number, required: true}
});

// schema for new users
const NEWUSER = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    userName: {type: String, required: true},
    password: {type: String, required: true},
    passwordConfirm: {type: String, required: true},
    userType: {type: String, required: true},
    classes: {type: [CLASS]}
});

// create model
let userCreate = mongoose.model("userCreate", NEWUSER);
let classCreate = mongoose.model("classCreate", CLASS);


