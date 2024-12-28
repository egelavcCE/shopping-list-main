import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaTimes } from 'react-icons/fa';
import '../styles/fov.css';

const Fov = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Favori ürünleri ve sepeti yükle
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavoriteProducts(savedFavorites);

    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  // Favorilerden çıkar
  const handleRemoveFromFavorites = (product) => {
    const updatedFavorites = favoriteProducts.filter(
      (item) => item['Ürün Adı'] !== product['Ürün Adı']
    );
    setFavoriteProducts(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  // Sepete ekle
  const handleAddToCart = (product) => {
    const isAlreadyInCart = cart.some((item) => item['Ürün Adı'] === product['Ürün Adı']);

    if (isAlreadyInCart) {
      alert(`${product['Ürün Adı']} zaten sepette.`);
    } else {
      const updatedCart = [...cart, product];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      alert(`${product['Ürün Adı']} sepete eklendi.`);
    }
  };

  return (
    <div className="fov-container">
      <h1>Favoriler</h1>
      <div className="favorite-list">
        {favoriteProducts.map((product, index) => (
          <div key={index} className="favorite-item">
            <img src={product['Resim URL']} alt={product['Ürün Adı']} className="favorite-image" />
            <h3>{product['Ürün Adı']}</h3>
            <button onClick={() => handleRemoveFromFavorites(product)}>
              <FaTimes /> Favorilerden Çıkar
            </button>
            <button onClick={() => handleAddToCart(product)}>
              <FaShoppingCart /> Sepete Ekle
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fov;
