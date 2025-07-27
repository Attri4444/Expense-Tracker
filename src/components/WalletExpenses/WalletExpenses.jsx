// src/components/WalletExpenses/WalletExpenses.jsx
import React, { useEffect, useState } from "react";
import "./WalletExpenses.css";

const WalletExpenses = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [transactions, setTransactions] = useState([]);

  // Load data from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("transactions"));
    if (saved) setTransactions(saved);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = () => {
    if (!amount || !category) return;

    const newTransaction = {
      id: Date.now(),
      amount: parseFloat(amount),
      category,
    };

    setTransactions([newTransaction, ...transactions]);
    setAmount("");
    setCategory("");
  };

  const getTotalBalance = () => {
    return transactions.reduce((acc, txn) => acc + txn.amount, 0);
  };

  return (
    <div className="wallet-container">
      <h2>Wallet Balance</h2>
      <h3 data-testid="wallet-balance">₹ {getTotalBalance()}</h3>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        id="amountInput"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        data-testid="categorySelect"
      >
        <option value="">Select category</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Income">Income</option>
      </select>

      <button onClick={addTransaction} id="addIncomeBtn">
        Add Transaction
      </button>

      <h3>Transactions:</h3>
      <ul data-testid="transactionList">
        {transactions.map((txn) => (
          <li key={txn.id}>
            ₹{txn.amount} - {txn.category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WalletExpenses;
