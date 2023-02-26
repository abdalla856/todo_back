const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    text: {
      type: String,
      required: true
    },
    date: {
      type: Date,
 
      default :null
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref :'User', 
      required: true
    },

  });
  
  module.exports= mongoose.model('Todo', userSchema);