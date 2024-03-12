const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = "shivaprasadrameshprabhupriya";
const expiresIn = "1h";
const verifyToken=require('../verifyToken');
const authModelSchema = require('../models/authModel');

const generateAuthToken = (_id, email) => {
    return jwt.sign({ _id, email }, secretKey, {
        expiresIn,
    });
};

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const userFound = await authModelSchema.findOne({ email });

        if (userFound && userFound._id) {
            const passwordMatch = await bcrypt.compare(password, userFound.password);

            if (passwordMatch) {
                const authToken = generateAuthToken(userFound._id, userFound.email);
                res.json({ status: "success", data: { authToken, userFound } });
            } else {
                res.json({ status: "ok", data: { userFound, response: "Password does not match" } });
            }
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', data: 'Something went wrong' });
    }
});
router.get('/dashboard',verifyToken,async(req, res) => {
    if(req && req.decodedToken){
        res.json({status:'success',data:"ok"});
    }else{
        res.json({status:'error',data:"fail"});
    }

})

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await hashPassword(password);

        const registerUserData = {
            username,
            email,
            password: hashedPassword,
        };

        const userStoredData = await authModelSchema.create(registerUserData);

        res.json({ status: "success", data: userStoredData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', data: 'Something went wrong' });
    }
});

module.exports = router;
