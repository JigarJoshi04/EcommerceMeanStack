const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:{
    type: String,
    require: true,
    max: 100
  },
 
  price :{
    type: String,
    require: true,
    max: 20,
    min: 1
  },

 image:{
     data:Buffer,
    contentType: String
 },

  date:{
    type: Date,
    default: Date.now
  }

});


module.exports = mongoose.model('Product',productSchema);