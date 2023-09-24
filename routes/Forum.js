const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const isAuthenticated = require("../middleware/isAuthenticated");
const Forum = require('../models/Forum');
const User = require('../models/User');

// new forum endpoint

router.post('/create',isAuthenticated, [
    body('title', 'Enter a valid title').isLength({min:10}),
    body('state', 'Enter a valid state').isLength({min:3}),
    body('description','Enter a valid description').isLength({min: 20})
], async (req, res) => {
    let success = false;
        try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ success, error: errors.array()[0].msg });
        }
        let forum = await Forum.create({
            userid: req.user.id,
            state: req.body.state,
            title: req.body.title,
            image:req.body.image,
            description: req.body.description 
        })
        success = true;
        res.json({ success,forum})
    } catch (error) {
        console.log(error);
        return res.send({ success, error: "Error occured while submitting complaint" })
    }
    })

 
router.get('/getall',async (req,res)=> {
    let success = false
    try {
        let forums = await Forum.find();
        success=true;
        res.json({success,forums})
    } catch (error) {
        return res.send({ success, error: "Error occured" })
    }
})


// comment endpoint 


router.put('/comment/:id', isAuthenticated, async (req, res) => {
    try {
        const forumid = req.params.id
        const { comment } = req.body;
        const info = await Forum.findById(forumid);
        let comms = info.comments;
        const user = await User.findById(req.user.id);
        comms.push({ comment, name: user.name});
        const forum = await Forum.findByIdAndUpdate(forumid, { comments: comms });
        res.json({ success: true,forum});
    } catch (error) {
        res.json({ success: false, error: "Internal Server Error" })
    }
})


router.put('/upvote/:id',isAuthenticated,async (req, res) => {
    try {
        const { forumid } = req.params;
        const userId = req.user.id;
        const forum = await Forum.findById(forumid);
        const isUpvoted = Forum.upvotes.get(userId);
        let upvote
        if (isUpvoted) {
            forum.upvotes.delete(userId);
            upvote = false
        } else {
            forum.upvotes.set(userId, true);
            upvote = true
        }
        await Forum.findByIdAndUpdate(forumid, {
            upvotes: forum.upvotes
        });
        return res.json({success: true, upvote,upvotes:forum.upvotes.size});
    } catch (err) {
        res.json({success: false,error: err});
    }
})
router.get('/getupvotes/:id',isAuthenticated, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const forum = await Forum.findById(id);
        const isUpvoted = Forum.upvotes.get(userId);
        return res.json({success: true,isUpvoted,upvotes:forum.upvotes.size});
    } catch (err) {
        res.json({success:false,error:err});
    }
})
module.exports = router