/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/


import React, { useState } from 'react';
import AccountBalance from './AccountBalance';
import { Link } from 'react-router-dom';
import './Debits.css';

const Debits = ({ debits, accountBalance, addDebit }) => {
  // State for description and amount inputs
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  // Event handler for input field changes
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    if (name === 'description') setDescription(value);
    else if (name === 'amount') setAmount(value);
  };

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date().toISOString().slice(0, 10);
    const debit = { description, amount, date };
    addDebit(debit);
    // Resetting input fields
    setDescription('');
    setAmount('');
  };

  // Render debit history list
  const renderDebits = () => {
    return debits.slice().reverse().map((debit) => (
      <li key={debit.id} className="debit-item">
        <div className="debit-info">
          <div className="debit-amount">{debit.amount}</div>
          <div className="debit-description">{debit.description}</div>
          <div className="debit-date">{debit.date.slice(0, 10)}</div>
        </div>
      </li>
    ));
  };

  return (
    <div>
    {/* NAV BAR */}
    <nav>
      <input type="checkbox" id="check" />
      <label htmlFor="check" className="checkbtn">
        <i className="fas fa-bars"></i>
      </label>
      <label className="logo">bussin</label>
      <ul>
        <li><Link to="/" className="active">Home</Link></li>
        <li><Link to="/userProfile">User Profile</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/credits">Credits</Link></li>
        <li><Link to="/debits">Debits</Link></li>
      </ul>
    </nav>
    {/* END NAV BAR */}
    
    <div className= 'content'>
    <div className="debits">
      <div className="debit-content">
        {/* Left section: Debit History */}
        <div className="debit-content-left">
          <h1>Debit History</h1>
          <ul className="debit-list">{renderDebits()}</ul>
        </div>

        {/* Right section: Account Balance and Add Debit Form */}
        <div className="debit-content-right">
          <h1 className="account-balance">
            <AccountBalance accountBalance={accountBalance} />
          </h1>
          {/* Add Debit Form */}
          <form onSubmit={handleSubmit} className="debit-form">
            <div className="form-row">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                name="description"
                id="description"
                value={description}
                onChange={handleFieldChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-row">
              <label htmlFor="amount" className="form-label">
                Amount
              </label>
              <input
                type="number"
                name="amount"
                id="amount"
                value={amount}
                onChange={handleFieldChange}
                className="form-input"
                required
                min="0.01"
                step="0.01"
              />
            </div>
            <button type="submit" className="form-button">
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  </div>
  );
};

export default Debits;
