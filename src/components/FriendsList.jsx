import React from "react";
import FriendCard from "./FriendCard";

export default function FriendsList({ friends, onSelection, selectedFriend }) {

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