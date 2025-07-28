import React, { useState } from "react";
import "./WalletExpensesComponent.css";
import TableWithPagination from "../ExpenseTable/ExpenseTable";

const WalletExpensesComponent = ({
  walletBalance,
  setWalletBalance,
  expenses,
  setExpenses,
}) => {
  const [incomeInput, setIncomeInput] = useState("");

  const categories = [
    "Food",
    "Travel",
    "Entertainment",
    "Shopping",
    "Grocery",
    "Others",
  ];

  const handleAddIncome = () => {
    const incomeAmount = parseInt(incomeInput);
    if (!isNaN(incomeAmount)) {
      setWalletBalance(walletBalance + incomeAmount);
      setIncomeInput("");
    }
  };

  const handleExpenseListUpdate = (newList) => {
    setExpenses(newList);
  };

  return (
    <div className="wallet-container">
      <div className="wallet-card">
        <h2>Wallet Balance</h2>
        <div className="wallet-amount">₹{walletBalance.toLocaleString()}</div>
        <div className="add-income-section">
          <input
            type="number"
            placeholder="Enter income"
            value={incomeInput}
            onChange={(e) => setIncomeInput(e.target.value)}
          />
          <button id="addIncomeBtn" onClick={handleAddIncome}>
            Add Income
          </button>
        </div>
      </div>

      <div className="expenses-card">
        <TableWithPagination
          expenseData={expenses}
          handleExpenseListUpdate={handleExpenseListUpdate}
          categories={categories}
        />
      </div>
    </div>
  );
};

export default WalletExpensesComponent;
