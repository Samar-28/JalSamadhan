const mongoose = require('mongoose')
const { Schema } = mongoose;
const HeatSchema = new Schema({
    latitude:{
        type: String,
        required: true,
    },
    longitude:{
        type: String,
        required: true,
    },
    
    category:{
        type: String,
        required: true,
    }
});
module.exports = mongoose.model('Heat', HeatSchema);