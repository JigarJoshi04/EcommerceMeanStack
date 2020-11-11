const router = require("express").Router();

const Product = require("../models/product");
const User = require("../models/user")




router.get("/",async (req,res)=>{
    try{
       const user = await User.find({'_id':req.headers.val});
       //console.log("Jigar")
    //   //  console.log(product)
    //   console.log(req)
      console.log(req.headers.val)
       res.setHeader('Content-Type','image/png');
       console.log("UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU")
       console.log(user) 
       return user
    //    res.send(product[0].image.data);
    // var s = [];
    // s = product.map(p => p['image']['data']);
    
    // console.log(s);
    // console.log(product)
    // res.send(product);


    }
    catch(err)
    {
        console.log(err);
    }
   })

   
module.exports = router;