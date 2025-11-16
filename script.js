// Function to generate random date within a range
function getRandomDate(start, end) {
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return date
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replace(/ /g, " ");
}

// Function to generate a random amount (now primarily used for initial values, not receipt totals)
function getRandomAmount(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

/**
 * Generates a random integer between min (inclusive) and max (inclusive).
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a random date within the last year.
 * @returns {string} Date string in YYYY-MM-DD format.
 */
function generateNewRandomDate() {
  const end = new Date(); // Today
  const start = new Date();
  start.setFullYear(start.getFullYear() - 1); // One year ago
  const randomDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  const year = randomDate.getFullYear();
  const month = (randomDate.getMonth() + 1).toString().padStart(2, "0");
  const day = randomDate.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Provides icon and color for a given category name from transactions_v1.json.
 * @param {string} categoryName The name of the category from the JSON source.
 * @returns {object} Object with icon class and color hex.
 */
function getCategoryDetails(categoryName) {
  const lowerCategory = categoryName.toLowerCase();
  let details = { icon: "fas fa-receipt", color: "#777777" }; // Default

  if (
    lowerCategory.includes("online") ||
    lowerCategory.includes("versandhandel")
  ) {
    details = { icon: "fas fa-shopping-cart", color: "#007bff" };
  } else if (lowerCategory.includes("buchhandlung")) {
    details = { icon: "fas fa-book", color: "#ffc107" };
  } else if (
    lowerCategory.includes("elektro") ||
    lowerCategory.includes("elektronik")
  ) {
    details = { icon: "fas fa-plug", color: "#fd7e14" };
  } else if (
    lowerCategory.includes("lebensmittel") ||
    lowerCategory.includes("groceries")
  ) {
    details = { icon: "fas fa-shopping-basket", color: "#28a745" };
  } else if (
    lowerCategory.includes("streaming") ||
    lowerCategory.includes("video")
  ) {
    details = { icon: "fas fa-tv", color: "#dc3545" };
  } else if (
    lowerCategory.includes("lieferdienst") ||
    lowerCategory.includes("essenslieferdienst")
  ) {
    details = { icon: "fas fa-motorcycle", color: "#6f42c1" };
  } else if (
    lowerCategory.includes("mode") ||
    lowerCategory.includes("kleidung")
  ) {
    details = { icon: "fas fa-tshirt", color: "#e83e8c" };
  } else if (lowerCategory.includes("drogerie")) {
    details = { icon: "fas fa-pump-soap", color: "#6610f2" };
  } else if (lowerCategory.includes("post")) {
    details = { icon: "fas fa-envelope", color: "#20c997" };
  } else if (lowerCategory.includes("apotheke")) {
    details = { icon: "fas fa-pills", color: "#17a2b8" };
  } else if (
    lowerCategory.includes("mobilfunk") ||
    lowerCategory.includes("telefo")
  ) {
    details = { icon: "fas fa-mobile-alt", color: "#6f42c1" }; // Magenta-like
  } else if (
    lowerCategory.includes("fitness") ||
    (lowerCategory.includes("sport") && !lowerCategory.includes("sportnahrung"))
  ) {
    details = { icon: "fas fa-dumbbell", color: "#ff6347" };
  } else if (lowerCategory.includes("sportnahrung")) {
    details = { icon: "fas fa-capsules", color: "#20B2AA" }; // Specific for sport nutrition
  } else if (
    lowerCategory.includes("restaurant") ||
    lowerCategory.includes("gastronomie") ||
    lowerCategory.includes("cafe")
  ) {
    details = { icon: "fas fa-utensils", color: "#d63384" };
  } else if (lowerCategory.includes("optiker")) {
    details = { icon: "fas fa-glasses", color: "#0dcaf0" };
  } else if (lowerCategory.includes("schuhgeschäft")) {
    details = { icon: "fas fa-shoe-prints", color: "#adb5bd" };
  } else if (
    lowerCategory.includes("möbel") ||
    lowerCategory.includes("home essentials")
  ) {
    details = { icon: "fas fa-couch", color: "#ffc107" }; // Ikea yellow
  } else if (
    lowerCategory.includes("öffentliche verkehrsmittel") ||
    lowerCategory.includes("transport")
  ) {
    details = { icon: "fas fa-bus", color: "#495057" };
  } else if (
    lowerCategory.includes("kaffee") &&
    !lowerCategory.includes("cafe")
  ) {
    // Nespresso specific
    details = { icon: "fas fa-coffee", color: "#6f4e37" };
  } else if (lowerCategory.includes("parfümerie")) {
    details = { icon: "fas fa-spray-can", color: "#f06595" };
  } else if (lowerCategory.includes("reise")) {
    details = { icon: "fas fa-plane", color: "#0d6efd" };
  } else if (lowerCategory.includes("tankstelle")) {
    details = { icon: "fas fa-gas-pump", color: "#343a40" };
  }
  return details;
}

/**
 * Generates a specified number of random transactions using data from transactions_v1.json.
 * @param {Array} sourceData Parsed data from transactions_v1.json.
 * @param {number} count Number of transactions to generate.
 * @returns {Array} Array of generated transaction objects.
 */
function generateTransactionsFromSource(sourceData, count) {
  const generatedTransactions = [];
  if (!sourceData || sourceData.length === 0) {
    console.error(
      "Source data for transactions (transactions_v1.json) is empty or invalid."
    );
    return [];
  }

  for (let i = 0; i < count; i++) {
    const randomMerchantData =
      sourceData[getRandomInt(0, sourceData.length - 1)];

    if (!randomMerchantData.items || randomMerchantData.items.length === 0) {
      // console.warn(\`Merchant ${randomMerchantData.merchant} has no items. Skipping.\`);
      i--; // Decrement to ensure 'count' transactions are generated if we skip
      continue;
    }

    const numItemsInReceipt = getRandomInt(
      1,
      Math.min(5, randomMerchantData.items.length)
    );
    const receiptItems = [];
    let receiptSubtotalNetNumeric = 0;
    let receiptTotalTaxNumeric = 0;
    let receiptGrandTotalGrossNumeric = 0;

    // Shuffle merchant items to pick distinct ones for the receipt
    const shuffledMerchantItems = [...randomMerchantData.items].sort(
      () => 0.5 - Math.random()
    );
    const selectedJsonItems = shuffledMerchantItems.slice(0, numItemsInReceipt);

    selectedJsonItems.forEach((jsonItem) => {
      const quantity = getRandomInt(1, 3);
      const unitPriceGross = parseFloat(jsonItem.price);
      const unitTaxRate = parseFloat(jsonItem.tax); // Percentage
      // Use provided net_price if available and valid, otherwise calculate
      let unitPriceNet = parseFloat(jsonItem.net_price);
      if (isNaN(unitPriceNet) || unitPriceNet <= 0) {
        unitPriceNet = unitPriceGross / (1 + unitTaxRate / 100);
      }

      const lineTotalGross = quantity * unitPriceGross;
      const lineTotalNet = quantity * unitPriceNet;
      const lineTaxAmount = lineTotalGross - lineTotalNet;

      receiptItems.push({
        name: jsonItem.name,
        quantity: quantity,
        unit_price_gross: unitPriceGross, // Gross price per unit
        unit_price_net: unitPriceNet, // Net price per unit
        line_total_gross: lineTotalGross, // quantity * unitPriceGross
        line_total_net: lineTotalNet, // quantity * unitPriceNet
        tax_rate_percent: unitTaxRate, // Tax rate for this item
        line_tax_amount: lineTaxAmount, // Tax amount for this line
        label: jsonItem.label || "", // Include label if present
      });

      receiptSubtotalNetNumeric += lineTotalNet;
      receiptTotalTaxNumeric += lineTaxAmount;
      receiptGrandTotalGrossNumeric += lineTotalGross;
    });

    const categoryDetails = getCategoryDetails(randomMerchantData.category);
    const transactionId =
      Date.now().toString() + "-" + Math.random().toString(36).substring(2, 11);

    generatedTransactions.push({
      id: transactionId,
      merchant: randomMerchantData.merchant,
      category: randomMerchantData.category, // Original category name from JSON
      amount: `-€${receiptGrandTotalGrossNumeric.toFixed(2)}`, // Transaction amount is the gross total
      date: generateNewRandomDate(), // Uses YYYY-MM-DD
      icon: categoryDetails.icon,
      color: categoryDetails.color,
      receipt: {
        items: receiptItems,
        subtotal_net: receiptSubtotalNetNumeric.toFixed(2), // Sum of all line_total_net
        tax: receiptTotalTaxNumeric.toFixed(2), // Sum of all line_tax_amount
        total: receiptGrandTotalGrossNumeric.toFixed(2), // Sum of all line_total_gross
      },
      label:
        randomMerchantData.items.length > 0
          ? randomMerchantData.items[0].label || ""
          : "", // Example: take label from first item or merchant level if available
    });
  }
  return generatedTransactions;
}

/**
 * Generates fixed monthly recurring transactions for the current month.
 * @returns {Array} Array of fixed transaction objects.
 */
function generateRecurringMonthlyTransactions() {
  const fixedTransactions = [];
  const today = new Date(2025, 4, 30); // Current date: May 30, 2025 (Month is 0-indexed)
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0 for January, 4 for May

  const formatDate = (date) => {
    // Returns YYYY-MM-DD to be consistent with generateNewRandomDate()
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Salary
  fixedTransactions.push({
    id: `salary-${currentYear}-${currentMonth + 1}-01`,
    merchant: "Your Company Ltd.",
    category: "Salary",
    amount: "+€3450.00",
    date: formatDate(new Date(currentYear, currentMonth, 1)),
    icon: "fas fa-money-bill-wave",
    color: "#28a745", // Green for income
    receipt: null,
    label: "Monthly Salary May 2025",
  });

  // Rent
  fixedTransactions.push({
    id: `rent-${currentYear}-${currentMonth + 1}-01`,
    merchant: "Landlord Properties GmbH",
    category: "Housing",
    amount: "-€881.96",
    date: formatDate(new Date(currentYear, currentMonth, 1)),
    icon: "fas fa-home",
    color: "#dc3545", // Red for expense
    receipt: null,
    label: "Rent Payment May 2025",
  });

  // Insurance
  fixedTransactions.push({
    id: `insurance-${currentYear}-${currentMonth + 1}-05`,
    merchant: "SecureLife Insurance AG",
    category: "Insurance",
    amount: "-€50.00", // Placeholder
    date: formatDate(new Date(currentYear, currentMonth, 5)),
    icon: "fas fa-shield-alt",
    color: "#17a2b8", // Teal
    receipt: null,
    label: "General Insurance May 2025",
  });

  // Wiener Linien Jahreskarte (Annual Ticket - Monthly Cost)
  // const annualTicketCost = 365.0; // Original calculation
  // const monthlyTicketCost = (annualTicketCost / 12).toFixed(2); // Original calculation

  fixedTransactions.push({
    id: `transport-${currentYear}-${currentMonth + 1}-10`,
    merchant: "Wiener Linien",
    category: "Transport",
    amount: "-€33.00", // Updated amount
    date: formatDate(new Date(currentYear, currentMonth, 10)),
    icon: "fas fa-bus",
    color: "#6c757d", // Grey
    receipt: {
      items: [
        {
          name: "Jahreskarte 1x",
          quantity: 1,
          unit_price_gross: 33.0,
          unit_price_net: 29.7,
          line_total_gross: 33.0,
          line_total_net: 29.7,
          tax_rate_percent: 10,
          line_tax_amount: 3.3,
          label: "",
        },
      ],
      subtotal_net: "29.70",
      tax: "3.30",
      total: "33.00",
    },
    label: "Wiener Linien Monthly Ticket Cost May 2025",
  });

  // Utilities
  fixedTransactions.push({
    id: `utilities-${currentYear}-${currentMonth + 1}-15`,
    merchant: "City Energy & Water",
    category: "Utilities",
    amount: "-€75.00", // Placeholder
    date: formatDate(new Date(currentYear, currentMonth, 15)),
    icon: "fas fa-bolt",
    color: "#ffc107", // Yellow
    receipt: null,
    label: "Utilities (Energy, Water) May 2025",
  });

  return fixedTransactions;
}

/**
 * Fetches transaction source data from transactions_v1.json,
 * generates random transactions, and prepares them for display.
 */
async function initializePrimaryTransactions() {
  try {
    const response = await fetch("transactions_v1.json");
    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status} while fetching transactions_v1.json`
      );
    }
    const sourceData = await response.json();

    // Generate random transactions using the JSON data
    const randomTransactions = generateTransactionsFromSource(sourceData, 100);

    // Generate fixed recurring monthly transactions
    const recurringMonthlyTransactions = generateRecurringMonthlyTransactions();

    // Combine fixed and random transactions
    // The global 'transactions' array will be replaced by this new set.
    transactions = [...recurringMonthlyTransactions, ...randomTransactions];

    // Reset display state for pagination if loadTransactions uses it
    displayedTransactions = 5; // Or your default initial display count

    if (typeof loadTransactions === "function") {
      loadTransactions(); // This will use the new global 'transactions' array
    } else {
      console.error("loadTransactions function is not defined.");
    }
  } catch (error) {
    console.error("Failed to initialize transactions from JSON:", error);
    // Fallback or error message to user
    // showMessage("Could not load transaction data. Please try again later.");
  }
}

// Initialize transactions array
let transactions = []; // Ensuring this is 'let' if it's reassigned, or 'const' if only items are pushed. Let for reassignment.

let displayedTransactions = 5; // Ensure this is defined if not already (it was in the provided snippet)
let myChart;
let budgetChart;
let transactionHistory = []; // Assuming this is for a different feature or can be populated as needed.

document.addEventListener("DOMContentLoaded", () => {
  // Prioritize loading transactions from JSON
  initializePrimaryTransactions().then(() => {
    // Any other initializations that depend on transactions can go here
    // For example, if charts need to be rendered after transactions are loaded:
    if (typeof renderAccountChart === "function") renderAccountChart();
    if (typeof renderBudgetChart === "function") renderBudgetChart();
  });

  // Keep other event listeners and initial setup not related to transaction data generation
  const transactionSearch = document.getElementById("transaction-search");
  if (transactionSearch) {
    transactionSearch.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase();
      const filtered = filterTransactions(query);
      loadTransactions(filtered);
    });
  }

  const showMoreBtn = document.getElementById("show-more-btn");
  if (showMoreBtn) {
    showMoreBtn.addEventListener("click", loadMoreTransactions);
  }
  // ... other initializations from the original DOMContentLoaded
});

function navigateTo(pageId) {
  const pages = document.querySelectorAll(".page");
  pages.forEach((page) => {
    page.classList.remove("active");
  });
  document.getElementById(pageId).classList.add("active");

  // Update navigation history
  if (transactionHistory[transactionHistory.length - 1] !== pageId) {
    transactionHistory.push(pageId);
  }

  // Update active nav item
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.remove("active");
  });
  const navItem = document.querySelector(
    `.nav-item[onclick="navigateTo('${pageId}')"]`
  );
  if (navItem) {
    navItem.classList.add("active");
  }
}

function navigateBack() {
  if (transactionHistory.length > 1) {
    transactionHistory.pop(); // Remove current page
    const previousPageId = transactionHistory[transactionHistory.length - 1];
    navigateTo(previousPageId);
  }
}

/**
 * Filters the transactions based on a search query.
 * The search is case-insensitive and checks merchant, amount, date, category,
 * and receipt item names and prices.
 * @param {string} query The search string.
 * @returns {Array} The filtered list of transactions.
 */
function filterTransactions(query) {
  if (!query) {
    return transactions; // Return all transactions if query is empty
  }
  return transactions.filter((transaction) => {
    const searchableText = [
      transaction.merchant,
      transaction.amount,
      transaction.date,
      transaction.category,
    ].map((s) => String(s).toLowerCase()); // Ensure all are strings and lowercase

    // Check receipt items
    if (transaction.receipt && transaction.receipt.items) {
      transaction.receipt.items.forEach((item) => {
        searchableText.push(String(item.name).toLowerCase());
        // searchableText.push(String(item.price).toLowerCase()); // OLD - item.price no longer directly on receipt item
        searchableText.push(String(item.unit_price_gross).toLowerCase()); // NEW - search by unit gross price
        searchableText.push(String(item.line_total_gross).toLowerCase()); // NEW - search by line total gross price
      });
    }

    return searchableText.some((text) => text.includes(query));
  });
}

/**
 * Loads and displays transactions in the list.
 * @param {Array} [transactionsToRender=transactions] Optional array of transactions to render.
 * If not provided, uses the global `transactions` array.
 */
function loadTransactions(transactionsToRender = transactions) {
  const transactionsList = document.getElementById("transactions-list");
  transactionsList.innerHTML = ""; // Clear existing transactions

  // Sort transactions by date (most recent first) before slicing
  const sortedTransactions = [...transactionsToRender].sort((a, b) => {
    const dateA = new Date(
      a.date.replace(/(\d{2}) (\w{3}) (\d{4})/, "$2 $1, $3")
    );
    const dateB = new Date(
      b.date.replace(/(\d{2}) (\w{3}) (\d{4})/, "$2 $1, $3")
    );
    return dateB - dateA;
  });

  const transactionsToDisplay = sortedTransactions.slice(
    0,
    displayedTransactions
  );

  if (transactionsToDisplay.length === 0) {
    transactionsList.innerHTML =
      '<p style="text-align: center; color: #777; padding: 20px;">No transactions found matching your search.</p>';
  } else {
    transactionsToDisplay.forEach((transaction) => {
      const transactionDiv = document.createElement("div");
      transactionDiv.classList.add("transaction");
      transactionDiv.onclick = () => showTransactionDetail(transaction);

      const iconDiv = document.createElement("div");
      iconDiv.classList.add("transaction-icon");
      iconDiv.style.backgroundColor = transaction.color;
      iconDiv.innerHTML = `<i class="${transaction.icon}" style="color: white;"></i>`;

      const detailsDiv = document.createElement("div");
      detailsDiv.classList.add("transaction-details");
      detailsDiv.innerHTML = `
                <div class="transaction-title">${transaction.merchant}</div>
                <div class="transaction-info">${transaction.category} • ${transaction.date}</div>
            `;

      const amountDiv = document.createElement("div");
      amountDiv.classList.add("transaction-amount");
      if (transaction.amount.startsWith("+")) {
        amountDiv.classList.add("positive");
      }
      amountDiv.textContent = transaction.amount;

      transactionDiv.appendChild(iconDiv);
      transactionDiv.appendChild(detailsDiv);
      transactionDiv.appendChild(amountDiv);

      transactionsList.appendChild(transactionDiv);
    });
  }

  // Hide "Show More" button if all transactions (or filtered transactions) are displayed
  const showMoreBtn = document.getElementById("show-more-btn");
  if (displayedTransactions >= sortedTransactions.length) {
    // Use sortedTransactions.length for comparison
    showMoreBtn.style.display = "none";
  } else {
    showMoreBtn.style.display = "block";
  }
}

function loadMoreTransactions() {
  displayedTransactions += 5; // Load 5 more transactions
  const currentSearchQuery = document
    .getElementById("transaction-search")
    .value.toLowerCase();
  const filtered = filterTransactions(currentSearchQuery);
  loadTransactions(filtered); // Re-render the list with more items
}

function showTransactionDetail(transaction) {
  document.getElementById("transaction-merchant").textContent =
    transaction.merchant;
  document.getElementById("transaction-amount").textContent =
    transaction.amount;
  document.getElementById("transaction-date").textContent = transaction.date;
  document.getElementById("transaction-type").textContent =
    transaction.category;
  document.getElementById("transaction-reference").textContent =
    transaction.category; // Using category as reference for mock data

  const receiptIcon = document.getElementById("receipt-icon");
  receiptIcon.innerHTML = `<i class="${transaction.icon}" style="color: white;"></i>`;
  receiptIcon.style.backgroundColor = transaction.color;

  const receiptItemsList = document.getElementById("receipt-items-list");
  receiptItemsList.innerHTML = "";
  if (
    transaction.receipt &&
    transaction.receipt.items &&
    transaction.receipt.items.length > 0
  ) {
    transaction.receipt.items.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("receipt-item");
      // OLD:
      // itemDiv.innerHTML = `
      //           <div class="receipt-item-name">${item.name}</div>
      //           <div class="receipt-item-price">${item.price}</div>
      //       `;
      // NEW:
      itemDiv.innerHTML = `
                <div class="receipt-item-name">${item.quantity} x ${
        item.name
      } (@ €${item.unit_price_gross.toFixed(2)})</div>
                <div class="receipt-item-price">€${item.line_total_gross.toFixed(
                  2
                )}</div>
            `;
      receiptItemsList.appendChild(itemDiv);
    });
    document.getElementById("receipt-subtotal").textContent =
      "€" + transaction.receipt.subtotal_net; // Ensure currency symbol if not already part of the string
    document.getElementById("receipt-tax").textContent =
      "€" + transaction.receipt.tax; // Ensure currency symbol
    document.getElementById("receipt-total").textContent =
      "€" + transaction.receipt.total; // Ensure currency symbol
  } else {
    // Handle cases where no receipt items are available
    receiptItemsList.innerHTML =
      '<div class="receipt-item">No detailed receipt available.</div>';
    document.getElementById("receipt-subtotal").textContent =
      transaction.amount; // Or format appropriately if it's just a number string
    document.getElementById("receipt-tax").textContent = "€0.00";
    document.getElementById("receipt-total").textContent = transaction.amount; // Or format
  }

  // Set amount color based on positive/negative
  const receiptAmountElement = document.getElementById("transaction-amount");
  if (transaction.amount.startsWith("+")) {
    receiptAmountElement.style.color = "#28a745"; // Green for positive
  } else {
    receiptAmountElement.style.color = "#dc3545"; // Red for negative
  }

  navigateTo("receipt-page");
}

function renderAccountChart() {
  const ctx = document.getElementById("accountChart").getContext("2d");
  if (myChart) {
    myChart.destroy(); // Destroy existing chart if it exists
  }
  myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Account Balance",
          data: [10000, 10500, 11000, 12000, 12560, 13000],
          borderColor: "#0078d7",
          backgroundColor: "rgba(0, 120, 215, 0.2)",
          fill: true,
          tension: 0.3,
          pointBackgroundColor: "#0078d7",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#0078d7",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "Account Balance Trend",
          font: {
            size: 16,
            weight: "bold",
          },
          color: "#333",
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: "#555",
          },
        },
        y: {
          beginAtZero: false,
          grid: {
            color: "#eee",
          },
          ticks: {
            callback: function (value) {
              return "€" + value.toLocaleString();
            },
            color: "#555",
          },
        },
      },
    },
  });
}

function renderBudgetChart() {
  const ctx = document.getElementById("budgetChart").getContext("2d");
  if (budgetChart) {
    budgetChart.destroy(); // Destroy existing chart if it exists
  }

  const budgetData = {
    labels: ["Groceries", "Transport", "Housing", "Entertainment"],
    data: [210, 84, 900, 70],
    budgetLimits: [320, 200, 1000, 200],
  };

  budgetChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: budgetData.labels,
      datasets: [
        {
          label: "Spent",
          data: budgetData.data,
          backgroundColor: [
            "rgba(0, 120, 215, 0.8)", // Blue
            "rgba(40, 167, 69, 0.8)", // Green
            "rgba(220, 53, 69, 0.8)", // Red
            "rgba(155, 89, 182, 0.8)", // Purple
          ],
          borderColor: [
            "rgba(0, 120, 215, 1)",
            "rgba(40, 167, 69, 1)",
            "rgba(220, 53, 69, 1)",
            "rgba(155, 89, 182, 1)",
          ],
          borderWidth: 1,
        },
        {
          label: "Budget Limit",
          data: budgetData.budgetLimits,
          backgroundColor: "rgba(200, 200, 200, 0.4)", // Lighter grey for limits
          borderColor: "rgba(150, 150, 150, 0.8)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          labels: {
            color: "#333",
          },
        },
        title: {
          display: true,
          text: "Monthly Budget Overview",
          font: {
            size: 16,
            weight: "bold",
          },
          color: "#333",
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: "#555",
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            color: "#eee",
          },
          ticks: {
            callback: function (value) {
              return "€" + value;
            },
            color: "#555",
          },
        },
      },
    },
  });
}

function showMessage(message) {
  const modal = document.getElementById("message-modal");
  document.getElementById("modal-message").textContent = message;
  modal.style.display = "flex"; // Use flex to center the modal
}

function hideMessage() {
  const modal = document.getElementById("message-modal");
  modal.style.display = "none";
}

function showPdfLoading() {
  document.getElementById("pdf-loading-modal").style.display = "flex";
}

function hidePdfLoading() {
  document.getElementById("pdf-loading-modal").style.display = "none";
}

/**
 * Hides the budget tips modal.
 */
function hideBudgetTips() {
  const modal = document.getElementById("budget-tips-modal");
  modal.style.display = "none";
}

function exportReceiptAsPdf() {
  showPdfLoading();
  const receiptContainer = document.getElementById(
    "receipt-container-to-export"
  );
  const generalDetails = document.querySelector(".general-transaction-details");

  // Create a temporary div to hold content for PDF, ensuring it's not hidden by overflow
  const printContent = document.createElement("div");
  printContent.style.width = receiptContainer.offsetWidth + "px"; // Match width for layout
  printContent.style.padding = "20px"; // Add some padding for better PDF appearance
  printContent.style.backgroundColor = "#fff"; // Ensure white background for PDF
  printContent.style.fontFamily = "Inter, sans-serif"; // Ensure font consistency

  // Append a clone of the receipt container and general details
  printContent.appendChild(receiptContainer.cloneNode(true));
  printContent.appendChild(generalDetails.cloneNode(true));

  // Append to body temporarily to render for html2canvas
  document.body.appendChild(printContent);

  html2canvas(printContent, {
    scale: 2, // Increase scale for better resolution
    useCORS: true, // Enable CORS if you have external images (though we don't here)
  })
    .then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF("p", "mm", "a4"); // Portrait, millimeters, A4 size

      const imgWidth = 190; // A4 width minus margins (210mm - 10mm*2)
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 10; // Initial position from top

      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("ubank_receipt.pdf");
      hidePdfLoading();
      document.body.removeChild(printContent); // Clean up temporary div
      showMessage("Receipt exported as PDF!");
    })
    .catch((error) => {
      hidePdfLoading();
      document.body.removeChild(printContent); // Clean up temporary div
      console.error("Error generating PDF:", error);
      showMessage("Failed to export receipt. Please again.");
    });
}

// Function to get budget tips using Gemini API
async function getBudgetTips(category, spent, limit) {
  const budgetTipsModal = document.getElementById("budget-tips-modal");
  const budgetTipsContent = document.getElementById("budget-tips-content");
  const budgetTipsLoading = document.getElementById("budget-tips-loading");
  const budgetTipsCategory = document.getElementById("budget-tips-category");

  budgetTipsCategory.textContent = category;
  budgetTipsContent.innerHTML = ""; // Clear previous content
  budgetTipsContent.classList.remove("insight-response"); // Remove styling for placeholder
  budgetTipsLoading.style.display = "block"; // Show loading indicator
  budgetTipsModal.style.display = "flex"; // Show modal

  const prompt = `You are a financial advisor. I have spent €${spent} out of my €${limit} budget for ${category}. Provide 3 concise and actionable tips on how I can save money and stay within or reduce my spending for this category.`;

  try {
    let chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });
    const payload = { contents: chatHistory };
    const apiKey = "AIzaSyB8NyLdFT_nkiHLAXEAWoHqGhUAq-MHS3E"; // Provided API Key
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `API error: ${response.status} - ${errorData.error.message}`
      );
    }

    const result = await response.json();
    if (
      result.candidates &&
      result.candidates.length > 0 &&
      result.candidates[0].content &&
      result.candidates[0].content.parts &&
      result.candidates[0].content.parts.length > 0
    ) {
      const text = result.candidates[0].content.parts[0].text;
      budgetTipsContent.innerHTML = `<p>${text.replace(/\n/g, "<br>")}</p>`;
      budgetTipsContent.classList.add("insight-response"); // Add styling back
    } else {
      budgetTipsContent.innerHTML =
        '<p class="placeholder-text">No insights generated. Please try again.</p>';
      budgetTipsContent.classList.add("insight-response");
    }
  } catch (error) {
    console.error("Error fetching budget tips:", error);
    budgetTipsContent.innerHTML = `<p class="placeholder-text">Error generating tips: ${error.message}.</p>`;
    budgetTipsContent.classList.add("insight-response");
  } finally {
    budgetTipsLoading.style.display = "none"; // Hide loading indicator
  }
}

// Function to get financial insights using Gemini API
async function getFinancialInsights() {
  const insightQueryInput = document.getElementById("insight-query");
  const insightResponseDiv = document.getElementById("insight-response");
  const insightLoadingDiv = document.getElementById("insight-loading");

  const userQuery = insightQueryInput.value.trim();

  if (!userQuery) {
    showMessage("Please enter a question to get insights.");
    return;
  }

  insightResponseDiv.innerHTML = ""; // Clear previous response
  insightResponseDiv.classList.remove("insight-response"); // Temporarily remove styling
  insightLoadingDiv.style.display = "block"; // Show loading indicator

  // Construct a detailed context of recent transactions including receipt items for Gemini
  const allTransactionsContext = transactions
    .map((t) => {
      let transactionDetails = `Transaction ID: ${t.id}, Merchant: ${t.merchant}, Amount: ${t.amount}, Date: ${t.date}, Category: ${t.category}`;
      if (t.receipt && t.receipt.items && t.receipt.items.length > 0) {
        const items = t.receipt.items
          // OLD: .map((item) => `${item.name} (${item.price})`)
          // NEW: Using unit gross price for conciseness in the prompt
          .map((item) => `${item.name} (@€${item.unit_price_gross.toFixed(2)})`)
          .join("; ");
        transactionDetails += `, Receipt Items: [${items}]`;
        // Add subtotal, tax, and total if available in receipt
        if (t.receipt.subtotal_net)
          // Updated to subtotal_net
          transactionDetails += `, Subtotal (Net): €${t.receipt.subtotal_net}`;
        if (t.receipt.tax) transactionDetails += `, Tax: €${t.receipt.tax}`;
        if (t.receipt.total)
          transactionDetails += `, Total (Gross): €${t.receipt.total}`;
      }
      // Assuming a generic card detail if not explicitly in transaction data
      transactionDetails += `, Card Used: •••• 3568 (Personal)`;
      // Placeholder for discounts if they were available
      transactionDetails += `, Discounts: None`; // Or "Discount: €X.XX" if applicable
      return transactionDetails;
    })
    .join(" ||| "); // Use a very strong separator between full transaction records

  const prompt = `You are an expert bank clerk and financial advisor. You have access to the following transaction, card, and receipt details, including items and their prices, as well as transaction details and discounts (if any).\n\nHere is the transaction data:\n${allTransactionsContext}\n\nBased on this data, please answer the user's question. If the information is not explicitly available in the provided data, state that you cannot access real-time or more granular details beyond what is given. Do not make up information.\n\nUser's Question: \"${userQuery}\"\n\nProvide a concise, helpful, and professional answer.`;

  try {
    let chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });
    const payload = { contents: chatHistory };
    const apiKey = "AIzaSyD2NHHY_AVnyC4xwfF7REhFVEhNH4M223Q"; // Provided API Key
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `API error: ${response.status} - ${errorData.error.message}`
      );
    }

    const result = await response.json();
    if (
      result.candidates &&
      result.candidates.length > 0 &&
      result.candidates[0].content &&
      result.candidates[0].content.parts &&
      result.candidates[0].content.parts.length > 0
    ) {
      const text = result.candidates[0].content.parts[0].text;
      insightResponseDiv.innerHTML = `<p>${text.replace(/\n/g, "<br>")}</p>`;
      insightResponseDiv.classList.add("insight-response"); // Add styling back
    } else {
      insightResponseDiv.innerHTML =
        '<p class="placeholder-text">No insights generated. Please try again.</p>';
      insightResponseDiv.classList.add("insight-response");
    }
  } catch (error) {
    console.error("Error fetching financial insights:", error);
    insightResponseDiv.innerHTML = `<p class="placeholder-text">Error generating insights: ${error.message}.</p>`;
    insightResponseDiv.classList.add("insight-response");
  } finally {
    insightLoadingDiv.style.display = "none"; // Hide loading indicator
  }
}
