let stateCode, firstName, loginId, userId, activeState=1;

document.getElementById('activeState').addEventListener('click',()=>{
    if(activeState)
        activeState=0;
    else
        activeState=1;
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

    var data={
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
        body: JSON.stringify(data),
        
    }).then(res=>res.json()).then(data=>{
        userId=data.userId;
        document.getElementById('userId').value=userId;
    })
    
    document.getElementById('stateCodeReference').value=stateCode;
    document.getElementById('loginId').value=loginId;
    }

})


document.getElementById('nextLogin').addEventListener('click',(event)=>{
    event.preventDefault();
    var ele = document.getElementById("personalDetails");
    
    ele.reportValidity();

    if(ele.checkValidity()){
        // console.log(activeState);
        loginId=document.getElementById('loginId').value;

        if(stateCode==loginId.substr(loginId.indexOf('_')+1,loginId.length))
        var data={
            userId:userId,
            loginId:loginId,
            password:document.getElementById('password').value,
            role:document.getElementById('role').value,
            activeState:activeState,
            firstTimeLogin:document.getElementById('firstTimeLogin').value,
            validity:document.getElementById('validity').value,
            stateCode:stateCode

        }
        else{
            document.getElementById('validLoginId').innerHTML=`Login ID should end with _${stateCode}`;
        }

        fetch('/loginDetails',{
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),

        }).then(res=>res.json()).then(data=>{

            userId=data.userId;
            document.getElementById('userId').value=userId;
        })
    }
    


})

