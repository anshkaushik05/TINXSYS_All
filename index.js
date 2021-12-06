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





// pages

app.get('/', (req, res) => {
    // res.send('TINSYS')
    res.render('index');
})
app.get('/dealerForm', async (req, res) => {
var valueCaptcha='original Value';
const captchaCreation=()=>{


let captcha = new Captcha();
// console.log(captcha.value);
// captcha.PNGStream.pipe(fs.createWriteStream(__dirname + "/static/captchaImgs/" + `${captcha.value}.png`));
captcha.JPEGStream.pipe(fs.createWriteStream(__dirname + "/static/captchaImgs/" + `${captcha.value}.jpeg`));
  return captcha.value;

}
  valueCaptcha=await captchaCreation();
  
    // res.send('TINSYS')
    res.render('dealerForm', {captchaValue: valueCaptcha});
})
app.get('/detailsTin',(req,res)=>{

  res.render('detailsTin');

})

app.post('/tinForm',(req,res)=>{

  console.log(req.body.tinNumber);
})

app.post('/cstForm',(req,res)=>{

  console.log(req.body);
})
app.post('/formNumber',(req,res)=>{

  console.log(req.body);
})



// host
const port = 3000;
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})







