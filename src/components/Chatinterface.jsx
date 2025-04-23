

import React, { useState } from "react";
import axios from "axios";
import "./chatinterface.css";
const ChatInterface = ({ setFilteredProducts }) => {
  const [query, setQuery] = useState("");

  const handleSend = async () => {
    if (!query.trim()) return;

    try {
      const res = await axios.post(
        "https://reactkariniserver.onrender.com/api/chat",
        {
          message: query,
        }
      );

      const products = res.data;

      if (Array.isArray(products)) {
        setFilteredProducts(products);
      } else {
        alert(products.message || "No matching products found.");
        setFilteredProducts([]);
      }
    } catch (error) {
      console.error("Error sending chat query:", error);
      alert("Something went wrong while searching.");
    }

    setQuery("");
  };

  return (
    <div className="chat-search">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Try "Find SKU 1234" or "black shoes under 50"'
      />
      <button  className='chat-serchbtn'onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatInterface;
