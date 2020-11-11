const router = require("express").Router();
// const verify = require("./verifyToken")
const multer = require('multer');
const upload = multer({ dest: 'routes/upload/' });
const fs = require('fs');
const path = require('path');
const Product = require('../models/product');



router.post("/", upload.single('image'),async (req,res) =>{
    console.log("hit")
    console.log(req.file)

    const product = await new Product({
        name: req.body.name,
        price: req.body.price,
        image: {
            data: fs.readFileSync(path.join(__dirname+ '/upload/' + req.file.filename)), 
            contentType: 'image/png'
        }
    })


    try {
      console.log(product);
      const prod = await product.save();

      return res.status(201).json({
          message: 'File uploded successfully'
      });
  } catch (error) {
    res.status(400).send(error);
      console.error(error);
  }
  
  })
  



module.exports = router;