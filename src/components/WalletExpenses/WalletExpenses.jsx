import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./WalletExpenses.css";
import RoundChart from "../RoundChart/RoundChart";
import { v4 as uuidv4 } from "uuid";

// Ensure the modal is bound to your appElement for accessibility reasons
Modal.setAppElement("#root");

const WalletExpensesComponent = ({
  handleExpenseListUpdate,
  categories,
  expenses,
  setExpenses,
  getTotalExpenses,
  walletBalance,
  setWalletBalance,
}) => {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({
    id: null,
    title: "",
    price: "",
    category: "",
    date: "",
  });
  const [newIncome, setNewIncome] = useState("");

  const handleInputChange = (e, isExpense = true) => {
    const { name, value } = e.target;
    if (isExpense) {
      setNewExpense((prevState) => ({ ...prevState, [name]: value }));
    } else {
      setNewIncome(value);
    }
  };

  const addExpense = (e) => {
    e.preventDefault();
    const price = parseInt(newExpense.price, 10);
    if (walletBalance < price) {
      return alert("Couldn't add expense, insufficient wallet balance.");
    }
    const expenseWithId = { ...newExpense, id: uuidv4(), price };

    const updatedBalance = walletBalance - price;
    setWalletBalance(updatedBalance);
    localStorage.setItem("walletBalance", JSON.stringify(updatedBalance));
    localStorage.setItem("expenses", JSON.stringify([...expenses, expenseWithId]));

    setExpenses((prevExpenses) => [...prevExpenses, expenseWithId]);
    setIsExpenseModalOpen(false);
    setNewExpense({
      id: null,
      title: "",
      price: "",
      category: "",
      date: "",
    }); // Reset form
  };

  const addIncome = (e) => {
    e.preventDefault();
    if (!isNaN(newIncome) && newIncome.trim() !== "") {
      const incomeAmount = parseInt(newIncome, 10);
      const updatedBalance = walletBalance + incomeAmount;
      setWalletBalance(updatedBalance);
      localStorage.setItem("walletBalance", JSON.stringify(updatedBalance));
      setIsIncomeModalOpen(false);
      setNewIncome(""); // Reset form
    }
  };

  useEffect(() => {
    handleExpenseListUpdate(expenses);
  }, [expenses]);

  // By default add walletBalance as 5000
  useEffect(() => {
    if (!localStorage.getItem("walletBalance")) {
      localStorage.setItem("walletBalance", JSON.stringify(5000));
    }
  }, []);

  const modalStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "80%",
      maxWidth: "500px",
      background: "rgba(255, 255, 255, 0.6)",
      borderRadius: "10px",
      border: "1px solid rgba(255, 255, 255, 0.18)",
      boxShadow: "0 8px 12px rgba(0, 0, 0, 0.1)",
      backdropFilter: "blur(10px)",
    },
  };

  return (
    <div className="wallet-container glassmorphism">
      <div className="wallet-income-expense-container">
        <div className="wallet-card-container glassmorphism">
          <h2>
            Wallet Balance:
            <span className="income-amount"> ₹{walletBalance} </span>
          </h2>
          <button
            className="glassmorphism z-10 relative"
            onClick={() => setIsIncomeModalOpen(true)}
          >
            + Add Income
          </button>
        </div>
        <div className="wallet-card-container glassmorphism">
          <h2>
            Expenses:
            <span className="expense-amount"> ₹{getTotalExpenses()} </span>
          </h2>
          <button
            className="glassmorphism z-10 relative"
            onClick={() => setIsExpenseModalOpen(true)}
          >
            + Add Expense
          </button>
        </div>
      </div>
      <RoundChart data={expenses} />

      {/* Modal for adding income */}
      <Modal
        isOpen={isIncomeModalOpen}
        onRequestClose={() => setIsIncomeModalOpen(false)}
        style={modalStyle}
        contentLabel="Add New Income"
      >
        <h2 className="modal-header">Add New Income</h2>
        <form className="modal-form-income" onSubmit={addIncome}>
          <input
            className="glassmorphismButton"
            name="income"
            placeholder="Income Amount"
            type="number"
            value={newIncome}
            onChange={(e) => handleInputChange(e, false)}
            required
          />
          <div>
            <button className="glassmorphismButton" type="submit">
              Add Income
            </button>
            <button
              className="glassmorphismButton"
              type="button"
              onClick={() => setIsIncomeModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal for adding expenses */}
      <Modal
        isOpen={isExpenseModalOpen}
        onRequestClose={() => setIsExpenseModalOpen(false)}
        style={modalStyle}
        contentLabel="Add New Expense"
      >
        <h2 className="modal-header">Add New Expense</h2>
        <form className="modal-form-expense" onSubmit={addExpense}>
          <input
            name="title"
            placeholder="Title"
            value={newExpense.title}
            onChange={handleInputChange}
            required
          />
          <input
            name="price"
            placeholder="Price"
            type="number"
            value={newExpense.price}
            onChange={handleInputChange}
            required
          />
          <select
            className="select-option"
            name="category"
            value={newExpense.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input
            name="date"
            placeholder="Date"
            type="date"
            value={newExpense.date}
            onChange={handleInputChange}
            required
          />
          <div>
            <button className="glassmorphismButton" type="submit">
              Add Expense
            </button>
            <button
              className="glassmorphismButton"
              type="button"
              onClick={() => setIsExpenseModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default WalletExpensesComponent;
