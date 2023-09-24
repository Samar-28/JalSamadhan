const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Resource = require('../models/Resource');
const isAuthenticated = require('../middleware/isAuthenticated');
const User = require('../models/User');
router.post('/createreq',[
    body('address', 'Enter a valid address').isLength({ min: 5}),
    body('description', 'Enter a valid Description').isLength({min: 20})
],isAuthenticated,async (req, res) => {
    let success = false;
        try {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.json({ success, error: errors.array()[0].msg });
        }
        let user = await User.findById(req.user.id)
        await Resource.create({
            phone: user.phone,
            name: user.name,
            category: req.body.category,
            address: req.body.address,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            description: req.body.description
        })
        success=true;
        return res.json({success,msg:"Request Submitted Successfully"});

} catch (error) {
    console.log(error);
    return res.send({error: "Error occured" })
}
})

router.get('/getApprovedreqs',async (req,res)=> {
    let success=false;
    try {
        let request = await Resource.find({isApproved: true});
        success=true;
        return res.json({success,request})
    } catch (error) {
        res.json({success,error:"Error occured"});
    }
})


router.get('/getunApprovedreqs',async (req,res)=> {
    let success=false;
    try {
        let request = await Resource.find({isApproved: false});
        success=true;
        return res.json({success,request});
    } catch (error) {
        res.json({success,error:"Error occured"});
    }
})

router.put('/accept/:id',async (req,res)=>{
    let success=false;
    try {
        let reqId = req.params.id;   
        console.log(1)
        let request = await Resource.findByIdAndUpdate(reqId,{isApproved:true});
        success = true;
        res.json({success,request});
    } catch (error) {
        res.json({success,error:"Error Occured"});
    }
})

router.delete('/deny/:id',async(req,res)=>{
    let success = false;
    try {
        await Resource.findByIdAndDelete(req.params.id);
        success = true;
        res.json({success,msg:"Resource Request successfuly denied"})
    } catch (error) {
        res.json({success,error: "error occured"})
    }
})
module.exports = router