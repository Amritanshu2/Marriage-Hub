const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    gmail:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    gender:{
        type:String,
        required: true,
        trim: true
    },
    caste:{
        type:String,
        required: true
    }
})

const user = new mongoose.model('user',schema);

module.exports = user;