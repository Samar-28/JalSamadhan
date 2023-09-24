const mongoose = require('mongoose')
const { Schema } = mongoose;
const ResourceSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    phone:{
        type: Number,
        required: true
    },
    address:{
        type: String,
        required: true,
        min:5
    },
    longitude:{
        type: String,
        required: true,
    },
    latitude:{
        type: String,
        required: true,
    },
    category: {
        type: String
    },
    description:{
        type: String,
        required: true,
        min: 20
    },
    isApproved:{
        type: Boolean,
        default: false
    }
});
module.exports = mongoose.model('ResourseRequests', ResourceSchema);