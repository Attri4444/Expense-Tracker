import React, { useEffect, useState } from "react";
import "./WalletExpensesComponent.css";
import TableWithPagination from "../ExpenseTable/ExpenseTable";

const WalletExpensesComponent = () => {
  const [expenseList, setExpenseList] = useState([]);
  const [walletBalance, setWalletBalance] = useState(0);
  const [incomeInput, setIncomeInput] = useState("");

  const categories = [
    "Food",
    "Travel",
    "Entertainment",
    "Shopping",
    "Grocery",
    "Others",
  ];

  // Load from localStorage
  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenseList")) || [];
    const storedBalance = parseInt(localStorage.getItem("walletBalance")) || 0;

    setExpenseList(storedExpenses);
    setWalletBalance(storedBalance);
  }, []);

  // Persist to localStorage whenever things change
  useEffect(() => {
    localStorage.setItem("expenseList", JSON.stringify(expenseList));
  }, [expenseList]);

  useEffect(() => {
    localStorage.setItem("walletBalance", walletBalance.toString());
  }, [walletBalance]);

  const handleAddIncome = () => {
    const incomeAmount = parseInt(incomeInput);
    if (!isNaN(incomeAmount)) {
      setWalletBalance(walletBalance + incomeAmount);
      setIncomeInput("");
    }
  };

  const handleExpenseListUpdate = (newList) => {
    setExpenseList(newList);
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
          expenseData={expenseList}
          handleExpenseListUpdate={handleExpenseListUpdate}
          categories={categories}
        />
      </div>
    </div>
  );
};

export default WalletExpensesComponent;
