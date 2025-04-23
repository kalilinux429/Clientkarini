import React from 'react';
import '../App.css'


const SearchBar = ({ setSearchTerm }) => {
  return (
    <input
      type="text"
      placeholder="Search by title or SKU..."
      onChange={(e) => setSearchTerm(e.target.value)}
      className="search-bar"
    />
  );
};

export default SearchBar;
