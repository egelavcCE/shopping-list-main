import React, { createContext, useState, useContext } from 'react';

const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
  const [isHeader1, setIsHeader1] = useState(() => {
    const saved = localStorage.getItem('isHeader1');
    return saved ? JSON.parse(saved) : false;
  });

  const toggleHeader = (value) => {
    setIsHeader1(value);
    localStorage.setItem('isHeader1', JSON.stringify(value));
  };

  return (
    <HeaderContext.Provider value={{ isHeader1, setIsHeader1, toggleHeader }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => useContext(HeaderContext);
