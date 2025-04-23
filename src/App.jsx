


import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import ProductCard from './components/ProductCard';
import CartIcon from './components/CartIcon';
import Cart from './components/Cart';
import SearchBar from './components/SearchBar';
import ChatInterface from './components/Chatinterface';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCart, setShowCart] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 15;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://reactkariniserver.onrender.com/api/products');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data); // Initialize with full list
      } catch (error) {
        console.error(`Error fetching data:`, error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const results = products.filter(product =>
      (product?.Title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product?.['Variant SKU'] || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
    setCurrentPage(1); // Reset to first page on search
  }, [searchTerm, products]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  return (
    <CartProvider>
      <div className="app">
        <h2>Fashion Hub</h2>
        
        <div className="search-nav">
          <SearchBar setSearchTerm={setSearchTerm} />
          <ChatInterface setFilteredProducts={setFilteredProducts} />
        </div>

        <CartIcon onClick={() => setShowCart(!showCart)} />
        {showCart && <Cart />}

        <div className="product-list">
          {currentProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {filteredProducts.length > 0 && (
  <div className="pagination-controls">
    <button onClick={handlePrev} disabled={currentPage === 1}>Prev</button>
    <span> Page {currentPage} of {totalPages} </span>
    <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
  </div>
)}
      </div>
    </CartProvider>
  );
};

export default App;
