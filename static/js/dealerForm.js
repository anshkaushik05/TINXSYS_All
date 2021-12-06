var viewTinForm=1
var viewCstForm=0
var viewFormVerification=0
console.log('working');
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