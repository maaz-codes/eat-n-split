import React, { useState } from "react";

import Button from "./components/Button";
import FriendsList from "./components/FriendsList";
import AddFriend from "./components/AddFriend";
import SplitBill from "./components/SplitBill"; 

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

export default App;
