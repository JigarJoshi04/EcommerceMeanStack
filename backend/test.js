var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
var session = require('express-session');
const multer = require('multer');
const fs = require('fs');
const upload = multer({ dest: 'uploads' }); 


// middleware
app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));



app.get('/' ,(req,res)=>{

res.sendFile('D:\\projects\\Product Mart\\backend\\test.html')

})

app.post('/', upload.single('file-to-upload'), (req, res) => {
    
    fs.rename(req.file.path , './uploads/'+req.file.originalname,(err)=>console.log(err));
    if(req.session.page_views){
        req.session.page_views++;
        res.send("Number of products uploaded = " + req.session.page_views );
     }else {
        req.session.page_views = 1;
        res.send("Welcome to Product Mart, you have uploaded your first product!");
     }
    res.redirect('/');

  });

app.listen(3000, ()=>{
    console.log('server at 3000');
  } );
  