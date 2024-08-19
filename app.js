//!Selectors

//*Income Selectors
const addForm = document.getElementById("add-form");
const incomeInput = document.getElementById("income-input");
const addButon = document.getElementById("add*btn");

//*Expenses Selectors
const expenseForm = document.getElementById("expense-form");
const expenseInput = document.getElementById("expense");
const dateInput = document.getElementById("date");
const amountInput = document.getElementById("amount");

//*Expense Table Selectors
const expenseBody = document.getElementById("expense-body");

//*Result Table Selectors
const yourIncomeTd = document.getElementById("your-income");
const yourExpenseTd = document.getElementById("your-expense");
const yourResultTd = document.getElementById("result");
const clearButon = document.getElementById("clear");

//!Variables
//*income
let incomes = 0;
let expenseList = [];

//!Events

//! Window Load
window.addEventListener("load", () => {
  incomes = Number(localStorage.getItem("incomes"));
  dateInput.valueAsDate = new Date();
  expenseList = JSON.parse(localStorage.getItem("expenses")) || [];
  expenseList.forEach((expense) => writeToDom(expense));
  calculateAndUpdate();
});

//! Add
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  incomes = Number(incomes) + Number(incomeInput.value);
  localStorage.setItem("incomes", incomes);
  addForm.reset();
  calculateAndUpdate();
});

//! Expense
expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newExpense = {
    id: new Date().getTime(),
    expenseField: expenseInput.value,
    date: dateInput.value,
    amount: amountInput.value,
  };
  expenseList.push(newExpense);
  localStorage.setItem("expenses", JSON.stringify(expenseList));
  writeToDom(newExpense);
  calculateAndUpdate();
  expenseForm.reset();
  dateInput.valueAsDate = new Date();
});

//! Remove
expenseBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-trash-can")) {
    e.target.parentElement.parentElement.remove();
    const id = e.target.id;
    //?Related object is deleted
    expenseList = expenseList.filter((expense) => expense.id != id);
    //?Deleted object was sent to localStorage
    localStorage.setItem("expenses", JSON.stringify(expenseList));
    calculateAndUpdate();
  }
});

//! Remove All
clearButon.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete?")) {
    incomes = 0;
    expenseList = [];
    localStorage.clear();
    expenseBody.innerHTML = ``;
    calculateAndUpdate();
  }
});

//!Functions
const calculateAndUpdate = () => {
  yourIncomeTd.innerText = incomes;
  const expenses = expenseList.reduce(
    (sub, exp) => sub + Number(exp.amount),
    0
  );
  yourExpenseTd.innerText = expenses;
  console.log(expenses);
  yourResultTd.textContent = incomes - expenses;
};

const writeToDom = (newExpense) => {
  const { id, date, amount, expenseField } = newExpense;

  const newTr = document.createElement("tr");
  expenseBody.appendChild(newTr);

  const tdDate = document.createElement("td");
  tdDate.textContent += date;
  newTr.appendChild(tdDate);

  const tdAlan = document.createElement("td");
  tdAlan.textContent += expenseField;
  newTr.appendChild(tdAlan);

  const tdAmount = document.createElement("td");
  tdAmount.textContent += amount;
  newTr.appendChild(tdAmount);

  const tdIcon = document.createElement("td");
  const icon = document.createElement("i");
  icon.id = id;
  icon.className = "fa-solid fa-trash-can text-danger";
  icon.style.cursor = "pointer";
  tdIcon.appendChild(icon);
  newTr.appendChild(tdIcon);
};
