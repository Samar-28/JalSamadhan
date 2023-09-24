const mongoose = require('mongoose')
const { Schema } = mongoose;
const AnnounceSchema = new Schema({
    title:{
        type: String,
        required: true,
        min: 10
    },
    description:{
        type: String,
        required: true,
        min: 20
    },
});
module.exports = mongoose.model('Announcements', AnnounceSchema);