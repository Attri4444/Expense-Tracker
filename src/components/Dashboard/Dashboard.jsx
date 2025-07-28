import React, { useEffect, useState } from "react";
import WalletExpensesComponent from "../WalletExpenses/WalletExpensesComponent";
import TableWithPagination from "../ExpenseTable/ExpenseTable";
import "./Dashboard.css";

function Dashboard() {
  const [walletBalance, setWalletBalance] = useState(() => {
    const storedBalance = localStorage.getItem("walletBalance");
    return storedBalance ? parseInt(storedBalance) : 0;
  });

  const [expenses, setExpenses] = useState(() => {
    const storedExpenses = localStorage.getItem("expenseList");
    return storedExpenses ? JSON.parse(storedExpenses) : [];
  });

  useEffect(() => {
    localStorage.setItem("walletBalance", walletBalance.toString());
  }, [walletBalance]);

  useEffect(() => {
    localStorage.setItem("expenseList", JSON.stringify(expenses));
  }, [expenses]);

  const categories = [
    "Food",
    "Travel",
    "Entertainment",
    "Shopping",
    "Grocery",
    "Others",
  ];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Expense Tracker</h1>

      {/* Wallet and Expense Summary */}
      <WalletExpensesComponent
  walletBalance={walletBalance}
  setWalletBalance={setWalletBalance}
  expenses={expenses}
  setExpenses={setExpenses}
/>


      {/* Expense Table */}
      <div className="dashboard-info-container">
        <TableWithPagination
          expenseData={expenses}
          handleExpenseListUpdate={setExpenses}
          categories={categories}
        />
      </div>
    </div>
  );
}

export default Dashboard;
