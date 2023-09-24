const mongoose = require('mongoose')
const { Schema } = mongoose;
const ForumSchema = new Schema({
    image:{
      type:String,
      required:true 
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
      },
    state:{
        type: String,
        required: true,
        min: 3
    },
    title:{
        type: String,
        required: true,
        min: 10
    },
    
    description:{
        type: String,
        required: true,
        min: 20,
    },
    upvotes: {
      type: Map,
      of: Boolean,
    },
    comments: {
        type: Array,
        default: [],
      },
}, {
    timestamps: true,
  });
module.exports = mongoose.model('Forums', ForumSchema);
