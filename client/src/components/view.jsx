import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // useLocation eklendi
import Card from './Card';
import productsData from '../data/data.json'; // JSON dosyasını import ediyoruz
import LoginModal from './login'; // Login modali
import { useHeader } from '../context/headerContext'; // HeaderContext'i kullanıyoruz
import '../styles/view.css'; // Modal ve stil düzenlemeleri için

const View = () => {
  const { isHeader1 } = useHeader(); // Kullanıcı giriş durumu
  const [products, setProducts] = useState([]); // Ürün verileri
  const [currentPage, setCurrentPage] = useState(1); // Şu anki sayfa
  const itemsPerPage = 50; // Sayfa başına ürün sayısı
  const [showAlert, setShowAlert] = useState(false); // Giriş yapınız modal kontrolü
  const [showLoginModal, setShowLoginModal] = useState(false); // Login modal kontrolü
  const [favorites, setFavorites] = useState([]); // Favorilere eklenen ürünler
  const [cart, setCart] = useState([]); // Sepete eklenen ürünler
  const location = useLocation(); // Yönlendirme parametrelerini kontrol etmek için

  // JSON verilerini yükleme
  useEffect(() => {
    setProducts(productsData);

    // Local storage'dan favorileri yükle
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);

    // Local storage'dan sepeti yükle
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  // Kullanıcı çıkış yaptıysa state'leri sıfırla
  useEffect(() => {
    if (location.state?.reset) {
      setCurrentPage(1);
      setFavorites([]);
      setCart([]);
      localStorage.removeItem('favorites');
      localStorage.removeItem('cart');
      console.log('Sayfa sıfırlandı.');
    }
  }, [location.state]);

  // Mevcut sayfanın ürünlerini filtrele
  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage * itemsPerPage < products.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleUnauthorizedAction = () => {
    setShowAlert(true); // Giriş yapınız modalını aç
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    setShowLoginModal(true); // Login modalını aç
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleActionWithAuth = (action) => {
    if (isHeader1) {
      action(); // Yetkili işlem yapılır
    } else {
      handleUnauthorizedAction(); // Giriş yap uyarısı gösterilir
    }
  };

  // Favorilere ürün ekle veya çıkar
  const toggleFavorite = (product) => {
    handleActionWithAuth(() => {
      setFavorites((prevFavorites) => {
        let updatedFavorites;
        if (prevFavorites.some((fav) => fav['Ürün Adı'] === product['Ürün Adı'])) {
          updatedFavorites = prevFavorites.filter((fav) => fav['Ürün Adı'] !== product['Ürün Adı']);
        } else {
          updatedFavorites = [...prevFavorites, product];
        }
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Favorileri localStorage'a kaydet
        return updatedFavorites;
      });
    });
  };

  // Sepete ürün ekle veya çıkar
  const toggleCart = (product) => {
    handleActionWithAuth(() => {
      setCart((prevCart) => {
        let updatedCart;
        if (prevCart.some((item) => item['Ürün Adı'] === product['Ürün Adı'])) {
          updatedCart = prevCart.filter((item) => item['Ürün Adı'] !== product['Ürün Adı']);
        } else {
          updatedCart = [...prevCart, product];
        }
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Sepeti localStorage'a kaydet
        return updatedCart;
      });
    });
  };

  return (
    <div className="view-container">
      <div className="product-grid">
        {currentProducts.map((product, index) => {
          const isFavorite = favorites.some((fav) => fav['Ürün Adı'] === product['Ürün Adı']);
          const isInCart = cart.some((item) => item['Ürün Adı'] === product['Ürün Adı']);
          return (
            <Card
              key={index}
              product={product}
              onAddToCart={() => toggleCart(product)}
              onToggleFavorite={() => toggleFavorite(product)}
              isFavorite={isFavorite}
              isInCart={isInCart}
            />
          );
        })}
      </div>

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          ◀️ Geri
        </button>
        <span>Sayfa {currentPage}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage * itemsPerPage >= products.length}
        >
          İleri ▶️
        </button>
      </div>

      {/* Giriş yapınız modalı */}
      {showAlert && (
        <div className="alert-modal">
          <div className="alert-content">
            <p>Lütfen önce giriş yapınız.</p>
            <button onClick={handleCloseAlert}>Kapat</button>
          </div>
        </div>
      )}

      {/* Login modal */}
      {showLoginModal && <LoginModal isOpen={showLoginModal} onClose={handleCloseLoginModal} />}
    </div>
  );
};

export default View;
