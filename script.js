const dropdowns = document.querySelectorAll('.dropdown select'); //This line of code selects all <select> elements within elements that have the class "dropdown" and assigns them to the variable dropdowns.
// console.log(dropdowns);  return nodelist with 2 select
const btn = document.querySelector('form button');
const fromCurr = document.querySelector('.from select');
// console.log(fromCurr); //returns object of first select(from)
const toCurr = document.querySelector('.to select'); //returns object of first select(to)
const msg = document.querySelector('.msg');

// for (let code in countryList) {
//   console.log(code, countryList[code]); //INR IN
// }

for (let select of dropdowns) {
  // console.log(select);
  for (currCode in countryList) {
    //currCode - INR
    let newOption = document.createElement('option');
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === 'from' && currCode === 'USD') {
      newOption.selected = true;
    } else if (select.name === 'to' && currCode === 'INR') {
      newOption.selected = true;
    }
    select.append(newOption);
  }
  select.addEventListener('change', evt => {
    //The "change" event is triggered whenever the value of the select element changes. 'evt'  , which represents the event object
    updateFlag(evt.target); // evt.target refers to the element that triggered the event, in this case, the select element whose value changed.
  });
}

const updateFlag = element => {
  let currCode = element.value;
  // console.log(currCode);  //INR
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  // console.log(element.parentElement); //select-container
  let img = element.parentElement.querySelector('img');
  // This statement first accesses the parent element of the element variable.
  // Then, it uses querySelector('img') to find the first <img> element that is a descendant of the parent element.

  // let img = document.querySelector('.select-container img');
  //This statement directly queries the entire document for the first <img> element that is a descendant of an element with the class .select-container.
  // console.log(img);
  img.src = newSrc;
};

btn.addEventListener('click', evt => {
  evt.preventDefault(); //default behavior of form to prevent click event from submitting page
  let amount = document.querySelector('.amount input');
  // console.log(amount);
  let amtVal = amount.value;
  console.log(amtVal);
  if (amtVal === '' || amtVal < 1) {
    amtVal = 1;
    console.log(amtVal);
    amount.value = amtVal;
  }
  console.log(fromCurr.value, toCurr.value);
  for (const sourceCurrency in exchangeRates) {
    const exchangeRate = exchangeRates[sourceCurrency];

    // Splitting source and target currencies
    const sourceCurrencyCode = sourceCurrency.substring(1); //USD_to_INR
    const [source, target] = sourceCurrencyCode.split('_');
    // console.log(source);
    // console.log(target);
    // console.log(sourceCurrencyCode);
    // console.log(exchangeRate);
    if (source === fromCurr.value && target === toCurr.value) {
      let finalAmt = exchangeRate * amtVal;
      // console.log(finalAmt);
      msg.innerText = `${amtVal}${fromCurr.value} = ${finalAmt}${toCurr.value}`;
      break; // Terminate the loop once the desired exchange rate is found
    }
  }
});
