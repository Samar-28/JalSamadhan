const express = require('express');
const router = express.Router();
const HeatmapData = require('../models/HeatmapData');
router.get('/heat',async (req,res)=>{
    try {
    let locations = new Map();
    let data = await HeatmapData.find();
    for(let i in data){
        let arr = [];
       if(locations.get(data[i].category)!=undefined){
            arr.push(locations.get(data[i].category));
       }
       arr.push({lat: data[i].latitude ,lng: data[i].longitude});
       locations.set(data[i].category,arr);
    }
    res.json({locations: [...locations]});

} catch (error) {
    console.log(error);
    return res.send({error: "Error occured" })
}
})


module.exports = router