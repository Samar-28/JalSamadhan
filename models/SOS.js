const mongoose = require('mongoose')
const { Schema } = mongoose;
const sosSchema = new Schema({
    category:{
        type: String,
        required: true,
    },
    details:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true
    },
    longitude:{
        type: String,
        required: true
    },
    latitude:{
        type: String,
        required: true
    }
}, {
    timestamps: true,
  });
module.exports = mongoose.model('SOS', sosSchema);