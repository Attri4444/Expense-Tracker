import React, { useState, useEffect } from "react";
import WalletExpensesComponent from "../WalletExpenses/WalletExpenses";
import ExpensesTable from "../ExpenseTable/ExpenseTable";
import "./Dashboard.css";
import LineBarChart from "../LineBarChart/LineBarChart";

function Dashboard() {
  const [walletBalance, setWalletBalance] = useState(() => {
    const storedBalance = localStorage.getItem("walletBalance");
    return storedBalance ? JSON.parse(storedBalance) : 5000;
  });

  const [expenses, setExpenses] = useState(() => {
    const storedExpenses = localStorage.getItem("expenses");
    return storedExpenses ? JSON.parse(storedExpenses) : [];
  });

  const [incomeInput, setIncomeInput] = useState("");

  useEffect(() => {
    localStorage.setItem("walletBalance", JSON.stringify(walletBalance));
  }, [walletBalance]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleExpenseListUpdate = (updatedExpenses) => {
    setExpenses(updatedExpenses);
  };

  const getTotalExpenses = () => {
    return expenses.reduce(
      (total, expense) => total + parseInt(expense.price, 10),
      0
    );
  };

  const handleAddIncome = () => {
    const amount = parseInt(incomeInput);
    if (!isNaN(amount) && amount > 0) {
      setWalletBalance((prev) => prev + amount);
      const newIncome = {
        id: Date.now(),
        category: "Income",
        price: amount,
        date: new Date().toISOString().split("T")[0],
        type: "income"
      };
      setExpenses((prev) => [...prev, newIncome]);
      setIncomeInput("");
    }
  };

  const categories = [
    "Food",
    "Entertainment",
    "Travel",
    "Shopping",
    "Grocery",
    "Others"
  ];

  return (
    <div className="dashboard-container">
      <h1>Expense Tracker</h1>

      <div className="income-input-container">
        <input
          type="number"
          placeholder="Enter income"
          value={incomeInput}
          onChange={(e) => setIncomeInput(e.target.value)}
        />
        <button id="addIncomeBtn" onClick={handleAddIncome}>Add Income</button>
      </div>

      <WalletExpensesComponent
        handleExpenseListUpdate={handleExpenseListUpdate}
        categories={categories}
        expenses={expenses}
        setExpenses={setExpenses}
        getTotalExpenses={getTotalExpenses}
        walletBalance={walletBalance}
        setWalletBalance={setWalletBalance}
      />

      {expenses.length > 0 && (
        <div className="dashboard-info-container">
          <ExpensesTable
            expenseData={expenses}
            handleExpenseListUpdate={handleExpenseListUpdate}
            categories={categories}
          />
          <LineBarChart data={expenses} categories={categories} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
