const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const JWT_SECRET = "samplekey";


// User SignUp endpoint 

router.post('/usersignup', [
    body('name', 'Enter a valid name').isLength({ min: 3}),
    body('phone', 'Enter a valid phone number').isLength(10)
], async (req, res) => {
        try {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.json({ success, error: errors.array()[0].msg });
        }
        let user = await User.findOne({ phone: req.body.phone });
        if (user) {
            return res.json({ success, error: "Phone Number Already Registered , Please Try Sign in" })
        }
        user = await User.create({
            name: req.body.name,
            phone: req.body.phone,
            state: req.body.state
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authtoken,user})
    } 
    catch (error) {
        console.log(error);
        return res.send({ success, error: "Error occured" })
    }
})


// User Login endpoint

router.post('/userlogin', [
    body('phone', 'Enter a valid phone number').isLength(10)
], async (req, res) => {
        try {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ success, error: errors.array()[0].msg });
        }
        let user = await User.findOne({ phone: req.body.phone });
        if (!user) {
            return res.json({ success, error: "Phone Number Not registered !" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success,authtoken,user})
    } catch (error) {
        console.log(error);
        return res.send({ success, error: "Error occured" })
    }
    })


module.exports = router
