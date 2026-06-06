/**
 * Format price to Algerian Dinar
 * @param {number} amount 
 * @returns {string}
 */
export const formatPrice = (amount) => {
  const value = Number(amount) || 0;
  return new Intl.NumberFormat('fr-DZ', {
    style: 'decimal',
    minimumFractionDigits: 0,
  }).format(value) + ' DA';
};

/**
 * Format date to local string
 * @param {string|Date} date 
 * @returns {string}
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fr-DZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Get full image URL
 * @param {string} path 
 * @returns {string}
 */
export const getImageUrl = (path) => {
  if (!path) return '/placeholder.png';
  if (path.startsWith('http')) return path;
  
  // In Laravel, assets are served from the same origin.
  // We simply return the path starting with a slash to resolve relative to the current domain.
  return path.startsWith('/') ? path : `/${path}`;
};
