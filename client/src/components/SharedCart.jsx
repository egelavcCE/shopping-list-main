import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/sepet.css';

const SharedCart = () => {
  const { shareId } = useParams();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSharedCart = async () => {
      try {
        const API_URL = 'http://localhost:5000/api';
        const response = await axios.get(`${API_URL}/cart/shared/${shareId}`);
        if (response.data.success) {
          setCartItems(response.data.cart.items);
        } else {
          setError('Sepet bulunamadı');
        }
      } catch (error) {
        setError(error.response?.data?.message || 'Sepet yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchSharedCart();
  }, [shareId]);

  if (loading) {
    return <div className="loading">Sepet yükleniyor...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="sepet-container">
      <h1>Paylaşılan Sepet</h1>
      {cartItems.length > 0 ? (
        <div className="cart-list">
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img
                src={item.imageUrl}
                alt={item.productName}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3>{item.productName}</h3>
                <p>Miktar: {item.quantity}</p>
                {item.note && (
                  <div className="item-note">
                    <p>Not: {item.note}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Bu sepette ürün bulunmamaktadır.</p>
      )}
    </div>
  );
};

export default SharedCart; 