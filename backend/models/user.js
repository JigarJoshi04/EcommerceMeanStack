const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    require: true,
    max: 60
  },
  email :{
    type: String,
    require: true,
    max: 255,
    min: 6
  },
  phone :{
    type: String,
    require: true,
    max: 20,
    min: 8
  },

  password:{
    type: String,
    required: true,
    min: 8,
    max: 1024
  },
  date:{
    type: Date,
    default: Date.now
  }

});


module.exports = mongoose.model('User',userSchema);