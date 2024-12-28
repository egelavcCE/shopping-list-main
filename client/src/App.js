import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HeaderProvider, useHeader } from './context/headerContext.jsx';
import './App.css';
import Header from './components/header.jsx';
import Header1 from './components/header1.jsx';
import Footer from './components/footer';
import View from './components/view';
import Login from './components/login';
import Fov from './components/fov'; // Favoriler sayfası
import Sepetex from './components/sepetex'; // Sepet geçmişi sayfası
import Sepet from './components/sepet.jsx'
import SharedCart from './components/SharedCart';

const App = () => {
  return (
    <HeaderProvider>
      <Router>
        <HeaderConsumer />
        <div>
          <Routes>
            <Route path="/" element={<View />} />
            <Route path="/login" element={<Login />} />
            <Route path="/fov" element={<Fov />} /> {/* Favoriler sayfası */}
            <Route path="/sepetex" element={<Sepetex />} /> {/* Sepet geçmişi sayfası */}
            <Route path="/sepet" element={<Sepet />} /> {/* Sepet sayfası */}
            <Route path="/shared-cart/:shareId" element={<SharedCart />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </HeaderProvider>
  );
};

const HeaderConsumer = () => {
  const { isHeader1 } = useHeader();
  return isHeader1 ? <Header1 /> : <Header />;
};

export default App;
