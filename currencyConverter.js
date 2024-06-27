const baseUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies"

const dropdowns = document.querySelectorAll(".dropdown select");
const fromCoun = document.querySelector(".from select");
const toCoun = document.querySelector(".to select");
const btn = document.querySelector(".convert");
const msg = document.querySelector(".message");
for (let dropdown of dropdowns){
    for(let countryCode in countryList){
        const newOption = document.createElement("option");
        newOption.value = countryCode;
        newOption.innerText = countryCode;
        if(countryCode.name == "USA" && dropdown.name == "from"){
            newOption.selected = selected;
        }else if(countryCode == "IN" && dropdown.name == "to"){
            newOption.selected = selected;
        }
        dropdown.append(newOption);
    }
    dropdown.addEventListener("change",(evt)=>{
        changeFlag(evt.target);
    })
}

const changeFlag = (element)=>{
    const countryCode = element.value;
    let newsrc = `https://flagsapi.com/${countryList[countryCode]}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    const amount = document.querySelector("form input");
    const currAmt = amount.value;
    if(currAmt == "" || currAmt <= 0){
        currAmt = 1;
        amount.value = "1";
    }
    
    const url = `${baseUrl}/${fromCoun.value.toLowerCase()}.json`;
    const response = await fetch(url);
    const data = await response.json();
    let rate = data[fromCoun.value.toLowerCase()][toCoun.value.toLowerCase()];
    const convertedValue = currAmt * rate;
    msg.innerText = `${currAmt} ${fromCoun.value} = ${convertedValue} ${toCoun.value}`;
})