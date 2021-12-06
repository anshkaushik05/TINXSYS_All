// const http = require('http');
const express = require('express')
var mysql = require('mysql');
const app = express()
const path = require('path');
const ejs = require('ejs');
const 	fs = require("fs");
const Captcha = require("@haileybot/captcha-generator");

app.set('view engine', 'ejs');
console.log( path.join(__dirname, 'views'));
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true})); 
app.use(express.json());
app.use(express.static(path.join(__dirname, "static")));


const yourUserName="root";
const yourpassword="6980";
// mysql setup
var con = mysql.createConnection({
  host: "localhost",
  user: yourUserName,
  password: yourpassword
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// random generated captcha 


let captcha = new Captcha();
// console.log(captcha.value);
// captcha.PNGStream.pipe(fs.createWriteStream(__dirname + "/static/captchaImgs/" + `${captcha.value}.png`));
// captcha.JPEGStream.pipe(fs.createWriteStream(__dirname + "/static/captchaImgs/" + `${captcha.value}.jpeg`));




// pages

app.get('/', (req, res) => {
    // res.send('TINSYS')
    res.render('index');
})
app.get('/dealerForm', (req, res) => {
    // res.send('TINSYS')
    res.render('dealerForm');
})
app.get('/detailsTin',(req,res)=>{

  res.render('detailsTin');

})



// host
const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})







