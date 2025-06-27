const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const SECRET_KEY = "MERI_CUTU_MINNU";
const user = require('../models/user');
const personal = require('../models/userData');

const signup = async (req, res) => {
    const { gmail, password, gender, caste } = req.body;

    try {
        const exist = await user.findOne({ gmail: gmail });
        if (exist) {
            return res.status(409).send('User Already Exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await user.create({
            gmail,
            password: hashedPassword,
            gender,
            caste
        });

        
        res.status(201).send({
            message: 'Signup Successful',
            user: {
                gmail: newUser.gmail,
                gender: newUser.gender,
                caste: newUser.caste
            }
        });
    } catch (error) {
        res.status(500).send('Error during signup');
    }
};

const signin = async (req, res) => {
    const { gmail, password } = req.body;

    try {
        const person = await user.findOne({ gmail: gmail });
        if (!person) {
            return res.status(404).send('Account not found. Please sign up.');
        }
        
        const name = await personal.findOne({ gmail: gmail });

        const check = await bcrypt.compare(password, person.password);
        if (check) {
            const token = JWT.sign({ gmail: person.gmail,fullName: name?.fullName, }, SECRET_KEY, { expiresIn: '1h' });
            res.status(200).send({ message: 'Login Successful', token });
        } else {
            res.status(401).send('Incorrect Password');
        }
    } catch (error) {
        res.status(500).send('Error during signin');
    }
};

module.exports = { signup, signin };
