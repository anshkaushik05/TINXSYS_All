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

    var tinNumberForm=document.getElementById('tinNumberForm').value;
    var captcha = document.getElementById('tinNumberFormCaptcha').value;
    
    var trueTin=0, trueCaptcha = 0;
    if(tinNumberForm.toString().length!=11)
        console.log('not 11 digit');
    else
        trueTin=1;
    if(captcha != getCaptcha)
        console.log('captcha not correct');
    else
        trueCaptcha=1;
    
    if(trueCaptcha && trueTin){
        console.log("all Good");
    }
    
})


//CST Form
document.getElementById('cstSubmit').addEventListener('click',(e)=>{
    // console.log('clicked');
    e.preventDefault();

    var stateNameCst=document.getElementById('stateNameCst').value;
    var cstNumberForm = document.getElementById('cstNumberForm').value;
    var captcha = document.getElementById('captchaCst').value;
    
    var trueCst=0, trueCaptcha = 0; 
    var trueStateNameCst=0;
    if(cstNumberForm.toString().length!=11)
        console.log('not 11 digit');
    else
        trueCst=1;
    if(stateNameCst=='')
        console.log('Please Input a State Value');
    else
        trueStateNameCst=1;
    if(captcha != getCaptcha)
        console.log('captcha not correct');
    else
        trueCaptcha=1;
    
    if(trueCaptcha && trueCst && trueStateNameCst ){
        console.log("all Good");
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

    var formType=document.getElementById('formType').value;
    var stateNameForm=document.getElementById('stateNameForm').value;
    // var seriesNumber = document.getElementById('seriesNumber').value;
    var serialNumber = document.getElementById('serialNumber').value;
    var captchaFormValid = document.getElementById('captchaFormValid').value;
    
    var trueSerial=0, trueCaptcha = 0; 
    var trueStateName=0, trueFormType=0;

    // if(seriesNumber.toString().length!=11)
    //     console.log('not 11 digit');
    // else
    //     trueCst=1;

    if(serialNumber.toString().length!=11)
        console.log('not 11 digit');
    else
        trueSerial=1;

    if(formType=='')
        console.log('Please Input a form type Value');
    else
        trueFormType=1;

    if(stateNameForm=='')
        console.log('Please Input a State Value');
    else
        trueStateName=1;

    if(captchaFormValid != getCaptcha)
        console.log('captcha not correct');
    else
        trueCaptcha=1;
    
    if(trueCaptcha && trueSerial && trueStateName && trueFormType){
        console.log("all Good");
    }
    
})



