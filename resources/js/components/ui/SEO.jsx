import React from 'react';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

const SEO = ({ title, description, image, url, type = 'website' }) => {
  const { t, i18n } = useTranslation();
  
  const siteTitle = t('meta.title') || 'FISORA';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const siteDescription = description || t('hero.subtitle') || 'Produits naturels';
  const siteUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const siteImage = image || '/fisora_hero_premium_1778746442341.png';

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={siteUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={siteImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={siteUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={siteImage} />
    </Head>
  );
};

export default SEO;
