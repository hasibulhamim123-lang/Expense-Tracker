let transactions = [];

let savedTransactions = () => {
  localStorage.setItem("transactions", JSON.stringify(transactions));
};

let addBtn = document.querySelector(".add-btn");
let transText = document.querySelector("#trans-name");
let amountInput = document.querySelector("#amount");
let typeInput = document.querySelector(".type-input");
let listElement = document.querySelector(".list");
let balanceElement = document.querySelector(".balance");

addBtn.addEventListener("click", function () {
  let description = transText.value.trim();
  let amount = Number(amountInput.value);
  let type = typeInput.value;

  if (description === "" || typeof amount !== "number" || amount <= 0) {
    alert("Please enter a valid Transaction!");
    return;
  }

  let transaction = {
    id: Date.now(),
    description: description,
    amount: amount,
    type: type,
  };

  transactions.push(transaction);
  console.log(transactions);

  transText.value = "";
  amountInput.value = "";

  updateDisplay();
});

function updateDisplay() {
  listElement.innerHTML = "";
  let totalBalance = 0;

  transactions.forEach((item) => {
    if (item.type === "income") {
      totalBalance += item.amount;
    } else {
      totalBalance -= item.amount;
    }

    const li = document.createElement("li");

    li.innerHTML = `<span>${item.description}</span> <span>$${item.amount}`;

    listElement.appendChild(li);
  });

  balanceElement.textContent = `Balance :$${totalBalance}`;
}

