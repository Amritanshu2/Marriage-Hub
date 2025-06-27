const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const dataroute = require('./routes/person');
const userroute = require('./routes/user')

const app = express();

mongoose.connect('mongodb://localhost:27017/Shadi_com').then(()=>{console.log('MongoDB connected');
})
app.use(cors());
app.use(express.json());
app.use('/person',dataroute)
app.use('/user',userroute)



app.listen(5000,()=>{console.log('running on port 5000')})