import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../App.css";

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item["Variant Price"] * item.quantity,
    0
  );

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item._id} className="cart-item">
                {/* <img src={item['Image Src']} alt={item.Title} /> */}
                {item["Image Src"] && (
                  <img src={item["Image Src"]} alt={item.Title} />
                )}

                <div>
                  <h4>{item.Title}</h4>
                  <p>Price: ${item["Variant Price"]}</p>
                  <p>Qty: {item.quantity}</p>
                  <button onClick={() => removeFromCart(item._id)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
        </>
      )}
    </div>
  );
};

export default Cart;
