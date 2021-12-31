console.log('working');

for(var i=0;i< length; i++ ){
    document.getElementById(`delete_${i}`).addEventListener('click',(event)=>{
      var j=event.target.id.substr(event.target.id.indexOf('_')+1,event.target.id.length);
      // console.log(j)
      // document.getElementById(`loginId_${j}`).innerHTML
      let deleteData;
      if(document.getElementById(`delete_${j}`).innerHTML=='Delete'){
        deleteData=1;
      }
      else
      deleteData=0;

      fetch('/deleteLoginId',{
                      method: 'POST', 
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({loginId:document.getElementById(`loginId_${j}`).innerHTML,deleteData:deleteData}),
                  }).then(res=>res.json()).then(result=>{
                    // console.log(result);
                    if(document.getElementById(`delete_${j}`).innerHTML=='Delete'){
                      document.getElementById(`delete_${j}`).innerHTML='Undo Delete';
                    }
                    else
                    document.getElementById(`delete_${j}`).innerHTML='Delete';
      })
    })

    document.getElementById(`update_${i}`).addEventListener('click',(event)=>{
      var j=event.target.id.substr(event.target.id.indexOf('_')+1,event.target.id.length);

      fetch('/updateLoginId',{
                      method: 'POST', 
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({loginId:document.getElementById(`loginId_${j}`).innerHTML,activeState:document.getElementById(`activeStateValue_${j}`).value,validityDate:document.getElementById(`validityDate_${j}`).value}),
                  }).then(res=>res.json()).then(result=>{
                    // console.log(result);
                    if(document.getElementById(`update_${j}`).innerHTML=='Update'){
                      document.getElementById(`update_${j}`).innerHTML='Updated';
                    }
                    // else
                    // document.getElementById(`update_${j}`).innerHTML='Delete';
      })
    })

    
  }

  document.getElementById('allData').addEventListener('click',()=>{
      // console.log('clicked');
      for(var i=0;i< length ;i++){
      if(document.getElementById(`row_${i}`).classList.contains('hidden')){
        // console.log('hide');
        document.getElementById(`row_${i}`).classList.remove('hidden');
      }
      }

    })
  document.getElementById('activeBtn').addEventListener('click',()=>{
      // console.log('clicked');
      for(var i=0;i< length ;i++){
      if(!parseInt(document.getElementById(`activeStateValue_${i}`).value)){
        // console.log('hide');
        document.getElementById(`row_${i}`).classList.add('hidden');
      }
      else
      document.getElementById(`row_${i}`).classList.remove('hidden');
      }

    })

  document.getElementById('lockedBtn').addEventListener('click',()=>{
      // console.log('clicked');
      for(var i=0;i< length ;i++){
      if(document.getElementById(`lockedUser_${i}`).innerHTML=='\n                        Not Locked\n                      \n        '){
        // console.log('hide');
        document.getElementById(`row_${i}`).classList.add('hidden');
      }
      else
      document.getElementById(`row_${i}`).classList.remove('hidden');

      }
    })

  document.getElementById('expiryUserBtn').addEventListener('click',()=>{
      // console.log('clicked');
      for(var i=0;i< length ;i++){
        // console.log(document.getElementById(`expiryUser_${i}`).innerHTML);
      if(!(document.getElementById(`expiryUser_${i}`).innerHTML=='\n        \n          \n        \n        Expired')){
        // console.log('hide');
        document.getElementById(`row_${i}`).classList.add('hidden');
      }
      else
      document.getElementById(`row_${i}`).classList.remove('hidden');

      }
    })

    document.getElementById('searchBar').addEventListener('input',()=>{
      var inputVal= document.getElementById('searchBar').value.toLowerCase();

      // console.log(inputVal);
      for(var i=0;i<length;i++){

        
          if(! (document.getElementById(`fullName_${i}`).innerHTML.toLowerCase().includes(inputVal) ))
              document.getElementById(`row_${i}`).classList.add('hidden');
          else 
          document.getElementById(`row_${i}`).classList.remove('hidden');
      }
      })