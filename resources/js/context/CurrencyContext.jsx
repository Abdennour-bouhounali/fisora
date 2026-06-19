import React, { createContext, useContext, useState, useCallback } from 'react';

/**
 * Exchange rate: 1 EUR = ~145 DA (approximate mid-market rate)
 * You can update this constant or fetch it dynamically in the future.
 */
export const EUR_TO_DA = 145;

const CurrencyContext = createContext();

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('fisora_currency') || 'DA';
  });

  const toggleCurrency = useCallback(() => {
    setCurrency((prev) => {
      const next = prev === 'DA' ? 'EUR' : 'DA';
      localStorage.setItem('fisora_currency', next);
      return next;
    });
  }, []);

  /**
   * Format a price value (always stored in DA) to the current display currency.
   * @param {number} amountDA - amount in Algerian Dinar
   * @returns {string} formatted price string
   */
  const formatPrice = useCallback(
    (amountDA) => {
      const value = Number(amountDA) || 0;

      if (currency === 'EUR') {
        const eur = value / EUR_TO_DA;
        return new Intl.NumberFormat('fr-FR', {
          style: 'currency',
          currency: 'EUR',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(eur);
      }

      // Default: DA
      return (
        new Intl.NumberFormat('fr-DZ', {
          style: 'decimal',
          minimumFractionDigits: 0,
        }).format(value) + ' DA'
      );
    },
    [currency]
  );

  return (
    <CurrencyContext.Provider value={{ currency, toggleCurrency, formatPrice, EUR_TO_DA }}>
      {children}
    </CurrencyContext.Provider>
  );
};
