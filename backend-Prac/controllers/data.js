const person = require('../models/userData');
const user = require('../models/user');


const getData = async (req, res) => {
    const currentUser = await user.findOne({ gmail: req.user.gmail });
    let oppositeGender = '';
    if (currentUser.gender === 'Male') {
        oppositeGender = 'Female';
    } else if (currentUser.gender === 'Female') {
        oppositeGender = 'Male';
    } else {
        return res.status(400).send('Invalid gender for current user');
    }
    const data = await person.find({ gender: oppositeGender });
    res.send(data);
}


const postData = async (req, res) => {
    const { fullName, gender, gmail, height, body_colour, age, occupation, salary, caste } = req.body;
    const userData = { fullName, gender, gmail, height, body_colour, age, occupation, salary, caste };
    await person.create(userData);
    res.send(userData);
}

const personalData = async (req, res) => {
    const {gmail} = req.params;
    const currentUser = await person.findOne({ gmail: gmail });
    if (!currentUser) {
        return res.status(404).send('User not found');
    }
    res.send(currentUser);
}

const updatePersonalData = async (req, res) => {
    try {
        const gmail = req.user.gmail;
        const updateFields = {};

        for (let key in req.body) {
            if (req.body[key] !== undefined && req.body[key] !== null && req.body[key] !== '') {
                updateFields[key] = req.body[key];
            }
        }

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).send('No valid fields provided for update.');
        }

        const updatedUser = await person.findOneAndUpdate(
            { gmail: gmail },
            { $set: updateFields },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).send('User not found');
        }

        res.send(updatedUser);
    } catch (error) {
        res.status(500).send('Server error');
    }
}

module.exports = { getData, postData, updatePersonalData, personalData };
