// const http = require('http');
const express = require('express')
var mysql = require('mysql');
const app = express()
const path = require('path');
const ejs = require('ejs');
const 	fs = require("fs");
const Captcha = require("@haileybot/captcha-generator");
const { table } = require('console');

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
  password: yourpassword,
  database: "tinxsys"
});








// pages

app.get('/', (req, res) => {
  // res.send('TINSYS')
  res.render('index');
})
app.get('/dealerForm', async (req, res) => {
  var valueCaptcha='original Value';
  const captchaCreation=()=>{
    
    
// random generated captcha 
let captcha = new Captcha();
console.log(captcha.value);
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

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
app.post('/tinForm',(req,res)=>{

  // console.log(req.body.tinNumber);
  var captchaValue= req.body.captcha;
  con.query(`select * from dealer_details where DM_MB_CST= ${req.body.tinNumber} `,(err,result,fields)=>{
  if(err) throw err;
  // console.log(result[0].DM_MB_DEALERNAME);
  // DM_MB_CST
  // DM_MB_CST
  // DM_MB_DEALERNAME
  // DM_MB_ADDRESS1
  // DM_MB_ADDRESS2
  // DM_MB_ADDRESS3
  // DM_MB_ADDRESS4   State
  // DM_MB_PAN
  // DM_MB_REGISTERDATE
  // DM_MB_VALIDATIONSTATUS
  // CREATED_DATE

  var tableData= {
    TIN:result[0].DM_MB_CST,
    CST:result[0].DM_MB_CST,
    DEALERNAME:result[0].DM_MB_DEALERNAME,
    ADDRESS1:result[0].DM_MB_ADDRESS1,
    ADDRESS2:result[0].DM_MB_ADDRESS2,
    ADDRESS3:result[0].DM_MB_ADDRESS3,
    ADDRESS4:result[0].DM_MB_ADDRESS4, //  State
    PAN:result[0].DM_MB_PAN,
    REGISTERDATE:result[0].DM_MB_REGISTERDATE,
    VALIDATIONSTATUS:result[0].DM_MB_VALIDATIONSTATUS,
    DATE:result[0].CREATED_DATE
  }
  console.log(tableData);
  res.send(JSON.stringify(tableData));

})
  // console.log(captchaValue)
  if(fs.existsSync(__dirname +"/static/captchaImgs/" + `${captchaValue}.jpeg`)){

  
  fs.unlink(__dirname +"/static/captchaImgs/" + `${captchaValue}.jpeg`, (err) => {
    if (err) {
        throw err;
    }

    console.log("File is deleted.");
});
}
})

app.post('/cstForm',(req,res)=>{

  console.log(req.body);
  con.query(`select     DM_MB_CST,DM_MB_CST,DM_MB_DEALERNAME,DM_MB_ADDRESS1,DM_MB_ADDRESS2,DM_MB_ADDRESS3,DM_MB_ADDRESS4,DM_MB_PAN,DM_MB_REGISTERDATE,DM_MB_VALIDATIONSTATUS,CREATED_DATE
  from dealer_details where DM_MB_STATECODE= ${req.body.stateNumber} AND DM_MB_CST= ${req.body.cstNumber}`,(err,result,fields)=>{
    if(err) throw err;
    // console.log(result[0]);
    // DM_MB_CST
    // DM_MB_CST
    // DM_MB_DEALERNAME
    // DM_MB_ADDRESS1
    // DM_MB_ADDRESS2
    // DM_MB_ADDRESS3
    // DM_MB_ADDRESS4   State
    // DM_MB_PAN
    // DM_MB_REGISTERDATE
    // DM_MB_VALIDATIONSTATUS
    // CREATED_DATE
  
    var tableData= {
      TIN:result[0].DM_MB_CST,
      CST:result[0].DM_MB_CST,
      DEALERNAME:result[0].DM_MB_DEALERNAME,
      ADDRESS1:result[0].DM_MB_ADDRESS1,
      ADDRESS2:result[0].DM_MB_ADDRESS2,
      ADDRESS3:result[0].DM_MB_ADDRESS3,
      ADDRESS4:result[0].DM_MB_ADDRESS4, //  State
      PAN:result[0].DM_MB_PAN,
      REGISTERDATE:result[0].DM_MB_REGISTERDATE,
      VALIDATIONSTATUS:result[0].DM_MB_VALIDATIONSTATUS,
      DATE:result[0].CREATED_DATE
    }
    console.log(tableData);
    res.send(JSON.stringify(tableData));
  
  })
  var captchaValue= req.body.captcha;
  if(fs.existsSync(__dirname +"/static/captchaImgs/" + `${captchaValue}.jpeg`)){

  
    fs.unlink(__dirname +"/static/captchaImgs/" + `${captchaValue}.jpeg`, (err) => {
      if (err) {
          throw err;
      }
  
      console.log("File is deleted.");
  });
  }
})
app.post('/formNumber',(req,res)=>{

  console.log(req.body);
  con.query(`select     DM_MB_CST,DM_MB_CST,DM_MB_DEALERNAME,DM_MB_ADDRESS1,DM_MB_ADDRESS2,DM_MB_ADDRESS3,DM_MB_ADDRESS4,DM_MB_PAN,DM_MB_REGISTERDATE,DM_MB_VALIDATIONSTATUS,CREATED_DATE
  from dealer_details where DM_MB_STATECODE= ${req.body.stateNumber} AND DM_MB_CST= ${req.body.cstNumber}`,(err,result,fields)=>{
    if(err) throw err;
    // console.log(result[0]);
    // DM_MB_CST
    // DM_MB_CST
    // DM_MB_DEALERNAME
    // DM_MB_ADDRESS1
    // DM_MB_ADDRESS2
    // DM_MB_ADDRESS3
    // DM_MB_ADDRESS4   State
    // DM_MB_PAN
    // DM_MB_REGISTERDATE
    // DM_MB_VALIDATIONSTATUS
    // CREATED_DATE
  
    var tableData= {
      TIN:result[0].DM_MB_CST,
      CST:result[0].DM_MB_CST,
      DEALERNAME:result[0].DM_MB_DEALERNAME,
      ADDRESS1:result[0].DM_MB_ADDRESS1,
      ADDRESS2:result[0].DM_MB_ADDRESS2,
      ADDRESS3:result[0].DM_MB_ADDRESS3,
      ADDRESS4:result[0].DM_MB_ADDRESS4, //  State
      PAN:result[0].DM_MB_PAN,
      REGISTERDATE:result[0].DM_MB_REGISTERDATE,
      VALIDATIONSTATUS:result[0].DM_MB_VALIDATIONSTATUS,
      DATE:result[0].CREATED_DATE
    }
    console.log(tableData);
    res.send(JSON.stringify(tableData));
  
  })

  var captchaValue= req.body.captcha;
  if(fs.existsSync(__dirname +"/static/captchaImgs/" + `${captchaValue}.jpeg`)){

  
    fs.unlink(__dirname +"/static/captchaImgs/" + `${captchaValue}.jpeg`, (err) => {
      if (err) {
          throw err;
      }
  
      console.log("File is deleted.");
  });
  }
})



// host
const port = 3000;
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})







