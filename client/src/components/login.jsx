import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useHeader } from '../context/headerContext';
import { registerUser, loginUser } from '../services/api';
import { FaGoogle } from 'react-icons/fa'; // Google ikonu
import '../styles/login.css';

const LoginModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('login');
  const { setIsHeader1 } = useHeader();
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setMessage('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData.name, formData.surname, formData.email, formData.password);
      setMessage('Kayıt başarılı! Giriş yapabilirsiniz.');
      setFormData({ name: '', surname: '', email: '', password: '' });
      setActiveTab('login');
    } catch (error) {
      setMessage(error.message || 'Kayıt işlemi sırasında bir hata oluştu.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData.email, formData.password);
      setMessage(response.message);
      setIsHeader1(true);
      onClose();
    } catch (error) {
      setMessage(error.message || 'Giriş işlemi sırasında bir hata oluştu.');
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google ile giriş yapıldı');
    // Burada Google ile giriş yapma işlemini yönetin.
  };

  return (
    <div className={`modal-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <motion.div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <div className="modal-header">
          <button
            className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => handleTabChange('login')}
          >
            Login
          </button>
          <button
            className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => handleTabChange('register')}
          >
            Register
          </button>
        </div>

        <div className="modal-content">
          {message && <div className="message">{message}</div>}
          {activeTab === 'login' ? (
            <form className="form-content" onSubmit={handleLogin}>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <label>Email</label>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <label>Password</label>
              </div>
              <button type="submit" className="primary-btn">
                Login
              </button>
              <button type="button" className="google-login-btn" onClick={handleGoogleLogin}>
                <FaGoogle size={24} /> {/* Using react-icons for Google icon */}
                Google ile Giriş Yap
              </button>
              <p className="switch-link">
                Henüz hesabınız yok mu?{' '}
                <span onClick={() => handleTabChange('register')}>Hemen Kaydol</span>
              </p>
            </form>
          ) : (
            <form className="form-content" onSubmit={handleRegister}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <label>Name</label>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleInputChange}
                  required
                />
                <label>Surname</label>
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <label>Email</label>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}be
                  required
                />
                <label>Password</label>
              </div>
              <button type="submit" className="primary-btn">
                Register
              </button>
              <button type="button" className="google-login-btn" onClick={handleGoogleLogin}>
                <FaGoogle size={24} /> {/* Using react-icons for Google icon */}
                Google ile Kayıt Ol
              </button>
              <p className="switch-link">
                Zaten bir hesabınız var mı?{' '}
                <span onClick={() => handleTabChange('login')}>Giriş Yap</span>
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default LoginModal;
