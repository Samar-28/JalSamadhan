const express = require('express');
const User = require('../models/User');
const Report = require('../models/Complaint');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const isAuthenticated = require("../middleware/isAuthenticated");
const Complaint = require('../models/Complaint');
const SOS = require('../models/SOS');
const Heat = require('../models/HeatmapData');


// new complaint endpoint
router.post('/complaint',isAuthenticated, [
    body('description', 'Enter a valid description').isLength({min: 15}),
    body('address','Enter a valid address').isLength({min: 10})
], async (req, res) => {
    let success = false;
        try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ success, error: errors.array()[0].msg });
        }
        let user = await User.findById(req.user.id);
        let report = await Report.create({
            name: user.name,
            image: req.body.image,
            state: user.state,
            phone: user.phone,
            address: req.body.address,
            category: req.body.category,
            description: req.body.description,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
             userid: user._id
        })
        await Heat.create({
            category: report.category,
            longitude: report.longitude,
            latitude: report.latitude
        })
        success = true;
        res.json({ success,msg : "Complaint Registered successfully!" })
    } catch (error) {
        console.log(error);
        return res.send({ success, error: "Error occured while submitting complaint" })
    }
    })
    router.get('/resolvedComplaints',async (req,res)=>{
        let success=false;
        try {   
            let complaints = await Complaint.find({isResolved:true,state:req.header('state')});
            success = true;
            return res.json({success,complaints});
        } catch (error) {
            res.json({success,error:"Error Occured"});
        }
    })

    router.get('/unresolvedComplaints',async (req,res)=>{
        let success=false;
        try {   
            let complaints = await Complaint.find({isResolved:false,state:req.header('state')});
            success = true;
            res.json({success,complaints});
        } catch (error) {
            res.json({success,error:"Error Occured"});
        }
    })

    router.put('/resolveComplaint/:id',async (req,res)=>{
        let success=false;
        try {
            let complaintId = req.params.id   
            let complaint = await Complaint.findByIdAndUpdate(complaintId,{isResolved:true});
            await Heat.findOneAndDelete({latitude: complaint.latitude,longitude: complaint.longitude})
            success = true;
            res.json({success,complaint});
        } catch (error) {
            res.json({success,error:"Error Occured"});
        }
    })

    router.post('/sos',isAuthenticated, async (req, res) => {
        let success = false;
            try {
            const errors = validationResult(req);
            let user = await User.findById(req.user.id);
            let sos = await SOS.create({
                name: user.name,
                image: req.body.image,
                state: user.state,
                phone: user.phone,
                category: req.body.category,
                details: req.body.details,
                longitude: req.body.longitude,
                latitude: req.body.latitude,
            })
            await Heat.create({
                category: sos.category,
                longitude: sos.longitude,
                latitude: sos.latitude
            })
            success = true;
            res.json({ success,msg : "Alert successful!" })
        } catch (error) {
            console.log(error);
            return res.send({ success, error: "Error occured while submitting complaint" })
        }
        })

        router.get('/getSosDetails',async (req,res)=>{
            let success=false;
            try {   
                let sos = await SOS.find();
                success = true;
                return res.json({success,sos});
            } catch (error) {
                res.json({success,error:"Error Occured"});
            }
        })

        router.delete('/resolveSOS/:id',async (req,res)=>{
            let success=false;
            try {
                let sosId = req.params.id   
                let sos = await SOS.findByIdAndDelete(sosId);
                await Heat.findOneAndDelete({latitude: sos.latitude,longitude: sos.longitude})
                success = true;
                res.json({success,sos});
            } catch (error) {
                res.json({success,error:"Error Occured"});
            }
        })
        

module.exports = router
