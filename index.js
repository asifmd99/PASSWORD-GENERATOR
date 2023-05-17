const inputSlider=document.querySelector("[data-lengthslider]");
 const lengthDisplay=document.querySelector("[data-lengthnumber]");
 const passwordDisplay=document.querySelector("[data-passworddisplay]");
 const copybtn=document.querySelector("[data-copy]");
 const copymsg=document.querySelector("[data-copymsg]");
 const uppercasecheck=document.querySelector("#uppercase");
 const lowercasecheck=document.querySelector('#lowercase');
 const numbercheck=document.querySelector('#numbers');
 const symbolcheck=document.querySelector("#symbols");

 const indicator=document.querySelector("[data-indicator]");
 const generatebtn=document.querySelector(".generatebutton");
 const allcheckbox=document.querySelectorAll("input[type=checkbox]");
  const symbol='~!@^&#$%*()_+<>,.?/:;{}[]';
 let password="";
 let passwordlength=10;
 let checkcount=1;
 //set strength circle color to grey
setIndicator("#ccc");

 //set password length
 handleslider();
  function handleslider(){
 inputSlider.value=passwordlength;
    lengthDisplay.innerText=passwordlength;
    const min=inputSlider.min;
    const max=inputSlider.max;
    inputSlider.style.backgroundSize=((passwordlength-min)*100/(max-min))+ "% 100%";
  }

  function setIndicator(color){
indicator.style.backgroundColor=color;
//shadow
indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
  }
  function getRndInteger(min,max){
 return Math.floor(Math.random()*(max-min))+min;

  }
  
function generaterandomnumber(){
    return getRndInteger(0,9);
}
function generateLowerCase(){

    return String.fromCharCode(getRndInteger(97,123));
}
function generateUpperCase(){

    return  String.fromCharCode(getRndInteger(65,91));
}
function generateSymbol(){
 const randnum=getRndInteger(0,symbol.length);
 
return  symbol.charAt(randnum);
}

function calcstrength(){

    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSym=false;
    if(uppercasecheck.checked) hasupper=true;
    if(lowercasecheck.checked) hasLower=true;
    if(numbercheck.checked) hasNum=true;
    if(symbolcheck.checked) hasSym=true;
  if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordlength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }



}

 async function copycontent(){
 try{
    await navigator.clipboard.writeText(passwordDisplay.value);
copymsg.innerText="copied";
 }
 catch(e){
    copymsg.innerText="Failed";
 }
 //to make copy wla span visible
copymsg.classList.add("active");
setTimeout (()=>{
    copymsg.classList.remove("active");
},2000);
}
 inputSlider.addEventListener('input',(e)=>{
 //console.log("abc"+passwordlength);
passwordlength=e.target.value;
handleslider();
//console.log("xyz"+passwordlength);
});

copybtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
      copycontent();
});


function  handlecheckboxchange(){

    checkcount=0;
    allcheckbox.forEach((checkbox)=>{
        if(checkbox.checked) checkcount++;

    });
    //special condition
    if(passwordlength<checkcount){
 passwordlength=checkcount;
 handleslider();


    }
}

allcheckbox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handlecheckboxchange);
});

function shufflePassword(array) {
  //Fisher Yates Method
  for (let i = array.length - 1; i > 0; i--) {
      //random J, find out using random function
      const j = Math.floor(Math.random() * (i + 1));
      //swap number at i index and j index
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  let str = "";
  array.forEach((el) => (str += el));
  return str;
}


generatebtn.addEventListener('click',()=>{
//none of checkbox selected
if(checkcount<=0) return ;
if(passwordlength<checkcount){
    passwordlength=checkcount;
    handleslider();
}
//new password

//remove old password
password="";
 // if(uppercasecheck.checked) {
    //     password += generateUpperCase();
    // }

    // if(lowercaseCheck.checked) {
    //     password += generateLowerCase();
    // }

    // if(numbersCheck.checked) {
    //     password += generateRandomNumber();
    // }

    // if(symbolsCheck.checked) {
    //     password += generateSymbol();
    // }
  let funarr=[];
     if(uppercasecheck.checked) funarr.push(generateUpperCase);
     if(lowercasecheck.checked) funarr.push(generateLowerCase);
     if(numbercheck.checked) funarr.push(generaterandomnumber);
     if(symbolcheck.checked) funarr.push(generateSymbol);
     //  compulsory action

     for( let i=0;i<funarr.length;i++){

        password+=funarr[i]();


     }
     console.log("necessaRY ADDITION DONE");
     //REM ADDITION
     for( let i=0;i<passwordlength-funarr.length;i++){
   let randomindex=getRndInteger(0,funarr.length);
   console.log("randindex"+randomindex);
   password+=funarr[randomindex]();
     }
     console.log("Remaining adddition done");
     //shuffle the password
     password=shufflePassword(Array.from(password));
     console.log("Shuffling done");
    //show in UI
    passwordDisplay.value=password;
    console.log("UI adddition done");
    //calculate strength
    calcstrength();
});
































//slider