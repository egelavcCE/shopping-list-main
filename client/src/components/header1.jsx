import React, { useState } from 'react';
import { FaSearch, FaUserCircle, FaShoppingCart } from 'react-icons/fa';
import amblem from '../assets/logo.png';
import '../styles/header1.css';
import { useHeader } from '../context/headerContext'; // HeaderContext'ten erişim
import { useNavigate } from 'react-router-dom'; // Sayfa yönlendirmeleri için kullanılıyor

const Header1 = () => {
  const [showDropdown, setShowDropdown] = useState(false); // Dropdown menü kontrolü
  const [showModal, setShowModal] = useState(false); // Modal kontrolü
  const { toggleHeader } = useHeader(); // Header durumu değiştirmek için fonksiyon
  const navigate = useNavigate(); // sayfa yönlendirmeleri için

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  

  const handleNavigate = (path) => {
    navigate(path); // Sayfa yönlendirmesi yapılacak
    setShowDropdown(false); // Menü kapansın
  };

  const handleLogout = () => {
    // Favoriler ve sepeti sıfırla
    localStorage.removeItem('favorites');
    localStorage.removeItem('cart');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    console.log('Favoriler ve sepet sıfırlandı.');
  
    // Header1'i devre dışı bırak, ana header'a geçiş yap
    toggleHeader(false);
  
    // Sayfa state'lerini sıfırlamak için yeniden yönlendirme yap
    navigate('/', { state: { reset: true } }); // 'reset' bayrağı gönder
    console.log('Çıkış yapıldı ve View sayfasına yönlendirildi.');
 
  };
  

  const handlePasswordChange = () => {
    setShowModal(true); // Modal açılacak
  };

  return (
    <header className="header-container">
      <div className="logo-container">
        <img src={amblem} alt="Logo" className="logo" />
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Aramak istediğiniz terimi giriniz"
          className="search-input"
        />
        <FaSearch className="search-icon" />
      </div>
      <div className="actions-container">
        <div className="account-dropdown">
          <button className="account-btn" onClick={toggleDropdown}>
            <FaUserCircle className="account-icon" />
          </button>
          {showDropdown && (
            <div className="dropdown-menu">
              <button className="dropdown-item" onClick={() => handleNavigate('/fov')}>Favoriler</button>
              <button className="dropdown-item" onClick={() => handleNavigate('/sepetex')}>Sepet Geçmişi</button>
              <button className="dropdown-item" onClick={handlePasswordChange}>Şifre Değiştir</button>
              <button className="dropdown-item logout-btn" onClick={handleLogout}>Çıkış Yap</button>
            </div>
          )}
        </div>
        <button className="cart-btn" onClick={() => handleNavigate('/sepet')}>
          <FaShoppingCart />
        </button>
      </div>

      {/* Şifre Değiştir Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Şifre Değiştir</h2>
            <label>Eski Şifre:</label>
            <input type="password" placeholder="Eski şifre" />
            <label>Yeni Şifre:</label>
            <input type="password" placeholder="Yeni şifre" />
            <button onClick={() => setShowModal(false)}>Kapat</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header1;
