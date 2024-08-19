//!Selectors

//*Income Selectors
const addForm = document.getElementById("add-form");
const incomeInput = document.getElementById("income-input");
const addButon = document.getElementById("add*btn");
const yourIncome = document.getElementById("your-income")
//!Variables
let gelirler = "";

//!Events
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  gelirler = Number(gelirler) + Number(incomeInput.value);
  localStorage.setItem("gelirler", gelirler);
  console.log(gelirler);  
  addForm.reset();
  calculateAndUpdate()
});

window.addEventListener("load", ()=>{
    gelirler = Number(localStorage.getItem("gelirler"))
    calculateAndUpdate()
})

//!Functions
const calculateAndUpdate = ()=>{
yourIncome.innerText = gelirler
}