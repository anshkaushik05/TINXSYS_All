// const http = require('http');
const express = require('express')
var mysql = require('mysql');
const app = express()
const path = require('path');
const ejs = require('ejs');
const 	fs = require("fs");
const Captcha = require("@haileybot/captcha-generator");
const { table } = require('console');
const bcrypt = require('bcrypt');

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

app.get('/loginCTD', (req, res) => {
  // res.send('TINSYS')
  res.render('loginCTD');
})

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
    // console.log(result);
    res.send(result);
  })
})

app.post('/stateStatus',async (req,res)=>{
  // console.log(req.body);
let data={
    resultDLMB:{fileType:'DLMB',Last_Extracted_Date:'N/A', Extracted_record_count:'N/A',	Correct_records:'N/A',	Error_records:'N/A'},
    resultCIDL:{fileType:'CIDL',Last_Extracted_Date:'N/A', Extracted_record_count:'N/A',	Correct_records:'N/A',	Error_records:'N/A'},
    resultCUDL:{fileType:'CUDL',Last_Extracted_Date:'N/A', Extracted_record_count:'N/A',	Correct_records:'N/A',	Error_records:'N/A'},
    resultCBDL:{fileType:'CBDL',Last_Extracted_Date:'N/A', Extracted_record_count:'N/A',	Correct_records:'N/A',	Error_records:'N/A'},
    resultFIDL:{fileType:'FIDL',Last_Extracted_Date:'N/A', Extracted_record_count:'N/A',	Correct_records:'N/A',	Error_records:'N/A'},
    resultFUDL:{fileType:'FUDL',Last_Extracted_Date:'N/A', Extracted_record_count:'N/A',	Correct_records:'N/A',	Error_records:'N/A'},
    resultFBDL:{fileType:'FBDL',Last_Extracted_Date:'N/A', Extracted_record_count:'N/A',	Correct_records:'N/A',	Error_records:'N/A'},
    resultHIDL:{fileType:'HIDL',Last_Extracted_Date:'N/A', Extracted_record_count:'N/A',	Correct_records:'N/A',	Error_records:'N/A'},
    resultHUDL:{fileType:'HUDL',Last_Extracted_Date:'N/A', Extracted_record_count:'N/A',	Correct_records:'N/A',	Error_records:'N/A'},
    resultHBDL:{fileType:'HBDL',Last_Extracted_Date:'N/A', Extracted_record_count:'N/A',	Correct_records:'N/A',	Error_records:'N/A'}
  }
  // var finalResult;

   con.query(`select DE_FD_STATECODE,DE_FD_FILETYPE,DE_FD_RECORDCOUNT,DE_FD_CORRECTRECORDS,MAX(DE_FD_EXTRACTEDTIME) date,
  DE_FD_CRITICALRECORDS,DE_FD_DUPLICATERECORDS,DE_FD_HIGHLYCRITICAL from de_fileextractdetails
  where (DE_FD_STATECODE=${req.body.stateCode} ) Group by DE_FD_FILETYPE 
  order by DE_FD_EXTRACTEDTIME desc ;`,(err,result,fields)=>{
        if(err) throw err;

        if(result.length){

          for(let i=0;i<result.length;i++){

            if(result[i].DE_FD_FILETYPE=='DLMB'){
              data.resultDLMB.Last_Extracted_Date=result[i].date;
              data.resultDLMB.Extracted_record_count=result[i].DE_FD_RECORDCOUNT;
              data.resultDLMB.Correct_records=result[i].DE_FD_CORRECTRECORDS;
              data.resultDLMB.Error_records=result[i].DE_FD_CRITICALRECORDS+result[i].DE_FD_DUPLICATERECORDS+result[i].DE_FD_HIGHLYCRITICAL;
              // console.log(data.resultDLMB.Last_Extracted_Date);
            }
            else if(result[i].DE_FD_FILETYPE=='CIDL'){
              data.resultCIDL.Last_Extracted_Date=result[i].date;
              data.resultCIDL.Extracted_record_count=result[i].DE_FD_RECORDCOUNT;
              data.resultCIDL.Correct_records=result[i].DE_FD_CORRECTRECORDS;
              data.resultCIDL.Error_records=result[i].DE_FD_CRITICALRECORDS+result[i].DE_FD_DUPLICATERECORDS+result[i].DE_FD_HIGHLYCRITICAL;
              // console.log(data.resultDLMB.Last_Extracted_Date);
            }
            else if(result[i].DE_FD_FILETYPE=='CUDL'){
              data.resultCUDL.Last_Extracted_Date=result[i].date;
              data.resultCUDL.Extracted_record_count=result[i].DE_FD_RECORDCOUNT;
              data.resultCUDL.Correct_records=result[i].DE_FD_CORRECTRECORDS;
              data.resultCUDL.Error_records=result[i].DE_FD_CRITICALRECORDS+result[i].DE_FD_DUPLICATERECORDS+result[i].DE_FD_HIGHLYCRITICAL;
              // console.log(data.resultDLMB.Last_Extracted_Date);
            }
            else if(result[i].DE_FD_FILETYPE=='CBDL'){
              data.resultCBDL.Last_Extracted_Date=result[i].date;
              data.resultCBDL.Extracted_record_count=result[i].DE_FD_RECORDCOUNT;
              data.resultCBDL.Correct_records=result[i].DE_FD_CORRECTRECORDS;
              data.resultCBDL.Error_records=result[i].DE_FD_CRITICALRECORDS+result[i].DE_FD_DUPLICATERECORDS+result[i].DE_FD_HIGHLYCRITICAL;
              // console.log(data.resultDLMB.Last_Extracted_Date);
            }
            else if(result[i].DE_FD_FILETYPE=='FIDL'){
              data.resultFIDL.Last_Extracted_Date=result[i].date;
              data.resultFIDL.Extracted_record_count=result[i].DE_FD_RECORDCOUNT;
              data.resultFIDL.Correct_records=result[i].DE_FD_CORRECTRECORDS;
              data.resultFIDL.Error_records=result[i].DE_FD_CRITICALRECORDS+result[i].DE_FD_DUPLICATERECORDS+result[i].DE_FD_HIGHLYCRITICAL;
              // console.log(data.resultDLMB.Last_Extracted_Date);
            }
            else if(result[i].DE_FD_FILETYPE=='FUDL'){
              data.resultFUDL.Last_Extracted_Date=result[i].date;
              data.resultFUDL.Extracted_record_count=result[i].DE_FD_RECORDCOUNT;
              data.resultFUDL.Correct_records=result[i].DE_FD_CORRECTRECORDS;
              data.resultFUDL.Error_records=result[i].DE_FD_CRITICALRECORDS+result[i].DE_FD_DUPLICATERECORDS+result[i].DE_FD_HIGHLYCRITICAL;
              // console.log(data.resultDLMB.Last_Extracted_Date);
            }
            else if(result[i].DE_FD_FILETYPE=='FBDL'){
              data.resultFBDL.Last_Extracted_Date=result[i].date;
              data.resultFBDL.Extracted_record_count=result[i].DE_FD_RECORDCOUNT;
              data.resultFBDL.Correct_records=result[i].DE_FD_CORRECTRECORDS;
              data.resultFBDL.Error_records=result[i].DE_FD_CRITICALRECORDS+result[i].DE_FD_DUPLICATERECORDS+result[i].DE_FD_HIGHLYCRITICAL;
              // console.log(data.resultDLMB.Last_Extracted_Date);
            }
            else if(result[i].DE_FD_FILETYPE=='HIDL'){
              data.resultHIDL.Last_Extracted_Date=result[i].date;
              data.resultHIDL.Extracted_record_count=result[i].DE_FD_RECORDCOUNT;
              data.resultHIDL.Correct_records=result[i].DE_FD_CORRECTRECORDS;
              data.resultHIDL.Error_records=result[i].DE_FD_CRITICALRECORDS+result[i].DE_FD_DUPLICATERECORDS+result[i].DE_FD_HIGHLYCRITICAL;
              // console.log(data.resultDLMB.Last_Extracted_Date);
            }
            else if(result[i].DE_FD_FILETYPE=='HUDL'){
              data.resultHUDL.Last_Extracted_Date=result[i].date;
              data.resultHUDL.Extracted_record_count=result[i].DE_FD_RECORDCOUNT;
              data.resultHUDL.Correct_records=result[i].DE_FD_CORRECTRECORDS;
              data.resultHUDL.Error_records=result[i].DE_FD_CRITICALRECORDS+result[i].DE_FD_DUPLICATERECORDS+result[i].DE_FD_HIGHLYCRITICAL;
              // console.log(data.resultDLMB.Last_Extracted_Date);
            }
            else if(result[i].DE_FD_FILETYPE=='HBDL'){
              data.resultHBDL.Last_Extracted_Date=result[i].date;
              data.resultHBDL.Extracted_record_count=result[i].DE_FD_RECORDCOUNT;
              data.resultHBDL.Correct_records=result[i].DE_FD_CORRECTRECORDS;
              data.resultHBDL.Error_records=result[i].DE_FD_CRITICALRECORDS+result[i].DE_FD_DUPLICATERECORDS+result[i].DE_FD_HIGHLYCRITICAL;
              // console.log(data.resultDLMB.Last_Extracted_Date);
            }
          }
        }
         res.send(data);
      })
})

app.post('/userId',(req,res)=>{
  // console.log(req.body);
  con.query(`select count(*) count from login_ctd;`,(err,result,field)=>{
    if(err)
      throw err;
        var count=result[0].count;
    res.send({userId:count+1});
  })
})
app.post('/checkId',(req,res)=>{
  // console.log(req.body);
  con.query(`select * from login_ctd where loginId='${req.body.loginId}';`,(err,result,field)=>{
    if(err) throw err;
    if(result.length){
      res.send({checkId:'This Login ID is not available'});
    }
    else{
      res.send({checkId:'This Login ID is available'});
    }
  })
})
app.post('/loginDetails',(req,res)=>{
  // console.log(req.body);
  
  con.query(`select firstName,middleName,lastName from login_ctd where stateName=${req.body.stateCode} and loginRole='CTD Officer'`,(err,result,field)=>{
    if(err) throw err;

    res.send({ctdOfficers:result});

  })


})
app.post('/officialDetails',(req,res)=>{
  // console.log(req.body);
  
  con.query(`select firstName,middleName,lastName from login_ctd where stateName=${req.body.stateCode}`,(err,result,field)=>{
    if(err) throw err;

    res.send({ctdOfficers:result});

  })


})
app.post('/referenceDetails',async (req,res)=>{
  // console.log(req.body);
  // req.body.loginDetailsData.password
  const passwordHash= await bcrypt.hash(req.body.loginDetailsData.password,10);
  // console.log(passwordHash);
  con.query(`Insert into login_ctd values ( '${req.body.personalDetailsData.firstName}', '${req.body.personalDetailsData.middleName}',  '${req.body.personalDetailsData.lastName}', '${req.body.personalDetailsData.mobileNo}', '${req.body.personalDetailsData.emailId}', '${req.body.personalDetailsData.address}', ${req.body.personalDetailsData.stateName}, ${req.body.loginDetailsData.userId}, '${req.body.loginDetailsData.loginId}', '${passwordHash}', ${req.body.loginDetailsData.activeState}, ${req.body.loginDetailsData.firstTimeLogin}, '${new Date().toISOString().split('T')[0]}', ${req.body.loginDetailsData.validity}, '${req.body.loginDetailsData.role}', '${req.body.officialDetailsData.designationCoforge}', '${req.body.officialDetailsData.designationCtd}', '${req.body.officialDetailsData.location}', '${req.body.officialDetailsData.ctdName}', '${req.body.officialDetailsData.ctdMobile}', '${req.body.officialDetailsData.ctdEmail}', '${req.body.referenceDetailsData.referenceName}', '${req.body.referenceDetailsData.adminUser}',0);
  `,(err,result,field)=>{
    if(err) throw err;

  
    res.send({ctdOfficers:200});
  })




})



// host
const port = 3000;
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})







