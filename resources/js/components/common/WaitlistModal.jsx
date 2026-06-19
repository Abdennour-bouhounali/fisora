import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { useForm } from '@inertiajs/react';
import { useWaitlist } from '../../context/WaitlistContext';
import Button from './Button';
import Input from './Input';

const mapProductToValue = (name) => {
  if (!name) return 'Garlic Concentrate';
  const lowerName = name.toLowerCase();

  if (lowerName.includes('menthe') || lowerName.includes('mint')) return 'Mint Concentrate';
  if (lowerName.includes('citron') || lowerName.includes('lemon')) return 'Lemon Concentrate';
  if (lowerName.includes('orange')) return 'Orange Concentrate';
  if (lowerName.includes('ail') || lowerName.includes('garlic')) return 'Garlic Concentrate';
  if (lowerName.includes('oignon') || lowerName.includes('onion')) return 'Purple Onion Concentrate';
  if (
    lowerName.includes('mélange') ||
    lowerName.includes('base') ||
    lowerName.includes('mediterranean') ||
    lowerName.includes('متوسط')
  ) return 'Mediterranean Base';

  return 'Garlic Concentrate';
};

const getProductOptions = () => [
  { value: 'Garlic Concentrate', label: 'Garlic / Ail' },
  { value: 'Purple Onion Concentrate', label: 'Purple Onion' },
  { value: 'Mediterranean Base', label: 'Mediterranean Base' },
  { value: 'Mint Concentrate', label: 'Mint / Menthe' },
  { value: 'Lemon Concentrate', label: 'Lemon / Citron' },
  { value: 'Orange Concentrate', label: 'Orange' },
];

const SHEET_DISMISS_THRESHOLD = 120;

const WaitlistModal = () => {
  const { t, i18n } = useTranslation();
  const { isOpen, selectedProduct, closeWaitlist } = useWaitlist();

  const [success, setSuccess] = useState(false);
  const [openProducts, setOpenProducts] = useState(true);

  const isRtl = i18n.language === 'ar';
  const productOptions = getProductOptions();

  const { data, setData, post, processing, errors, reset } = useForm({
    first_name: '',
    last_name: '',

    email: '',
    phone: '',

    street_address: '',
    postal_code: '',

    city: '',
    country: 'France',

    product_interest: [],
    language: i18n.language,
  });

  useEffect(() => {
    if (isOpen) {
      setData({
        name: '',
        email: '',
        phone: '',
        country: 'France',
        city: '',
        product_interest: selectedProduct
          ? [mapProductToValue(selectedProduct)]
          : [],
        language: i18n.language,
      });
      setSuccess(false);
    }
  }, [isOpen, selectedProduct, i18n.language]);

  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => (document.body.style.overflow = original);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/waitlist', {
      onSuccess: () => {
        setSuccess(true);
        reset();
      },
    });
  };

  const handleSelectProduct = (value) => {
    const current = data.product_interest || [];

    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    setData('product_interest', updated);
  };

  const handleSelectAll = () => {
    if (data.product_interest.length === productOptions.length) {
      setData('product_interest', []);
    } else {
      setData('product_interest', productOptions.map((p) => p.value));
    }
  };

  const handleDragEnd = (_, info) => {
    if (info.offset.y > SHEET_DISMISS_THRESHOLD) {
      closeWaitlist();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">

          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-nature-green/40 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeWaitlist}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 40 }}
            transition={{ type: 'spring', bounce: 0.2 }}
            drag={typeof window !== 'undefined' && window.innerWidth < 640 ? 'y' : false}
            onDragEnd={handleDragEnd}
            className={`relative z-10 w-full max-w-2xl bg-nature-white rounded-3xl shadow-premium border border-nature-beige/40 overflow-hidden ${isRtl ? 'text-right' : 'text-left'
              }`}
            dir={isRtl ? 'rtl' : 'ltr'}
          >
            <div className="max-h-[85dvh] overflow-y-auto px-5 sm:px-10 py-4 sm:py-6">

              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-[0.25em] text-nature-orange font-black mb-1">
                    {t('coming_soon.badge')}
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-black text-nature-green uppercase leading-tight">
                    {t('coming_soon.waitlist_form.title')}
                  </h2>
                </div>

                <button
                  onClick={closeWaitlist}
                  className="p-3 rounded-full bg-nature-beige/20 hover:bg-nature-beige/40"
                >
                  <X className="w-5 h-5 text-nature-green" />
                </button>
              </div>

              {/* SUCCESS */}
              {success ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-nature-green text-white flex items-center justify-center">
                    <Check />
                  </div>

                  <h3 className="text-lg font-black text-nature-green">
                    {t('coming_soon.waitlist_form.title')}
                  </h3>

                  <p className="text-sm text-nature-green/60">
                    {t('coming_soon.waitlist_form.success')}
                  </p>

                  <Button onClick={closeWaitlist} className="w-full">
                    Close
                  </Button>
                </div>
              ) : (
                <>
                  {/* PRODUCT SECTION */}
                  <div className="text-center mb-5">
                    <h4
                      onClick={() => setOpenProducts(!openProducts)}
                      className="text-xs uppercase tracking-[0.3em] font-black text-nature-green/60 mb-3 cursor-pointer"
                    >
                      {t('coming_soon.waitlist_form.product_interest')} — Enjoy it Now
                    </h4>

                    {openProducts && (
                      <>
                        <div className="flex justify-center mb-3">
                          <button
                            type="button"
                            onClick={handleSelectAll}
                            className="text-xs font-bold uppercase tracking-wider text-nature-orange"
                          >
                            {data.product_interest.length === productOptions.length
                              ? 'Unselect All'
                              : 'Select All'}
                          </button>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-w-xl mx-auto">
                          {productOptions.map((p) => {
                            const selected = data.product_interest.includes(p.value);

                            return (
                              <button
                                key={p.value}
                                type="button"
                                onClick={() => handleSelectProduct(p.value)}
                                className={`relative p-3 rounded-xl border-2 text-sm font-semibold transition-all ${selected
                                  ? 'border-nature-orange bg-nature-orange/10 scale-[1.03]'
                                  : 'border-transparent bg-nature-beige/20 hover:bg-nature-beige/40'
                                  }`}
                              >
                                {p.label}

                                {selected && (
                                  <Check className="absolute top-1 right-1 w-4 h-4 text-nature-orange" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>

                  {/* FORM */}
                  <form onSubmit={handleSubmit} className="space-y-3">

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                        <Input
                          label="First Name"
                          value={data.first_name}
                          onChange={(e) => setData('first_name', e.target.value)}
                        />

                        <Input
                          label="Last Name"
                          value={data.last_name}
                          onChange={(e) => setData('last_name', e.target.value)}
                        />

                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                        <Input
                          label="Email"
                          type="email"
                          value={data.email}
                          onChange={(e) => setData('email', e.target.value)}
                        />

                        <Input
                          label="Phone"
                          value={data.phone}
                          onChange={(e) => setData('phone', e.target.value)}
                        />

                      </div>
                    </div>
                    <Input
                      label="Street Address"
                      placeholder="12 bis Rue de la République"
                      value={data.street_address}
                      onChange={(e) =>
                        setData('street_address', e.target.value)
                      }
                    />
                    <div className="grid grid-cols-3 sm:grid-cols-3 gap-3">
                      <Input
                        label="Country"
                        value={data.country}
                        onChange={(e) =>
                          setData('country', e.target.value)
                        }
                      />
                      <Input
                        label="Postal Code"
                        placeholder="75001"
                        value={data.postal_code}
                        onChange={(e) =>
                          setData('postal_code', e.target.value)
                        }
                      />

                      <Input
                        label="City"
                        placeholder="Paris"
                        value={data.city}
                        onChange={(e) =>
                          setData('city', e.target.value)
                        }
                      />

                    </div>

                    {/* CTA */}
                    <div className="sticky bottom-0 pt-2 bg-nature-white/90 backdrop-blur-xl">
                      <Button
                        type="submit"
                        disabled={processing}
                        className="w-full py-3 font-black uppercase tracking-widest"
                      >
                        {processing ? 'Submitting...' : 'Join Waitlist'}
                      </Button>
                    </div>

                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WaitlistModal;