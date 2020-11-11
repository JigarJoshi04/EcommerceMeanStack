const { number } = require('@hapi/joi');
const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity can not be less then 1.']
    },
});

// const CartSchema =  new mongoose.Schema({
//     items:[ItemSchema],
//     subTotal:{
//         default : 0,
//         type :number
//     },
//     timestamps:true

// });

module.exports = mongoose.model('cart',ItemSchema);