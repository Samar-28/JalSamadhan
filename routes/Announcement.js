const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Announce = require('../models/Announce');

const JWT_SECRET = "samplekey";


router.post('/announce',[
    body('title', 'Enter a valid Title').isLength({ min: 10}),
    body('description', 'Enter a valid Description').isLength({min: 20})
], async (req, res) => {
    let success = false;
        try {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.json({ success, error: errors.array()[0].msg });
        }
        await Announce.create({
            title: req.body.title,
            description: req.body.description
        })
        success=true;
        return res.json({success,msg:"Announcement Successfully Added"});

} catch (error) {
    console.log(error);
    return res.send({error: "Error occured" })
}
})

router.get('/getAnnounce',async (req,res)=> {
    let success=false;
    try {
        let announcements = await Announce.find();
        success=true;
        return res.json({success,announcements})
    } catch (error) {
        res.json({success,error:"Error occured"});
    }
})


module.exports = router