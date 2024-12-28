import React, { useState, useEffect } from 'react';
import { FaTimes, FaWhatsapp, FaShare } from 'react-icons/fa';
import axios from 'axios';
import '../styles/sepet.css';

const Sepet = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartLink, setCartLink] = useState('');
  const [isSharing, setIsSharing] = useState(false);
  const [shareError, setShareError] = useState('');

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart.map(item => ({ ...item, Adet: item.Adet || 1 })));
  }, []);

  const handleSaveCart = async () => {
    try {
      setIsSharing(true);
      setShareError('');

      const userId = localStorage.getItem('userId');
      if (!userId) {
        setShareError('Paylaşım için giriş yapmanız gerekiyor');
        return;
      }

      const API_URL = 'http://localhost:5000/api';
      const response = await axios.post(`${API_URL}/cart/share`, {
        userId,
        items: cartItems.map(item => ({
          productName: item['Ürün Adı'],
          quantity: item.Adet,
          imageUrl: item['Resim URL'],
          note: item.note || ''
        }))
      });

      if (response.data.success) {
        const baseUrl = window.location.origin;
        const shareUrl = `${baseUrl}/shared-cart/${response.data.shareId}`;
        setCartLink(shareUrl);
      } else {
        setShareError('Paylaşım sırasında bir hata oluştu');
      }
    } catch (error) {
      console.error('Paylaşım hatası:', error);
      setShareError('Paylaşım sırasında bir hata oluştu');
    } finally {
      setIsSharing(false);
    }
  };

  const handleQuantityChange = (index, change) => {
    const updatedItems = [...cartItems];
    const newQuantity = (updatedItems[index].Adet || 1) + change;
    
    if (newQuantity > 0) {
      updatedItems[index].Adet = newQuantity;
      setCartItems(updatedItems);
      localStorage.setItem('cart', JSON.stringify(updatedItems));
    }
  };

  const handleRemoveItem = (index) => {
    const updatedItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const handleNoteChange = (index, note) => {
    const updatedItems = [...cartItems];
    updatedItems[index].note = note;
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  return (
    <div className="sepet-container">
      <h1>Sepetiniz</h1>
      {cartItems.length > 0 ? (
        <div className="cart-list">
          {cartItems.map((product, index) => (
            <div key={index} className="cart-item">
              <img
                src={product['Resim URL']}
                alt={product['Ürün Adı']}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3>{product['Ürün Adı']}</h3>
                <div className="quantity-controls">
                  <button
                    className="quantity-button"
                    onClick={() => handleQuantityChange(index, -1)}
                  >
                    -
                  </button>
                  <span className="quantity-display">{product.Adet || 1}</span>
                  <button
                    className="quantity-button"
                    onClick={() => handleQuantityChange(index, 1)}
                  >
                    +
                  </button>
                </div>
                <textarea
                  className="note-input"
                  placeholder="Not ekleyin..."
                  value={product.note || ''}
                  onChange={(e) => handleNoteChange(index, e.target.value)}
                />
              </div>
              <button
                className="remove-button"
                onClick={() => handleRemoveItem(index)}
              >
                <FaTimes />
              </button>
            </div>
          ))}
          
          <div className="share-container">
            <button
              className="share-button"
              onClick={handleSaveCart}
              disabled={isSharing}
            >
              <FaShare /> {isSharing ? 'Paylaşılıyor...' : 'Sepeti Paylaş'}
            </button>
          </div>

          {shareError && (
            <div className="error-message">
              {shareError}
            </div>
          )}

          {cartLink && (
            <div className="cart-link-container">
              <p>
                Paylaşım Linki:{' '}
                <a href={cartLink} target="_blank" rel="noopener noreferrer">
                  {cartLink}
                </a>
              </p>
              <div className="share-buttons">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(cartLink)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-share"
                >
                  <FaWhatsapp /> WhatsApp ile Paylaş
                </a>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>Sepetinizde ürün bulunmamaktadır.</p>
      )}
    </div>
  );
};

export default Sepet;
