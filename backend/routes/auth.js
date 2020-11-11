const router = require("express").Router();
const User = require("../models/user");
const Product = require("../models/product");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation,loginValidation} = require('../models/validation')


router.post("/register", async (req, res) => {
 console.log("hey")
 const {error} = registerValidation(req.body);
 if(error) return res.status(400).send(error.details[0].message);

 const emailExist = await User.findOne({ email: req.body.email });
 if(emailExist) return res.status(400).send('Email already exist');

 const phoneExist = await User.findOne({ phone: req.body.phone });
 if(phoneExist) return res.status(400).send('Phone number already exist');

const salt = await bcrypt.genSalt(10);
const hashpass = await bcrypt.hash(req.body.password,salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: hashpass,
    // password: req.body.password,
  });

  try {
    const savedUser = await user.save();
    console.log(savedUser)
    
    const token = jwt.sign({_id: savedUser._id}, process.env.TOKEN_SECRET);
    // res.header('auth-token',token).send(token)
    res.json({
      token: token
    }).status(200);

  } catch (err) {
    res.status(400).send(err);
  }


});


router.post("/login", async (req, res) => {

    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
   
    const user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send('Email or Password incorrect');

    const validpass = await bcrypt.compare( req.body.password,user.password);
    if(!validpass) return res.status(400).send('Password incorrect');



    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    // res.header('auth-token',token).send(token)
    res.json({
      token: token
    }).status(200);
});



router.get("/profile", async (req, res) => {

  const user = await User.find();
  if(!user) return res.status(400).send('User not found');
  res.send(user);
  console.log(user);
});


router.put("/update", async (req, res) => {

  var user = await User.findOneAndUpdate({name: req.body.name},{$set: {phone: req.body.phone}});
  if(!user) return res.status(400).send('User not found');
  user = await User.findOne({name: req.body.name});
  res.send(user);
  console.log(user,'\nUpdate success');
});


router.delete("/delete", async (req, res) => {

  var user = await User.deleteOne({name: req.body.name});
  if(!user) return res.status(400).send('User not found');
  res.send(user);
  console.log(user,'\nDelete success');
});





module.exports = router;
