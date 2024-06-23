const BASE_URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");

const fromCurr = document.querySelector("#fromSelect");
const toCurr = document.querySelector("#toSelect");

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="fromSelect" && currCode==="USD"){
            newOption.selected="selected";
        }else if(select.name==="toSelect" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);
    });
}

//yaha element select aa rha hai
const updateFlag = (element) => { 
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src = newSrc;
};



const updateExchangeRate= async() => {
    let amount=document.querySelector(".amt input");
    let amtVal=amount.value;
    if(amtVal==="" || amtVal < 1){
        amtVal=1;
        amount.value='1';
    }

    //console.log(fromCurr,toCurr);
    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    //console.log(rate);
    let finalAmt=amtVal * rate;
    //console.log(finalAmt);
    message.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value} `;
}

btn.addEventListener("click",(evt) =>{
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});