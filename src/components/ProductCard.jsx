import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-card">
      {/* <img src={product['Image Src']} alt={product.Title} /> */}
      {product['Image Src'] && <img src={product['Image Src']} alt={product.Title} />}

      <div className="product-card-content">
        <h3>{product.Title}</h3>
        <p>SKU: {product['Variant SKU']}</p>
        <p className="price">${product['Variant Price']}</p>
        <button onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
