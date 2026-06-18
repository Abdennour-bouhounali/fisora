import React, { createContext, useContext, useState } from 'react';

const WaitlistContext = createContext();

export const WaitlistProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');

  const openWaitlist = (productName = '') => {
    setSelectedProduct(productName);
    setIsOpen(true);
  };

  const closeWaitlist = () => {
    setIsOpen(false);
  };

  return (
    <WaitlistContext.Provider value={{ isOpen, selectedProduct, openWaitlist, closeWaitlist }}>
      {children}
    </WaitlistContext.Provider>
  );
};

export const useWaitlist = () => useContext(WaitlistContext);
