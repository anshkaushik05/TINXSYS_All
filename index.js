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

  var captchaValue= req.body.captcha;
  con.query(`select * from dealer_details where DM_MB_CST= ${req.body.tinNumber} `,(err,result,fields)=>{
  if(err) throw err;
  console.log(result.length);
  if(result.length)
  var tableData= {
    content: "found",
    STATECODE: result[0].DM_MB_STATECODE,
    TIN:result[0].DM_MB_TIN,
    CST:result[0].DM_MB_CST,
    DEALERNAME:result[0].DM_MB_DEALERNAME,
    ADDRESS1:result[0].DM_MB_ADDRESS1,
    ADDRESS2:result[0].DM_MB_ADDRESS2,
    ADDRESS3:result[0].DM_MB_ADDRESS3,
    ADDRESS4:result[0].DM_MB_ADDRESS4,
    ADDRESS5:result[0].DM_MB_ADDRESS5, //  State
    PAN:result[0].DM_MB_PAN,
    REGISTERDATE:result[0].DM_MB_REGISTERDATE,
    VALIDATIONSTATUS:result[0].DM_MB_VALIDATIONSTATUS,
    DATE:result[0].CREATED_DATE
  };
  else tableData={content:"Not Found"};
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
  con.query(`select * from dealer_details where DM_MB_STATECODE= ${req.body.stateNumber} AND DM_MB_CST= ${req.body.cstNumber}`,(err,result,fields)=>{
    if(err) throw err;
    if(result.length)
    var tableData= {
      content: "found",
      STATECODE: result[0].DM_MB_STATECODE,
      TIN:result[0].DM_MB_TIN,
      CST:result[0].DM_MB_CST,
      DEALERNAME:result[0].DM_MB_DEALERNAME,
      ADDRESS1:result[0].DM_MB_ADDRESS1,
      ADDRESS2:result[0].DM_MB_ADDRESS2,
      ADDRESS3:result[0].DM_MB_ADDRESS3,
      ADDRESS4:result[0].DM_MB_ADDRESS4,
      ADDRESS5:result[0].DM_MB_ADDRESS5, 
      PAN:result[0].DM_MB_PAN,
      REGISTERDATE:result[0].DM_MB_REGISTERDATE,
      VALIDATIONSTATUS:result[0].DM_MB_VALIDATIONSTATUS,
      DATE:result[0].CREATED_DATE
    }
    else tableData={content:"Not Found"};
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

  console.log(req.body.serialNumber);
  con.query(`select CI_CI_SERIESNUMBER,DM_MB_OFFICECODE,CREATED_DATE,CI_CI_PURCHASERNAME,DM_MB_ADDRESS1,DM_MB_ADDRESS2,DM_MB_ADDRESS3,DM_MB_ADDRESS4,DM_MB_ADDRESS5,CI_CI_ISSUEDATE,CI_CI_PURCHASERTIN,CI_CI_PURCHASERCST,CI_CU_SELLERNAME,CI_CU_SELLERADDRESS1,CI_CU_SELLERADDRESS2,CI_CU_SELLERADDRESS3,CI_CU_SELLERADDRESS4,CI_CU_SELLERADDRESS5,CI_CU_SELLERADDRESS6,CI_CU_SELLERSTATECODE,CI_CU_SELLERTIN,CI_CU_SELLERCST,CI_ID_INVOICENUMBER,CI_ID_INVOICEVALUE,CI_ID_VALIDATIONSTATUS from c_issue  I 
  inner join c_utilize U 
  on (I.CI_CI_PURCHASERTIN=U.CI_CU_PURCHASERTIN 
  and I.CI_CI_SERIALNUMBER=U.CI_CU_SERIALNUMBER 
  and I.CI_CI_SERIESNUMBER=U.CI_CU_SERIESNUMBER)
    inner join  c_invoicedetails V 
    on ( U.CI_CU_SELLERTIN=V.CI_ID_PURCHASERTIN 
    and U.CI_CU_SERIESNUMBER=V.CI_ID_SERIESNUMBER 
    and U.CI_CU_SERIALNUMBER=V.CI_ID_SERIALNUMBER )
    inner join dealer_details D on (I.CI_CI_PURCHASERTIN = ${req.body.serialNumber});
  `,(err,result,fields)=>{
    if(err) throw err;
    // D.DM_MB_TIN
    data=req.body;
    
    if(result.length)
    var tableData={
       content: "found",
       formType: data.formType,
       form :{
         serialNo: data.serialNumber,
         seriesNo: result[0].CI_CI_SERIESNUMBER,
       },
       issuingState:{
         state:data.stateNumber,
         officeIssue:result[0].DM_MB_OFFICECODE,
         dateIssue:result[0].CREATED_DATE

       },
       purchasingInfo:{
          name:result[0].CI_CI_PURCHASERNAME,
          address:{
            address1:result[0].DM_MB_ADDRESS1,
            address2:result[0].DM_MB_ADDRESS2,
            address3:result[0].DM_MB_ADDRESS3,
            address4:result[0].DM_MB_ADDRESS4,
            address5:result[0].DM_MB_ADDRESS5
          },
          validAsOn:result[0].CI_CI_ISSUEDATE,
          tin:result[0].CI_CI_PURCHASERTIN,
          cst:result[0].CI_CI_PURCHASERCST
       },
       sellerInfo:{
         name:result[0].CI_CU_SELLERNAME,
         address:{
           address1:result[0].CI_CU_SELLERADDRESS1,
           address2:result[0].CI_CU_SELLERADDRESS2,
           address3:result[0].CI_CU_SELLERADDRESS3,
           address4:result[0].CI_CU_SELLERADDRESS4,
           address5:result[0].CI_CU_SELLERADDRESS5,
           address6:result[0].CI_CU_SELLERADDRESS6,
           stateCode:result[0].CI_CU_SELLERSTATECODE
         },
         validAsOn:result[0].CI_CI_ISSUEDATE,
         tin:result[0].CI_CU_SELLERTIN,
         cst:result[0].CI_CU_SELLERCST

       },
       invoiceDetails:{
         invoiceNumber:result[0].CI_ID_INVOICENUMBER,
         invoiceValue:result[0].CI_ID_INVOICEVALUE
       },
       validStatus:result[0].CI_ID_VALIDATIONSTATUS

    }
    else tableData={content:"Not Found"};
    console.log(tableData);
    res.send(JSON.stringify(tableData));
    // res.send(JSON.stringify(result));
  
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

app.post('/dataStatus',(req,res)=>{


  con.query(`SELECT * FROM tinxsys.de_fileuploadschedule ORDER BY DE_FL_ACTUALDATEOFEXTRACTION desc`,(err,result,fields)=>{
    if(err) throw err;
    // select * FROM datastatusextraction ORDER BY lastActivityDate desc,stateName desc

    // console.log(result);
    res.send(result);
  })
})



// host
const port = 3000;
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})







