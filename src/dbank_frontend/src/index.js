import { dbank_backend } from "../../declarations/dbank_backend";

// update function the amount in the back on the UI
async function updateScreen() {
  var currentAmount = await dbank_backend.checkBalance();
  document.getElementById("value").innerText=currentAmount.toFixed(2);
}

//after screen loads update screen
window.addEventListener("load", async () => {await updateScreen()}); 


// listen for submit button 
document.querySelector("form").addEventListener("submit", async (e)=> {
  // forms have a refresh default function--> disable
  e.preventDefault();

  // get the button so that we can temporarily disable it after the transaction button is pressed
  const button = e.target.querySelector("#submit-btn");

  // get deposit amount or withdrawal amount from UI
  const depositAmount = Number(document.getElementById("input-amount").value);
  const withdrawalAmount = Number(document.getElementById("withdrawal-amount").value);
  // console.log(withdrawalAmount)

  // disable button after amount is retrieved from submit button
  button.setAttribute("disabled", true);

  // deposit or withdraw in backend
  if (depositAmount> 0) {
    await dbank_backend.deposit(depositAmount);
    document.getElementById("input-amount").value= "";
    console.log("deposited")
  } else if (withdrawalAmount > 0) {
    await dbank_backend.withdraw(withdrawalAmount);
    document.getElementById("withdrawal-amount").value= "";
    console.log('withdrew')
  }

  button.removeAttribute("disabled");
  await updateScreen();

  dbank_backend.compound();
})
// document.querySelector("form").addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const button = e.target.querySelector("button");

//   const name = document.getElementById("name").value.toString();

//   button.setAttribute("disabled", true);

//   // Interact with foo actor, calling the greet method
//   const greeting = await dbank_backend.greet(name);

//   button.removeAttribute("disabled");

//   document.getElementById("greeting").innerText = greeting;

//   return false;
// });
