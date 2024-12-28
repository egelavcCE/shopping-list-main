import React, { useState , useEffect} from 'react';
import '../styles/card.css';

const Card = ({ product, onAddToCart, onToggleFavorite, isFavorite, isInCart }) => {
  const productName = product['Ürün Adı'] || 'Bilinmeyen Ürün';
  const productImage = product['Resim URL'] || 'https://via.placeholder.com/150';

  return (
    <div className="card">
      <div className="image-container">
        <img src={productImage} alt={productName} className="product-image" />
      </div>
      <h3>{productName}</h3>
      <div className="card-buttons">
        <button onClick={() => onToggleFavorite(product)}>
          {isFavorite ? '❌ Favorilerden Çıkar' : '❤️ Favorilere Ekle'}
        </button>
        <button onClick={() => onAddToCart(product)}>
          {isInCart ? '❌ Sepetten Çıkar' : '🛒 Sepete Ekle'}
        </button>
      </div>
    </div>
  );
};

export default Card;
