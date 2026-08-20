// AQUATRACK - MINIMAL JAVASCRIPT

// ===============================
// GET SAVED DATA
// ===============================

let aquaData = JSON.parse(localStorage.getItem("aquaData")) || {
  openingBalance: 0,
  openingStock: 0,
  production: 0,
  goodBags: 0,
  damagedBags: 0,
  salesQuantity: 0,
  salesAmount: 0,
  expenses: 0,
};

function saveData() {
  localStorage.setItem("aquaData", JSON.stringify(aquaData));
}

// ===============================
// LOGIN
// ===============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    window.location.href = "dashboard.html";
  });
}

// ===============================
// RESET DATA
// ===============================

const resetBtn = document.getElementById("resetData");

if (resetBtn) {
  resetBtn.addEventListener("click", function () {
    const confirmed = confirm(
      "This will clear all saved figures (opening balance, stock, production, sales, expenses) and cannot be undone. Continue?",
    );

    if (!confirmed) return;

    aquaData = {
      openingBalance: 0,
      openingStock: 0,
      production: 0,
      goodBags: 0,
      damagedBags: 0,
      salesQuantity: 0,
      salesAmount: 0,
      expenses: 0,
    };

    saveData();
    updateDashboard();
    showToast("All figures reset ✓");
  });
}

// ===============================
// OPENING FIGURES
// ===============================

const saveOpening = document.getElementById("saveOpeningFigures");

if (saveOpening) {
  const openingBalanceInput = document.getElementById("openingBalance");
  const openingStockInput = document.getElementById("openingStock");

  saveOpening.addEventListener("click", function () {
    aquaData.openingBalance = Number(openingBalanceInput.value) || 0;
    aquaData.openingStock = Number(openingStockInput.value) || 0;

    saveData();
    updateDashboard();

    // clear the fields so it's obviously ready for a fresh entry
    openingBalanceInput.value = "";
    openingStockInput.value = "";

    showToast("Opening figures saved ✓");
  });
}

// ===============================
// TOAST (reusable for every save)
// ===============================

function showToast(message) {
  let toast = document.getElementById("aquaToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "aquaToast";
    toast.className = "save-toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}

// ===============================
// PRODUCTION
// ===============================

const saveProduction = document.getElementById("saveProduction");

if (saveProduction) {
  saveProduction.addEventListener("click", function () {
    const produced =
      Number(document.getElementById("productionQuantity").value) || 0;

    const good = Number(document.getElementById("goodBags").value) || 0;

    const damaged = Number(document.getElementById("damagedBags").value) || 0;

    aquaData.production = produced;
    aquaData.goodBags = good;
    aquaData.damagedBags = damaged;

    saveData();
    updateDashboard();

    productionQuantity.value = "";
    goodBags.value = "";
    damagedBags.value = "";

    showToast("Opening figures saved ✓");
  });
}

// ===============================
// SALES
// ===============================

const bagsSold = document.getElementById("bagsSold");

const pricePerBag = document.getElementById("pricePerBag");

const totalSales = document.getElementById("totalSales");

function calculateSale() {
  if (!bagsSold || !pricePerBag || !totalSales) {
    return;
  }

  const quantity = Number(bagsSold.value) || 0;

  const price = Number(pricePerBag.value) || 0;

  const total = quantity * price;

  totalSales.value = "₦" + total.toLocaleString();
}

if (bagsSold) {
  bagsSold.addEventListener("input", calculateSale);
}

if (pricePerBag) {
  pricePerBag.addEventListener("input", calculateSale);
}

const saveSale = document.getElementById("saveSale");

if (saveSale) {
  saveSale.addEventListener("click", function () {
    const quantity = Number(bagsSold.value) || 0;

    const price = Number(pricePerBag.value) || 0;

    aquaData.salesQuantity = quantity;
    aquaData.salesAmount = quantity * price;

    saveData();
    updateDashboard();
    bagsSold.value = "";

    showToast("Opening figures saved ✓");
  });
}

// ===============================
// EXPENSES
// ===============================

const saveExpense = document.getElementById("saveExpense");

if (saveExpense) {
  saveExpense.addEventListener("click", function () {
    const amount = Number(document.getElementById("expenseAmount").value) || 0;

    aquaData.expenses = amount;

    saveData();
    updateDashboard();

    expenseAmount.value = "";
    expenseDescription.value = "";

    showToast("Opening figures saved ✓");
  });
}

// ===============================
// DASHBOARD
// ===============================

function updateDashboard() {
  const currentStock =
    aquaData.openingStock + aquaData.goodBags - aquaData.salesQuantity;

  const moneyAtHand =
    aquaData.openingBalance + aquaData.salesAmount - aquaData.expenses;

  // Production card
  const productionCard = document.querySelector(
    ".cards .card:first-child strong",
  );

  if (productionCard) {
    productionCard.textContent = aquaData.goodBags;
  }

  // Current stock
  const stockElement = document.getElementById("currentStock");

  if (stockElement) {
    stockElement.textContent = Math.max(0, currentStock);
  }

  // Sales
  const salesElement = document.getElementById("dashboardSales");

  if (salesElement) {
    salesElement.textContent = "₦" + aquaData.salesAmount.toLocaleString();
  }

  // Expenses
  const expensesElement = document.getElementById("dashboardExpenses");

  if (expensesElement) {
    expensesElement.textContent = "₦" + aquaData.expenses.toLocaleString();
  }

  // Stock status
  const stockNumber = document.querySelector(".stock-number");

  if (stockNumber) {
    stockNumber.textContent = Math.max(0, currentStock);
  }
}

// Run dashboard update
updateDashboard();
