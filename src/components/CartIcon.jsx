import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import '../App.css'

const CartIcon = ({ onClick }) => {
  const { cartItems } = useContext(CartContext);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="cart-icon" onClick={onClick}>
      🛒 {itemCount}
    </div>
  );
};

export default CartIcon;
