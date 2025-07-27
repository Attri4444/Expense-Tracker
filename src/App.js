import React, { useState, useEffect } from "react";
import "./App.css";

const getStoredTransactions = () => {
  const data = localStorage.getItem("transactions");
  return data ? JSON.parse(data) : [];
};

function App() {
  const [transactions, setTransactions] = useState(getStoredTransactions());
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("general");

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = () => {
    if (!amount) return;
    const newTransaction = {
      id: Date.now(),
      amount: Number(amount),
      type,
      category,
    };
    setTransactions([newTransaction, ...transactions]);
    setAmount("");
  };

  return (
    <div className="App">
      <h1>Expense Tracker</h1>

      <div>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="general">General</option>
          <option value="food">Food</option>
          <option value="travel">Travel</option>
          <option value="entertainment">Entertainment</option>
        </select>

        <button onClick={addTransaction} id="addIncomeBtn">
          Add Transaction
        </button>
      </div>

      <div>
        <h2>Transactions</h2>
        <ul>
          {transactions.map((t) => (
            <li key={t.id}>
              ₹{t.amount} - {t.type} - {t.category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
