const mongoose = require('mongoose')
const { Schema } = mongoose;

const ComplaintSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  category:{
    type:  String,
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
  image:{
    type: String,
    required: true
  },
  state:{
    type: String,
    requried: true
  },
  address:{
    type:  String,
    required: true,
  },
  description: {
    type:  String,
    required: true,
  },
  longitude: {
    type:  String,
    required: true,
  },
  latitude:{
    type:  String,
    required: true,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  isResolved:{
    type: Boolean,
    default: false
  },
  upvotes:{
    type: Number,
    default: 1
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Complaints', ComplaintSchema);