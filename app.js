// AQUATRACK - JAVASCRIPT

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
// ROLE SELECTION (login page)
// ===============================

const roleButtons = document.querySelectorAll(".role-btn");
let selectedRole = "supervisor"; // matches the button marked "active" in your HTML

roleButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    roleButtons.forEach((b) => b.classList.remove("active"));
    this.classList.add("active");
    selectedRole = this.dataset.role;
  });
});

// ===============================
// LOGIN
// ===============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    localStorage.setItem("aquaRole", selectedRole);
    window.location.href = "dashboard.html";
  });
}

// ===============================
// LOGOUT / SWITCH ROLE
// ===============================

document.getElementById("logoutLink")?.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("aquaRole");
  window.location.href = "index.html";
});

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
    // Opening figures are a one-time reset point for the day, so these stay as = not +=
    aquaData.openingBalance = Number(openingBalanceInput.value) || 0;
    aquaData.openingStock = Number(openingStockInput.value) || 0;

    saveData();
    updateDashboard();

    openingBalanceInput.value = "";
    openingStockInput.value = "";

    showToast("Opening figures saved ✓");
  });
}

/// ===============================
// PRODUCTION
// ===============================

const saveProduction = document.getElementById("saveProduction");

if (saveProduction) {
  saveProduction.addEventListener("click", function () {
    const machineEl = document.getElementById("machineType");
    const productionQuantityEl = document.getElementById("productionQuantity");
    const goodBagsEl = document.getElementById("goodBags");
    const damagedBagsEl = document.getElementById("damagedBags");

    const machine = machineEl ? machineEl.value : "Machine";
    const good = Number(goodBagsEl.value) || 0;
    const damaged = Number(damagedBagsEl.value) || 0;

    if (good <= 0 && damaged <= 0) {
      showToast("Enter at least one bag quantity before saving");
      return;
    }

    aquaData.production += Number(productionQuantityEl.value) || 0;
    aquaData.goodBags += good;
    aquaData.damagedBags += damaged;

    saveData();
    updateDashboard();

    const recordsList = document.querySelector(".records");
    if (recordsList) {
      const record = document.createElement("div");
      record.className = "record";
      record.innerHTML = `
        <h3>${machine}</h3>
        <p>${good} good, ${damaged} damaged</p>
        <strong>${good} bags</strong>
        <br />
        <span class="status">Completed</span>
      `;
      recordsList.prepend(record);
    }

    productionQuantityEl.value = "";
    goodBagsEl.value = "";
    damagedBagsEl.value = "";

    showToast("Production saved ✓");
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
    const customerEl = document.getElementById("customerName");
    const statusEl = document.getElementById("paymentStatus");

    const customer = customerEl
      ? customerEl.value || "Walk-in customer"
      : "Walk-in customer";
    const quantity = Number(bagsSold.value) || 0;
    const price = Number(pricePerBag.value) || 0;
    const total = quantity * price;
    const status = statusEl ? statusEl.value : "Paid";

    if (quantity <= 0) {
      showToast("Enter a valid quantity before saving");
      return;
    }

    aquaData.salesQuantity += quantity;
    aquaData.salesAmount += total;

    saveData();
    updateDashboard();

    const recordsList = document.querySelector(".records");
    if (recordsList) {
      const record = document.createElement("div");
      record.className = "record";
      const statusClass = status === "Pending" ? "status pending" : "status";
      record.innerHTML = `
        <h3>${customer}</h3>
        <p>${quantity} bags</p>
        <strong>₦${total.toLocaleString()}</strong>
        <br />
        <span class="${statusClass}">${status}</span>
      `;
      recordsList.prepend(record);
    }

    if (customerEl) customerEl.value = "";
    bagsSold.value = "";
    pricePerBag.value = "350";
    totalSales.value = "₦0";

    showToast("Sale saved ✓");
  });
}

// ===============================
// EXPENSES
// ===============================

const saveExpense = document.getElementById("saveExpense");
const recordsList = document.querySelector(".records");

if (saveExpense) {
  saveExpense.addEventListener("click", function () {
    const categoryEl = document.getElementById("expenseCategory");
    const expenseAmountEl = document.getElementById("expenseAmount");
    const expenseDescriptionEl = document.getElementById("expenseDescription");

    const category = categoryEl.value || "Uncategorized";
    const amount = Number(expenseAmountEl.value) || 0;
    const description = expenseDescriptionEl.value || "No description";

    if (amount <= 0) {
      showToast("Enter a valid amount before saving");
      return;
    }

    // Update running totals
    aquaData.expenses += amount;
    saveData();
    updateDashboard();

    // Add a new record card to the top of the list
    if (recordsList) {
      const record = document.createElement("div");
      record.className = "record";
      record.innerHTML = `
        <h3>${category}</h3>
        <p>${description}</p>
        <strong>₦${amount.toLocaleString()}</strong>
        <br />
        <span class="status">Recorded</span>
      `;
      recordsList.prepend(record);
    }

    // Clear the form
    categoryEl.value = "";
    expenseAmountEl.value = "";
    expenseDescriptionEl.value = "";

    showToast("Expense saved ✓");
  });
}

// ===============================
// ROLE-BASED VIEW + PAGE PERSONALIZATION
// (runs once per page load, covers greeting, sidebar name, role tag,
//  hiding "add" panels for Manager view-only access, and defaulting
//  date inputs to today)
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const currentRole = localStorage.getItem("aquaRole") || "supervisor";

  const greeting = document.getElementById("greeting");
  if (greeting) {
    greeting.textContent =
      currentRole === "manager"
        ? "Good morning, Manager 👋"
        : "Good morning, Supervisor 👋";
  }

  const profileName = document.getElementById("profileName");
  if (profileName) {
    profileName.textContent =
      currentRole === "manager" ? "Bola — Manager" : "Amaka — Supervisor";
  }

  const roleTag = document.getElementById("roleTag");
  if (roleTag) {
    roleTag.textContent =
      currentRole === "manager" ? "Manager (view-only)" : "Supervisor";
  }

  if (currentRole === "manager") {
    document
      .querySelectorAll(".panel, .opening-section, .form-card")
      .forEach((el) => {
        el.style.display = "none";
      });
  }

  const dateInputs = document.querySelectorAll('input[type="date"]');
  dateInputs.forEach((input) => {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    input.value = today;
  });
});
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

  // Stock status number
  const stockNumber = document.querySelector(".stock-number");
  if (stockNumber) {
    stockNumber.textContent = Math.max(0, currentStock);
  }

  // Recent activity — honest state instead of hardcoded sample data
  const activityList = document.getElementById("recentActivity");
  if (activityList) {
    const hasActivity =
      aquaData.goodBags > 0 ||
      aquaData.salesAmount > 0 ||
      aquaData.expenses > 0;

    activityList.innerHTML = hasActivity
      ? `
        <li><strong>Production</strong><br>${aquaData.goodBags} good bags</li>
        <li><strong>Sales</strong><br>${aquaData.salesQuantity} bags — ₦${aquaData.salesAmount.toLocaleString()}</li>
        <li><strong>Expenses</strong><br>₦${aquaData.expenses.toLocaleString()}</li>
      `
      : `<li>No activity recorded yet today.</li>`;
  }

  // Stock status percentage
  const stockPercent = document.querySelector(".stock-percent");
  if (stockPercent) {
    const capacity = 800; // adjust to your factory's real max storage
    const pct = Math.min(100, Math.round((currentStock / capacity) * 100));
    stockPercent.textContent = pct + "% of storage capacity";
  }
}

// Run dashboard update on load
updateDashboard();
