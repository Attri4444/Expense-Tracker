import React, { useState } from "react";
import "./WalletExpenses.css";

const WalletExpensesComponent = ({
  handleExpenseListUpdate,
  categories,
  expenses,
  setExpenses,
  getTotalExpenses,
  walletBalance,
  setWalletBalance
}) => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    date: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddExpense = () => {
    const { title, price, category, date } = formData;
    const priceValue = parseInt(price);

    if (!title || !price || !category || !date || isNaN(priceValue)) return;

    const newExpense = {
      id: Date.now(),
      title,
      price: priceValue,
      category,
      date,
      type: "expense"
    };

    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    handleExpenseListUpdate(updatedExpenses);

    setWalletBalance((prev) => prev - priceValue);
    setFormData({ title: "", price: "", category: "", date: "" });
  };

  return (
    <div className="wallet-container">
      <div className="wallet-card">
        <h2>Wallet Balance</h2>
        <div className="wallet-amount" id="walletBalance">
          ₹{walletBalance.toLocaleString()}
        </div>
      </div>

      <div className="expense-card">
        <h2>Add Expense</h2>
        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />
        <input
          name="price"
          placeholder="Price"
          type="number"
          value={formData.price}
          onChange={handleChange}
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          name="date"
          placeholder="Date"
          type="date"
          value={formData.date}
          onChange={handleChange}
        />
        <button id="addExpenseBtn" onClick={handleAddExpense}>
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default WalletExpensesComponent;
