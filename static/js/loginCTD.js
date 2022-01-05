let stateCode, firstName, loginId, userId, activeState=1, firstTimeLogin=1;
let personalDetailsData,loginDetailsData,officialDetailsData,referenceDetailsData;

document.getElementById('activeState').addEventListener('click',()=>{
    if(activeState)
        activeState=0;
    else
        activeState=1;
})

document.getElementById('firstTimeLogin').addEventListener('click',()=>{
    if(firstTimeLogin)
        firstTimeLogin=0;
    else
        firstTimeLogin=1;
})

document.getElementById('nextPersonal').addEventListener('click',(event)=>{
    event.preventDefault();
    var ele = document.getElementById("personalDetails");
    
    ele.reportValidity();
    // console.log("login working");

    firstName=document.getElementById('firstName').value;
    stateCode=document.getElementById('stateName').value;

    loginId=firstName.toLowerCase() +'_'+stateCode;
    if(ele.checkValidity()){

    personalDetailsData={
        firstName:firstName,
        middleName: document.getElementById('middleName').value,
        lastName: document.getElementById('lastName').value,
        mobileNo: document.getElementById('mobileNo').value,
        emailId: document.getElementById('emailId').value,
        address: document.getElementById('address').value,
        stateName:document.getElementById('stateName').value
    }
    
    fetch('/userId',{
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify(data),
        
    }).then(res=>res.json()).then(data=>{
        userId=data.userId;
        document.getElementById('userId').value=userId;
        document.getElementById("personalDetails").classList.toggle('hidden');
        document.getElementById("loginDetails").classList.toggle('hidden');

    })
    
    document.getElementById('stateCodeReference').value=stateCode;
    document.getElementById('loginId').value=loginId;
    checkIdAvailability();
    }

})

function checkIdAvailability(){
    
    
    fetch('/checkId',{
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({loginId:document.getElementById('loginId').value}),
        
    }).then(res=>res.json()).then( data=>{
        var checkId=data.checkId;
        // console.log(checkId);
        document.getElementById('validLoginId').innerHTML=checkId;
    })
}

document.getElementById('nextLogin').addEventListener('click',(event)=>{
    event.preventDefault();
    var ele = document.getElementById("loginDetails");
    if(!(document.getElementById('validLoginId').innerHTML=='This Login ID is available')){
        document.getElementById('loginNotification').innerHTML='Login ID is Not Available';

        setTimeout(() => {
            document.getElementById('loginNotification').innerHTML='';
        }, 4000);

    }
    
    ele.reportValidity();

    if(ele.checkValidity()&&(document.getElementById('validLoginId').innerHTML=='This Login ID is available')){
        // console.log(activeState);
        loginId=document.getElementById('loginId').value;
        
        
        if(stateCode==loginId.substr(loginId.indexOf('_')+1,loginId.length)){
        
        document.getElementById('password').value= CryptoJS.AES.encrypt(document.getElementById('password').value,"CIPHERKEY").toString();
        
        loginDetailsData={
            userId:userId,
            loginId:loginId,
            password:document.getElementById('password').value,
            role:document.getElementById('role').value,
            activeState:activeState,
            firstTimeLogin:document.getElementById('firstTimeLogin').value,
            validity:document.getElementById('validity').value,
            }

            fetch('/loginDetails',{
                method: 'POST', 
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({stateCode:stateCode}),
    
            }).then(res=>res.json()).then(data=>{
                
                for(var i=0;i<data.ctdOfficers.length;i++)
                document.getElementById('ctdName').innerHTML+=`<option value="${data.ctdOfficers[i].firstName+" "+data.ctdOfficers[i].lastName}">${data.ctdOfficers[i].firstName+" "+data.ctdOfficers[i].middleName+" "+data.ctdOfficers[i].lastName}</option>`;
                document.getElementById("loginDetails").classList.toggle('hidden');
                document.getElementById("officialDetails").classList.toggle('hidden');
                
            })
        }
        else{
            document.getElementById('validLoginId').innerHTML=`Login ID should end with _${stateCode}`;
        }

    }
    


})

document.getElementById('nextOfficial').addEventListener('click',(event)=>{
    event.preventDefault();
    var ele = document.getElementById("officialDetails");
    
    ele.reportValidity();

    if(ele.checkValidity()){
    fetch('/officialDetails',{
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({stateCode:stateCode}),

    }).then(res=>res.json()).then(data=>{
        
        for(var i=0;i<data.ctdOfficers.length;i++)
        document.getElementById('referenceName').innerHTML+=`<option value="${data.ctdOfficers[i].firstName+" "+data.ctdOfficers[i].lastName}">${data.ctdOfficers[i].firstName+" "+data.ctdOfficers[i].middleName+" "+data.ctdOfficers[i].lastName}</option>`;

        officialDetailsData={
            designationCoforge:document.getElementById('designationCoforge').value,
            designationCtd:document.getElementById('designationCtd').value,
            location:document.getElementById('location').value,
            ctdName:document.getElementById('ctdName').value,
            ctdMobile:document.getElementById('ctdMobile').value,
            ctdEmail:document.getElementById('ctdEmail').value
        }
        
        document.getElementById("officialDetails").classList.toggle('hidden');
        document.getElementById("referenceDetails").classList.toggle('hidden');
    })
    }
})

document.getElementById('nextReference').addEventListener('click',(event)=>{
    event.preventDefault();
    var ele = document.getElementById("referenceDetails");
    
    ele.reportValidity();

    if(ele.checkValidity()){
    referenceDetailsData={
        referenceName:document.getElementById('referenceName').value,
        adminUser:document.getElementById('adminUser').value
    }
    loginDetailsData.password=CryptoJS.AES.decrypt(document.getElementById('password').value,"CIPHERKEY").toString(CryptoJS.enc.Utf8);
    var data={
        personalDetailsData:personalDetailsData,
        loginDetailsData:loginDetailsData,
        officialDetailsData:officialDetailsData,
        referenceDetailsData:referenceDetailsData
    }

    fetch('/referenceDetails',{
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),

    }).then(res=>res.json()).then(data=>{
        
        console.log(data);
        window.location.assign("/ctdDetails");
    })
    }

})



document.getElementById('loginBack').addEventListener('click',()=>{
    document.getElementById("loginDetails").classList.toggle('hidden');
    document.getElementById("personalDetails").classList.toggle('hidden');
})
document.getElementById('officialBack').addEventListener('click',()=>{
    document.getElementById("officialDetails").classList.toggle('hidden');
    document.getElementById("loginDetails").classList.toggle('hidden');
})
document.getElementById('referenceBack').addEventListener('click',()=>{
    document.getElementById("referenceDetails").classList.toggle('hidden');
    document.getElementById("officialDetails").classList.toggle('hidden');
})

