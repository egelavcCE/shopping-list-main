import React, { useState } from 'react';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import amblem from '../assets/logo.png';
import LoginModal from './login'; // LoginModal'ı import ettik
import '../styles/header.css';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLoginClick = () => {
    setIsLoginModalOpen(true); // Modal'ı açıyoruz
  };

  const handleCloseModal = () => {
    setIsLoginModalOpen(false); // Modal'ı kapatıyoruz
  };

  const handleCartClick = () => {
    console.log('Market arabası butonuna tıklandı');
  };

  return (
    <>
      <header className="header-container">
        <div className="logo-container">
          <img src={amblem} alt="Logo" className="logo" />
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Aramak istediğiniz terimi giriniz"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <FaSearch className="search-icon" />
        </div>
        <div className="actions-container">
          <button className="login-btn" onClick={handleLoginClick}>
            Giriş Yap/Üye Ol
          </button>
        </div>
      </header>

      {/* Modal'ı burada render ediyoruz */}
      {isLoginModalOpen && (
        <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default Header;
