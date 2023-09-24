const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Resource = require('../models/Resource');
const isAuthenticated = require('../middleware/isAuthenticated');
const User = require('../models/User');
const Contributors = require('../models/Contributors');


router.post('/contribute',isAuthenticated,async (req, res) => {
    let success = false;
        try {
        let con = await Contributors.create({
            name: req.body.name,
            phone: req.body.phone,
            address:req.body.address,
            category: req.body.category,
            aadhar: req.body.aadhar,
            pan: req.body.pan,
            doc: req.body.doc,
        })
        success=true;
        return res.json({success,msg:"Request Submitted Successfully"});

} catch (error) {
    return res.json({success,error: "Error occured" });
}
})

router.get('/unacceptedContributors',async (req,res)=>{
    let contributors= await Contributors.find({isApproved: false});
    return res.json({contributors});
})

router.get('/acceptedContributors',async (req,res)=>{
    let contributors= await Contributors.find({isApproved: true});
    return res.json({contributors});
})

router.put('/acceptcontri/:id',async (req,res)=>{
    let success=false;
    try {
        let reqId = req.params.id
        let request = await Contributors.findByIdAndUpdate(reqId,{isApproved:true});
        success = true;
        return res.json({success,request});
    } catch (error) {
        res.json({success,error:"Error Occured"});
    }
})

router.delete('/denycontri/:id',async(req,res)=>{
    let success = false;
    try {
        await Contributors.findByIdAndDelete(req.params.id);
        success = true;
        res.json({success,msg:"Resource Request successfuly denied"})
    } catch (error) {
        res.json({success,error: "error occured"})
    }
})

module.exports = router