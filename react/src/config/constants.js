/**
 * Archivo de configuración centralizada
 * IMPORTANTE: Para producción, estas variables deberían estar en variables de entorno
 */

// Contacto
export const WHATSAPP_NUMBER = '51954153608';
export const BUSINESS_EMAIL = 'contacto@bartori-peru.com'; // Actualiza con tu email real
export const BUSINESS_PHONE = '(+51) 954 153 608';

// Redes sociales (actualiza con tus links reales)
export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/bartori.peru',
  instagram: 'https://instagram.com/bartori.peru',
};

// Regiones disponibles
export const REGIONS = ['Piura', 'Lambayeque'];

// Límites de productos
export const PRODUCT_LIMITS = {
  MIN_QUANTITY: 1,
  MAX_QUANTITY: 999,
  MIN_WHOLESALE_BOXES: 10, // Mínimo para envío gratis
};

// Información de la empresa
export const COMPANY_INFO = {
  name: 'Bartori Perú',
  fullName: 'BARTORI PERÚ - Distribuidores Zona Norte',
  yearsExperience: 20,
  description: 'Especialistas en la distribución de barquillos y bases para helado BARTORI en la zona norte del Perú.',
};

// SEO
export const SEO = {
  defaultTitle: 'BARTORI PERÚ - Distribuidores de Barquillos para Helados | Zona Norte',
  defaultDescription: 'Distribuidores oficiales de barquillos y conos BARTORI en la zona norte del Perú. Más de 20 años ofreciendo productos de calidad para heladerías. Precios especiales para mayoristas.',
  keywords: 'barquillos, conos para helado, bartori, lambayeque, piura, mayorista, helados, bases para helado',
};

// URLs (para producción)
export const URLS = {
  website: 'https://www.bartori-peru.com',
  support: 'https://support.bartori-peru.com',
};

// Validaciones
export const VALIDATIONS = {
  phone: /^[0-9]{9}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};