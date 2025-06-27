const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    fullName:{
        type:String,
        trim: true,
        required: true
    },
    gender:{
        type:String,
        required: true
    },
    gmail:{
        type:String,
        required: true,
        unique: true
    },
    height:{
        type: Number,
        required:true
    },
    body_colour:{
        type:String,
        required: true
    },
    age:{
        type:Number,
        required: true
    },
    occupation:{
        type:String,
        required: true
    },
    salary:{
        type: Number,
        required: true
    },
    caste:{
        type: String,
        required: true
    }  
})

const person = mongoose.model('person',schema);

module.exports = person;