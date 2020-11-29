class UI {
  constructor() {
    this.input = document.querySelector("#budget-input");
    this.budgetAmount = document.querySelector("#budget-amount");
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.expenseInput = document.querySelector("#expense-input");
    this.amountInput = document.querySelector("#amount-input");
    this.balance = document.querySelector("#balance");
    this.balanceAmount = document.querySelector("#balance-amount");
    this.expenseAmount = document.querySelector("#expense-amount");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  }

  //submit budget form

  submitBudget() {
    //budget input
    const value = this.input.value;

    //show prompt if field is left empty on form submit
    if(value < 0 || value ==""){
      this.budgetFeedback.classList.add("showItem");
      setTimeout(() => {
        this.budgetFeedback.classList.remove("showItem");
      }, 4000);
    }

    //set budget to input and show balance
    //clear budget input field
    else{
      this.budgetAmount.textContent = value;
      this.showBalance();
      this.input.value = "";
    }
  }

  //submit expense form

  submitExpense() {
    //expense title
    const expense = this.expenseInput.value;
    //expense amount
    const amount = this.amountInput.value;

    //show propmt if fields are left empty on form submit
    if (amount < 0 || amount == "" || expense == "") {
      this.expenseFeedback.classList.add("showItem");
      setTimeout(() => {
        this.budgetFeedback.classList.remove("showItem");
      }, 4000);
    }

    //update the sum total of expenses
    //clear input field in expense form
    else {
      this.expenseAmount.textContent = this.totalExpense();      
      this.amountInput.value = "";
      this.expenseInput.value = "";

      //create object that consists expense title and amount and 
      //an assigned id(starts from 0 and increases by 1)
      let expenseObject = {
        id: this.itemID,
        expense: expense,
        amount: amount
      }
      
      //id increment
      this.itemID++;
      //put expense object into array
      this.itemList.push(expenseObject);

      //add the expense object into DOM and display as html
      this.addExpense(expenseObject);
      this.showBalance();
    }

  }

  //create div element containing expense title, amount and id
  addExpense(expenseObject) {
    const div = document.createElement("div");
    div.classList.add("expenses");
    div.innerHTML = `
    <div class="expense-item d-flex justify-content-between align-items-baseline">

      <h6 class="expense-title mb-0 text-uppercase list-item">- ${expenseObject.expense}</h6>
      <h5 class="expense-amount mb-0 list-item">${expenseObject.amount}</h5>

      <div class="expense-icons list-item">

        <a href="#" class="edit-icon mx-2" data-id="${expenseObject.id}">
          <i class="fas fa-edit"></i>
        </a>
        <a href="#" class="delete-icon" data-id="${expenseObject.id}">
          <i class="fas fa-trash"></i>
        </a>
      </div>
    </div>
    `;

    //add the div to the DOM
    this.expenseList.appendChild(div);
  }

  //calculate and update the balance after any change in budget or addition/subtarction to expenses
  showBalance() {
    const expense = this.expenseAmount.textContent;
    const budget = this.budgetAmount.textContent;
    const balance = budget - expense;
    this.balanceAmount.textContent = balance;

    //color coding for balance
    //if -ve, balance is red
    //if +ve, balance is black
    if (balance < 0) {
      this.balance.classList.remove('showGreen', 'showBlack');
      this.balance.classList.add("showRed");
    }

    else if (balance > 0) {
      this.balance.classList.add('showGreen', 'showBlack');
      this.balance.classList.remove("showRed");
    }

    if (balance == 0) {
      this.balance.classList.remove('showRed', 'showGreen');
      this.balance.classList.add("showBlack");
    }
  }

  //cumulate all expenses and update the expense figure

  totalExpense() {
    let expenseTotal = parseInt(this.expenseAmount.textContent);
    let expense = this.amountInput.value;
    expense = parseInt(expense);
    expenseTotal += expense;
    return expenseTotal;
  }

  //edit an expense

  editExpense(element) {
    //get element clicked by data-id
    let id = parseInt(element.dataset.id);
    //get the ancestor of the element that is to be deleted
    let parent = element.parentElement.parentElement.parentElement;
    //remove elements and its children from DOM
    this.expenseList.removeChild(parent);
    //filter out object from array by using id
    let expense = this.itemList.filter(function (item) {
      return item.id === id;
    });
    const amount = parseInt(expense[0].amount);

    //create a new temporary array to contain all other objects apart from
    //the one being selected for deletion
    let tempList = this.itemList.filter(function (item) {
      return item.id !== id;
    });
    this.itemList = tempList;

    //subtracting amount of removed expense from total expenses
    this.expenseAmount.textContent = parseInt(this.expenseAmount.textContent) - amount;
    this.showBalance();
    //put expense title and amount back into form fields for editing
    this.expenseInput.value = expense[0].expense;
    this.amountInput.value = amount;
  }

  //delete an expense
  deleteExpense(element){
    //get the element clicked by data-id
    let id = parseInt(element.dataset.id);
    //get the ancestor of the element that is to be deleted
    let parent = element.parentElement.parentElement.parentElement;
    //remove elements and its children from DOM
    this.expenseList.removeChild(parent);
    //filter out object from array by using id
    let expense = this.itemList.filter(function (item) {
      return item.id === id;
    });
    const amount = parseInt(expense[0].amount);
    
    //create a new temporary array to contain all other objects apart from
    //the one being selected for deletion
    let tempList = this.itemList.filter(function (item) {
      return item.id !== id;
    });

    //assign temporary array to original array
    this.itemList = tempList;
    //subtracting amount of removed expense from total expenses
    this.expenseAmount.textContent = parseInt(this.expenseAmount.textContent) - amount;
    this.showBalance()
  }
}

//functions to assign events to methods
function eventListeners() {
  const budgetSubmit = document.querySelector("#budget-submit");
  const expenseSubmit = document.querySelector('#expense-submit');
  const expenseList = document.getElementById("expense-list");

  //new instance of UI class
  const ui = new UI();

  budgetSubmit.addEventListener('click', function(event) {
    event.preventDefault();
    ui.submitBudget();
  });

  expenseSubmit.addEventListener('click', function (event) {
    event.preventDefault();
    ui.submitExpense();
  })

  //executing functions based on icon clicked
  expenseList.addEventListener("click", function (event) {
    if (event.target.parentElement.classList.contains('edit-icon')) {
      ui.editExpense(event.target.parentElement)
    }
    else if (event.target.parentElement.classList.contains('delete-icon')) {
      ui.deleteExpense(event.target.parentElement);
    }
  })
}

//binding eventListener function to when DOM loads completely
document.addEventListener('DOMContentLoaded', function() {
  eventListeners();
});