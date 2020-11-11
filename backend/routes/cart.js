const router = require("express").Router();

const Product = require("../models/product");
const CartItem = require("../models/cart");
const { query } = require("express");
const product = require("../models/product");
// const { function } = require("@hapi/joi");
// const { function } = require("@hapi/joi");
// var express = require('express')
// var app = express()
router.get('/temp',async function(req,res){
    console.log("INside temp req")
    console.log(req.headers.val)
    res.send("all good")
})

router.get("/v",async function(req,res){
    try{
        var quantity = []
        console.log(req.headers.val)
        var cartproduct = await CartItem.find(
            {
                userId: req.headers.val
            }
        );
        // console.log(cartproduct)
        console.log(cartproduct.length)
        var i = 0
        var cart_product_items = []
        // const product = await Product.find()
        for (i =0;i<cartproduct.length;i= i+1){
            console.log(cartproduct[i].quantity)
            temp_prod_id = cartproduct[i].productId
            var product = await Product.find(
                {
                    "_id":temp_prod_id
                }
            )
            var name_of_product = product[0]['name']

            product[0]['__v'] = parseInt(cartproduct[i].quantity)
            product[0]['final_name'] = name_of_product
            console.log(product[0].date)
            console.log(product[0].final_name)
            cart_product_items.push(product[0])
        }
        // console.log("--------------------------")
        // console.log(cart_product_items)
        res.setHeader('Content-Type','image/png');
        console.log("/*/*/*s")
        console.log(cart_product_items)
        res.send(cart_product_items);

        
    }
    catch(error){
        console.log(error)
        // res.send(400).send(error);
    }
})


router.post("/update",async (req,res) => {
    userid = req.body.userId
    productid = req.body.productId
    quant = req.body.quant
    res.setHeader('Content-Type','image/png'); 
    const all_cart_items = await CartItem.find({userId : userid, productId :productid})
    var prev_quantity = all_cart_items[0].quantity
        // console.log("ELse Block")
        const all_cart_item = await CartItem.findByIdAndUpdate(
        {
            "_id":all_cart_items[0]._id
        }, 
        {
            "quantity": quant
        },
        function (err,result){
            if(err){
                res.send(err)
            }
            else{
                console.log("Success")
            }
        })
})
router.post("/delete",async (req,res)=>{
    userid = req.body.userId
    productid = req.body.productId
    console.log(userid)
    console.log(productid)
    res.setHeader('Content-Type','image/png'); 
    const all_cart_items = await CartItem.findOneAndDelete({userId : userid, productId :productid})
    console.log("=====================================")
    console.log(all_cart_items)
})
router.post("/",async (req,res)=>{
    try{
      console.log("Jigar Joshi")
      console.log(req.body)
      userid = req.body.userId
      productid = req.body.productId
      res.setHeader('Content-Type','image/png'); 
    //   *************************************************************************** //
    // console.log("User id is : ", userid)
    const all_cart_items = await CartItem.find({userId : userid, productId :productid})
    // const user_cart_items = await CartItem.findById(userId = userid)
    // console.log(((all_cart_items)))
    // console.log(all_cart_items[0]._id)
    if(!all_cart_items[0]){
        console.log("If statement")
        const cartItem = await new CartItem({
            userId : userid,
            productId : productid,
            quantity : 1
        })
    
    
        try {
          // console.log(cartItem);
          const prod = await cartItem.save();
    
          return res.status(201).json({
              message: 'File uploded successfully'
          });
          
        } 
        catch (error) {
        res.status(400).send(error);
        //   console.error(error);
        }
        
    }


    else{
        var prev_quantity = all_cart_items[0].quantity
        // console.log("ELse Block")
        const all_cart_item = await CartItem.findByIdAndUpdate(
        {
            "_id":all_cart_items[0]._id
        }, 
        {
            "quantity": prev_quantity +1
        },
        function (err,result){
            if(err){
                // res.send(err)
            }
            else{
                // console.log("Success")
            }
        })
        // console.log(all_cart_item)
        // console.log("Update Successful")
    }
    
    // console.log(all_cart_items)
    // console.log("*************")
    
    
  
  
  

    //   *************************************************************************** //


    }
    catch(err)
    {
        console.log(err);
    }
   })

   
module.exports = router;























// const router = require("express").Router();
// // const verify = require("./verifyToken")
// const multer = require('multer');
// const upload = multer({ dest: 'routes/upload/' });
// const fs = require('fs');
// const path = require('path');
// const Product = require('../models/product');

// router.post("/", upload.single('image'),async (req,res) =>{
//     console.log("hit")
//     console.log(req.file)

//     const product = await new Product({
//         name: req.body.name,
//         price: req.body.price,
//         image: {
//             data: fs.readFileSync(path.join(__dirname+ '/upload/' + req.file.filename)), 
//             contentType: 'image/png'
//         }
//     })


//     try {
//       console.log(product);
//       const prod = await product.save();

//       return res.status(201).json({
//           message: 'File uploded successfully'
//       });
//   } catch (error) {
//     res.status(400).send(error);
//       console.error(error);
//   }
  
//   })
  



// module.exports = router;