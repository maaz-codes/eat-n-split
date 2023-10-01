import React, { useState } from "react";
import Button from "./Button";

export default function SplitBill({ selectedFriend, onSplitBill }) {

    const [billValue, setBillValue] = useState(0);
    const [yourExpense, setYourExpense] = useState(0);
    const friendExpense = billValue ? billValue - yourExpense : 0;
    const [whoIsPaying, setWhoIsPaying] = useState("You");
  
    function handleSubmit(e) {
      e.preventDefault();
  
      if(!billValue || !yourExpense) return;
  
      onSplitBill(whoIsPaying === "You" ? friendExpense : -yourExpense);
    }
  
    return (
      <div >
      <form className="form-split-bill" onSubmit={handleSubmit}>
        <h2>SPLIT A BILL WITH {selectedFriend.name}</h2>
  
        <label>💰 Bill value</label>
        <input 
          type="text" 
          value={billValue} 
          onChange={e => setBillValue(Number(e.target.value))} />
  
        <label>🧍‍♀️ Your expense</label>
        <input 
          type="text" 
          value={yourExpense} 
          onChange={e => setYourExpense(
            Number(e.target.value) > billValue ? yourExpense : Number(e.target.value))} />
  
        <label>👫 {selectedFriend.name}'s expense</label>
        <input type="text" disabled  value={friendExpense} />
  
        <label>🤑 Who is paying the bill</label>
        <select value={whoIsPaying} onChange={e => setWhoIsPaying(e.target.value)}>
          <option value="You">You</option>
          <option value={selectedFriend}>{selectedFriend.name}</option>
        </select>
        <Button>Split Bill</Button>
      </form>
      </div>
    );
  }