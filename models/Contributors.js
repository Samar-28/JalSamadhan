const mongoose = require('mongoose')
const { Schema } = mongoose;
const ContributorSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    phone:{
        type: Number,
        required: true,
        validate: {
            validator: function(val) {
                return val.toString().length === 10
            },
            message: val => 'Mobile Number has to be 10 digits'
        }
    },
    address:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    }
    ,
    aadhar:{
        type: String,
        required: true
    },
    pan:{
        type: String,
        required: true
    },
    doc:{
        type: String,
        required: true
    },
    isApproved:{
        type: Boolean,
        default: false
    }
});
module.exports = mongoose.model('Contributors', ContributorSchema);