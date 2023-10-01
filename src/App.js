import React, { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
 

function App() {

  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [showAddFriend, setShowAddFriend] = useState(false);
  
  function toggleAddFriend() {
    setShowAddFriend(show => !show);
  }

  function onAddfriend(newFriend) {
    setFriends(prevFriends => (
      [...prevFriends, newFriend]
    ))
  }

  function handleSelection(friend) {
    setSelectedFriend(prevFriend => (
      prevFriend?.id === friend.id ? null : friend
    ));
    setShowAddFriend(false);
  } 

  function handleSplitBill(value) {
    setFriends(friends => (
      friends.map(friend => (
        friend.id === selectedFriend.id ? {...friend, balance: friend.balance + value} : friend
      ))
    ));

    setSelectedFriend(null);
  }


  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList 
          friends={friends} 
          onSelection={handleSelection} 
          selectedFriend={selectedFriend} 
        />

        {showAddFriend && <AddFriend onAddfriend={onAddfriend} />}

        <Button onClick={toggleAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>  
      </div>

      {selectedFriend && <SplitBill selectedFriend={selectedFriend} onSplitBill={handleSplitBill} />}
      
    </div>
  );
}

function Button({ onClick, children }) {
  return (
    <button className="button" onClick={onClick}>{children}</button>
  );
}

function FriendsList({ friends, onSelection, selectedFriend }) {

  return ( 
    <>
        <ul>
          {
            friends.map(friend => (
              <FriendCard 
                friend={friend} 
                key={friend.id} 
                onSelection={onSelection} 
                selectedFriend={selectedFriend}
              />
              )
            )
          }
        </ul>  
    </>
  );
}

function FriendCard({ friend, onSelection, selectedFriend }) {

  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li className={isSelected ? 'selected' : ""}>
      <div>
        <img src={friend.image} alt="friend-avatar" />
      </div>
      <div>
        <h3>{friend.name}</h3>
        {
          friend.balance === 0 ? (
            <p>You and {friend.name} are even</p>
          ) : ( friend.balance > 0 ? (
              <p className="green">{friend.name} owes you ${friend.balance}</p>
            ) : (
              <p className="red">You owe {friend.name} ${Math.abs(friend.balance)}</p>
            ) )  
        } 
      </div>
      <div>
        <Button onClick={() => onSelection(friend)}>
          {isSelected ? 'Close' : "Selected" }
        </Button>
      </div>
    </li>
  );
}

function AddFriend({ onAddfriend }) {

  const [name, setName] = useState("");
  const [imgURL, setImgURL] = useState("https://i.pravatar.cc/48");

  

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !imgURL) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${imgURL}?=${id}`,
      balance: 0,
    };

    onAddfriend(newFriend);

    setName('');
    setImgURL("https://i.pravatar.cc/48");
  }

  return (
    <div>
      <form className="form-add-friend" 
        onSubmit={handleSubmit} >
        <label>👫 Friend name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>🌄 Image URL</label>
        <input type="text" value={imgURL} onChange={(e) => setImgURL(e.target.value)} />

        <Button>Add</Button>
      </form>
    </div>
  );
}

function SplitBill({ selectedFriend, onSplitBill }) {

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

export default App;
