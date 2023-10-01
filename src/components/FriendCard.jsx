import React from "react";
import Button from "./Button";

export default function FriendCard({ friend, onSelection, selectedFriend }) {

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