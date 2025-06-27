const express = require('express');
const {getData, postData, castedata, personalData} = require('../controllers/data');
const route = express.Router();
const JWT = require('jsonwebtoken');
const SECRET_KEY = "MERI_CUTU_MINNU";

const auth =(req,res,next)=>{
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).send('Access Denied. No token provided.');
    }
    try{
        const verified = JWT.verify(token,SECRET_KEY);
        req.user = verified;
        next();
    }
    catch(err){
        return res.status(400).send('Invalid Token');
    }

}

route.get('/',auth,getData)
route.post('/',auth,postData)
route.get('/personal/:gmail', auth, personalData)


module.exports = route;