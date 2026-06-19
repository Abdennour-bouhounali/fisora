import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCurrency } from '../../context/CurrencyContext';

/**
 * A sleek animated toggle button for switching between DA and EUR currencies.
 * Designed to fit inline in the Navbar alongside the language selector.
 */
const CurrencyToggle = () => {
  const { currency, toggleCurrency } = useCurrency();
  const isEUR = currency === 'EUR';

  return (
    <button
      onClick={toggleCurrency}
      title={isEUR ? 'Afficher en DA' : 'Afficher en EUR'}
      className="relative flex items-center gap-1.5 bg-nature-beige/30 hover:bg-nature-beige/60 px-3 py-2 rounded-xl text-sm font-bold text-nature-green transition-all duration-300 overflow-hidden group select-none"
      style={{ minWidth: '72px' }}
    >
      {/* Sliding background pill */}
      <span
        className={`absolute inset-0 rounded-xl transition-all duration-300 ${
          isEUR ? 'bg-nature-orange/10' : 'bg-nature-green/5'
        }`}
      />

      {/* DA label */}
      <span
        className={`relative z-10 transition-all duration-300 ${
          !isEUR ? 'text-nature-green font-black' : 'text-nature-green/40 font-bold'
        }`}
      >
        DA
      </span>

      {/* Toggle track */}
      <span className="relative z-10 w-8 h-4 bg-nature-beige/60 rounded-full flex items-center mx-0.5 flex-shrink-0">
        <motion.span
          layout
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className={`w-3 h-3 rounded-full shadow-sm flex-shrink-0 ${
            isEUR ? 'bg-nature-orange ml-auto mr-0.5' : 'bg-nature-green ml-0.5'
          }`}
        />
      </span>

      {/* EUR label */}
      <span
        className={`relative z-10 transition-all duration-300 ${
          isEUR ? 'text-nature-orange font-black' : 'text-nature-green/40 font-bold'
        }`}
      >
        €
      </span>
    </button>
  );
};

export default CurrencyToggle;
