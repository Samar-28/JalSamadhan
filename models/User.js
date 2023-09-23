const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        min: 3,
        max:20,
    },
    phone:{
        type: Number,
        required: true,
        unique: true,
        validate: {
            validator: function(val) {
                return val.toString().length === 10
            },
            message: val => 'Mobile Number has to be 10 digits'
        }
    },
    state:{
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        default: false,
    }

    
});

module.exports = mongoose.model('Users', UserSchema);