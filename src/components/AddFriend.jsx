import React, { useState } from "react";
import Button from "./Button";

export default function AddFriend({ onAddfriend }) {

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