// const { NULL } = require("mysql/lib/protocol/constants/types");

var kaushik =11;
// display forms
document.getElementsByClassName('uiDisable')[0].addEventListener('click',()=>{
    // document.getElementsByClassName('uiDisable')[1].classList.add('border-transparent');
    // document.getElementsByClassName('uiDisable')[2].classList.add('border-transparent');
    

    if( document.getElementById("tinForm").classList.contains('hidden'))
        {
            // document.getElementsByClassName('uiDisable')[0].childNodes[1].classList.toggle('border-yellow-700');
            document.getElementById("tinForm").classList.toggle('hidden');
        }
    if(!document.getElementById("cstForm").classList.contains('hidden')    )
    {
        document.getElementById("cstForm").classList.toggle('hidden');
    }
    if(!document.getElementById("formVerification").classList.contains('hidden'))
    {
        document.getElementById("formVerification").classList.toggle('hidden');
    }
    if(!document.getElementById("detailsTable").classList.contains('hidden'))
    {
        document.getElementById("detailsTable").classList.toggle('hidden');
    }
    if(!document.getElementById("validTable").classList.contains('hidden'))
    {
        document.getElementById("validTable").classList.toggle('hidden');
    }
    if(!document.getElementById("printButton").classList.contains('hidden'))
    {
        document.getElementById("printButton").classList.toggle('hidden');
    }
    
    document.getElementById('tinValidTin').innerHTML="";
    document.getElementById('captchaValidTin').innerHTML="";

    document.getElementById('stateValidCst').innerHTML="";
    document.getElementById('cstValidCst').innerHTML="";
    document.getElementById('captchaValidCst').innerHTML="";

    document.getElementById('formTypeValidForm').innerHTML="";
    document.getElementById('stateValidForm').innerHTML="";
    document.getElementById('serialValidForm').innerHTML="";
    document.getElementById('captchaValidForm').innerHTML="";

})
document.getElementsByClassName('uiDisable')[1].addEventListener('click',()=>{
        document.getElementsByClassName('uiDisable')[0].click();
        document.getElementById("tinForm").classList.toggle('hidden');
        document.getElementById("cstForm").classList.toggle('hidden');
        // document.getElementById("formVerification").classList.toggle('hidden');
        // document.getElementsByClassName('uiDisable')[1].childNodes[1].classList.toggle('border-yellow-700');
        // document.getElementsByClassName('uiDisable')[0].classList.add('border-transparent');
        // document.getElementsByClassName('uiDisable')[2].classList.add('border-transparent');

})
document.getElementsByClassName('uiDisable')[2].addEventListener('click',()=>{
    document.getElementsByClassName('uiDisable')[0].click();
    document.getElementById("tinForm").classList.toggle('hidden');
        // document.getElementById("cstForm").classList.toggle('hidden');
        document.getElementById("formVerification").classList.toggle('hidden');
        // document.getElementsByClassName('uiDisable')[2].childNodes[1].classList.toggle('border-yellow-700');

})





// form validation and submition 

console.log(getCaptcha);
getCaptcha= getCaptcha.substr(0,getCaptcha.indexOf(' '));
//Tin form submit
document.getElementById('tinSubmit').addEventListener('click',(e)=>{
    // console.log('clicked');
    e.preventDefault();
    document.getElementById('tinValidTin').innerHTML="";
    document.getElementById('captchaValidTin').innerHTML="";


    var tinNumberForm=document.getElementById('tinNumberForm').value;
    var captcha = document.getElementById('tinNumberFormCaptcha').value;
    
    var trueTin=0, trueCaptcha = 0;
    if(tinNumberForm.toString().length!=11)
        document.getElementById('tinValidTin').innerHTML="Entered Tin is not 11 digits";
    else
        trueTin=1;
    if(captcha != getCaptcha)
        document.getElementById('captchaValidTin').innerHTML="Incorrect Captcha (case sensitive)";
    else
        trueCaptcha=1;
    
    if(trueCaptcha && trueTin){
        // console.log("all Good");
        var data={
            tinNumber : tinNumberForm,
            captcha : captcha
        }

        fetch('/tinForm',{
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(res=>res.json()).then(data=>{
            // console.log(data);
            document.getElementById("tinForm").classList.toggle('hidden');
            document.getElementById('tinValidTin').innerHTML="";
            document.getElementById('captchaValidTin').innerHTML="";



            document.getElementById('tableHead').innerHTML=` Dealer details by TIN => ${data.TIN}   Search Time: ${new Date().toLocaleDateString()}   ${new Date().toLocaleTimeString()}  `;
            document.getElementById('tinTin').innerHTML=` ${checkNull(data.TIN)} `;
            document.getElementById('cstTin').innerHTML=` ${checkNull(data.CST)} `;
            document.getElementById('dealerNameTin').innerHTML=` ${checkNull(data.DEALERNAME)} `;
            document.getElementById('stateNameTin').innerHTML=` ${checkNull(stateCodeConvert(data.STATECODE))} `;
            document.getElementById('panTin').innerHTML=` ${checkNull(data.PAN)} `;
            document.getElementById('regDateTin').innerHTML=` ${checkNull(data.REGISTERDATE)} `;
            document.getElementById('validStatusTin').innerHTML=` ${checkNull(validStatus(data.VALIDATIONSTATUS))} `;
            document.getElementById('dateTin').innerHTML=` ${checkNull(data.DATE)} `;
            document.getElementById('addressTin1').innerHTML=` ${checkNull(data.ADDRESS1)} `;
            document.getElementById('addressTin2').innerHTML=` ${checkNull(data.ADDRESS2)} `;
            document.getElementById('addressTin3').innerHTML=` ${checkNull(data.ADDRESS3)} `;
            document.getElementById('addressTin4').innerHTML=` ${checkNull(data.ADDRESS4)} `;
            document.getElementById('addressTin5').innerHTML=` ${checkNull(data.ADDRESS5)} `;

            document.getElementById("detailsTable").classList.toggle('hidden');
            document.getElementById("printButton").classList.toggle('hidden');
        }).catch(e=>console.log("Error:"+e));
    }
    
})


//CST Form
document.getElementById('cstSubmit').addEventListener('click',(e)=>{
    // console.log('clicked');
    e.preventDefault();
    document.getElementById('stateValidCst').innerHTML="";
    document.getElementById('cstValidCst').innerHTML="";
    document.getElementById('captchaValidCst').innerHTML="";

    var stateNameCst=document.getElementById('stateNameCst').value;
    var cstNumberForm = document.getElementById('cstNumberForm').value;
    var captcha = document.getElementById('captchaCst').value;
    
    var trueCst=0, trueCaptcha = 0; 
    var trueStateNameCst=0;
    if(cstNumberForm.toString().length!=11)
        document.getElementById('cstValidCst').innerHTML="Entered CST is not 11 digits";
    else
        trueCst=1;
    if(stateNameCst=='')
        document.getElementById('stateValidCst').innerHTML="Please Input a State Value";
    else
        trueStateNameCst=1;
    if(captcha != getCaptcha)
        document.getElementById('captchaValidCst').innerHTML="Incorrect Captcha (case sensitive)";
    else
        trueCaptcha=1;
    
    if(trueCaptcha && trueCst && trueStateNameCst ){
        // console.log("all Good");
        var data={
            stateNumber : stateNameCst,
            cstNumber : cstNumberForm,
            captcha : captcha
        }



        fetch('/cstForm',{
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(res=>res.json()).then(data=>{
            // console.log(data);


            document.getElementById('stateValidCst').innerHTML="";
            document.getElementById('cstValidCst').innerHTML="";
            document.getElementById('captchaValidCst').innerHTML="";

            document.getElementById("cstForm").classList.toggle('hidden');
            
            document.getElementById('tableHead').innerHTML=` Dealer details by TIN => ${data.TIN}   Search Time: ${new Date().toLocaleDateString()}   ${new Date().toLocaleTimeString()}  `;
            document.getElementById('tinTin').innerHTML=` ${checkNull(data.TIN)} `;
            document.getElementById('cstTin').innerHTML=` ${checkNull(data.CST)} `;
            document.getElementById('dealerNameTin').innerHTML=` ${checkNull(data.DEALERNAME)} `;
            document.getElementById('stateNameTin').innerHTML=` ${checkNull(stateCodeConvert(data.STATECODE))} `;
            document.getElementById('panTin').innerHTML=` ${checkNull(data.PAN)} `;
            document.getElementById('regDateTin').innerHTML=` ${checkNull(data.REGISTERDATE)} `;
            document.getElementById('validStatusTin').innerHTML=` ${checkNull(validStatus(data.VALIDATIONSTATUS))} `;
            document.getElementById('dateTin').innerHTML=` ${checkNull(data.DATE)} `;
            document.getElementById('addressTin1').innerHTML=` ${checkNull(data.ADDRESS1)} `;
            document.getElementById('addressTin2').innerHTML=` ${checkNull(data.ADDRESS2)} `;
            document.getElementById('addressTin3').innerHTML=` ${checkNull(data.ADDRESS3)} `;
            document.getElementById('addressTin4').innerHTML=` ${checkNull(data.ADDRESS4)} `;
            document.getElementById('addressTin5').innerHTML=` ${checkNull(data.ADDRESS5)} `;
            
            document.getElementById("detailsTable").classList.toggle('hidden');
            document.getElementById("printButton").classList.toggle('hidden');
        }).catch(e=>console.log("Error:"+e));

    }
    
})



// Form Verification

// formType
// stateNameForm
// seriesNumber
// serialNumber
// captchaFormValid
// validSubmit
document.getElementById('validSubmit').addEventListener('click',(e)=>{
    // console.log('clicked');
    e.preventDefault();
    document.getElementById('formTypeValidForm').innerHTML="";
    document.getElementById('stateValidForm').innerHTML="";
    document.getElementById('serialValidForm').innerHTML="";
    document.getElementById('captchaValidForm').innerHTML="";

    var formType=document.getElementById('formType').value;
    var stateNameForm=document.getElementById('stateNameForm').value;
    var seriesNumber = document.getElementById('seriesNumber').value;
    var serialNumber = document.getElementById('serialNumber').value;
    var captchaFormValid = document.getElementById('captchaFormValid').value;
    
    var trueSerial=0, trueCaptcha = 0; 
    var trueStateName=0, trueFormType=0;

    // if(seriesNumber.toString().length!=11)
    //     console.log('not 11 digit');
    // else
    //     trueCst=1;

    if(serialNumber.toString().length!=11)
        document.getElementById('serialValidForm').innerHTML="Entered Serial is not 11 digits";
    else
        trueSerial=1;

    if(formType=='')
        document.getElementById('formTypeValidForm').innerHTML="Please Input a Form Type";
    else
        trueFormType=1;

    if(stateNameForm=='')
        document.getElementById('stateValidForm').innerHTML="Please Input a State Value";
    else
        trueStateName=1;

    if(captchaFormValid != getCaptcha)
        document.getElementById('captchaValidForm').innerHTML="Incorrect Captcha (case sensitive)";
    else
        trueCaptcha=1;
    
    if(trueCaptcha && trueSerial && trueStateName && trueFormType){
        console.log("all Good");
        var data={
            formType: formType,
            seriesNumber : seriesNumber,
            serialNumber : serialNumber,
            stateNumber : stateNameForm,
            captcha : captchaFormValid
        }

        // document.getElementById("formVerification").classList.toggle('hidden');

            
        //     document.getElementById("validTable").classList.toggle('hidden');

        fetch('/formNumber',{
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(res=>res.json()).then(result=>{
            console.log(result);
            document.getElementById("formVerification").classList.toggle('hidden');
            document.getElementById('validTableHead').innerHTML=`FORM '${checkNull(formTypeCheck(result.formType))}' <br> Search Time :${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
            document.getElementById('formTypeValid').innerHTML=`FORM '${checkNull((formTypeCheck(result.formType)))}' `;
            document.getElementById('seriesNo').innerHTML=`${checkNull(result.form.seriesNo)} `;
            document.getElementById('serialNo').innerHTML=`${checkNull(result.form.serialNo)} `;
            document.getElementById('state').innerHTML=`${stateCodeConvert(checkNull(result.issuingState.state))} `;
            document.getElementById('officeIssue').innerHTML=`${checkNull(result.issuingState.officeIssue)} `;
            document.getElementById('dateIssue').innerHTML=`${checkNull(result.issuingState.dateIssue)} `;
            // document.getElementById('dateIssue').innerHTML=`${result.issuingState.dateIssue.substr(0,result.issuingState.dateIssue.indexOf(' '))} `;



            document.getElementById('purchaserName').innerHTML=`${checkNull(result.purchasingInfo.name)} `;
            document.getElementById('purchaserAddress1').innerHTML=`${checkNull(result.purchasingInfo.address.address1)} `;
            document.getElementById('purchaserAddress2').innerHTML=`${checkNull(result.purchasingInfo.address.address2)} `;
            document.getElementById('purchaserAddress3').innerHTML=`${checkNull(result.purchasingInfo.address.address3)} `;
            document.getElementById('purchaserAddress4').innerHTML=`${checkNull(result.purchasingInfo.address.address4)} `;
            document.getElementById('purchaserAddress5').innerHTML=`${checkNull(result.purchasingInfo.address.address5)} `;
            document.getElementById('purchaserValidAsOn').innerHTML=`${checkNull(result.purchasingInfo.validAsOn)} `;
            document.getElementById('purchaserTin').innerHTML=`${checkNull(result.purchasingInfo.tin)} `;
            document.getElementById('purchaserCst').innerHTML=`${checkNull(result.purchasingInfo.cst)} `;

            document.getElementById('sellerName').innerHTML=`${checkNull(result.sellerInfo.name)} `;
            document.getElementById('sellerAddress1').innerHTML=`${checkNull(result.sellerInfo.address.address1)} `;
            document.getElementById('sellerAddress2').innerHTML=`${checkNull(result.sellerInfo.address.address2)} `;
            document.getElementById('sellerAddress3').innerHTML=`${checkNull(result.sellerInfo.address.address3)} `;
            document.getElementById('sellerAddress4').innerHTML=`${checkNull(result.sellerInfo.address.address4)} `;
            document.getElementById('sellerAddress5').innerHTML=`${checkNull(result.sellerInfo.address.address5)} `;
            document.getElementById('sellerAddress6').innerHTML=`${checkNull(result.sellerInfo.address.address6)} `;
            document.getElementById('sellerStateCode').innerHTML=`${checkNull(stateCodeConvert(result.sellerInfo.address.stateCode))} `;
            document.getElementById('sellerValidAsOn').innerHTML=`${checkNull(result.sellerInfo.validAsOn)} `;
            document.getElementById('sellerTin').innerHTML=`${checkNull(result.sellerInfo.tin)} `;
            document.getElementById('sellerCst').innerHTML=`${checkNull(result.sellerInfo.cst)} `;

            document.getElementById('invoiceNumber').innerHTML=`${checkNull(result.invoiceDetails.invoiceNumber)} `;
            document.getElementById('invoiceValue').innerHTML=`${checkNull(result.invoiceDetails.invoiceValue)} `;
            document.getElementById('validStatus').innerHTML=`${checkNull(validStatus(result.validStatus))} `;

           



            
            document.getElementById("validTable").classList.toggle('hidden');
            document.getElementById("printButton").classList.toggle('hidden');

        
        }).catch(e=>console.log("Error:"+e));
    }
    
})



document.getElementById('printButton').addEventListener('click',()=>{
    // var printContents = document.getElementById('detailsTable').innerHTML;
    var originalContents = document.body.innerHTML;
    document.getElementById('tnc').classList.add('hidden');
    document.getElementById('footer').classList.add('hidden');
    document.getElementById('mainOptions').classList.add('hidden');
    document.getElementById('printButton').classList.add('hidden');
    document.getElementById('navbar').style.display='none';

    // document.body.innerHTML =  printContents  ;

    window.print();

    document.body.innerHTML = originalContents;
    document.getElementById('dealerFormNav').click();
});



function stateCodeConvert(value){
            if( value==28)
                return " Andhra Pradesh";

            else if( value==37)
                return " Andhra Pradesh New";

            else if( value==12)
                return " Arunachal Pradesh";

            else if( value==18)
                return " Assam";

            else if( value==10)
                return " Bihar";

            else if( value==04)
                return " Chandigarh";

            else if( value==22)
                return " Chattisgarh";

            else if( value==26)
                return " Dadra and Nagar Haveli";

            else if( value==25)
                return " Daman and Diu";

            else if( value==07)
                return " Delhi";

            else if( value==30)
                 return "Goa ";
    
            else if( value==24)
                return " Gujarat";

            else if( value==06)
                return " Haryana";

            else if( value==02)
                return " Himachal Pradesh";

            else if( value==01)
                return " Jammu and Kashmir";

            else if( value==20)
                return " Jharkhand";

            else if( value==29)
                return " Karnataka";

            else if( value==32)
                return " Kerala";

            else if( value==23)
                return " Madhya Pradesh";

            else if( value==27)
                return " Maharashtra";

            else if( value==14)
                return " Manipur";

            else if( value==17)
                return " Meghalaya";

            else if( value==15)
                return " Mizoram";

            else if( value==13)
                return " Nagaland";

            else if( value==21)
                return " Odisha";

            else if( value==34)
                return " Pondicherry";

            else if( value==03)
                return " Punjab";

            else if( value==08)
                return " Rajasthan";

            else if( value==11)
                return " Sikkim";

            else if( value==33)
                return " Tamil Nadu";

            else if( value==36)
                return " Telangana";

            else if( value==16)
                return " Tripura";

            else if( value==09)
                return " Uttar Pradesh";

            else if( value==05)
                return " Uttarakhand";
            else if ( value==19)   
                return "West Bengal";
}

function validStatus(prop){
    if(!prop)
        return "No";
    return "Yes"
}

function checkNull (prop){
    if(!prop)
        return "Not Available";
    else 
        return prop;
}

function formTypeCheck (value){
            if( value=="1")return "C-Form";
            else if( value=="2")return "EI-Form";
            else if( value=="3")return "EII-Form";
            else if( value=="4")return "F-Form";
            else if( value=="5")return "H-Form";
}