/**
 * Image paths configuration for ApexGaming
 * Centralized image path management for easy refactoring and maintenance
 */

export const IMAGE_PATHS = {
  // ===== PUBLIC IMAGES =====
  logo: {
    main: '/images/logo.svg',
    white: '/images/logo-white.svg',
  },
  favicon: '/images/favicon.ico',

  // ===== PRODUCTS =====
  products: {
    // Example paths - replace with actual product images
    pc1Main: new URL('@/assets/images/products/pc-1-main.jpg', import.meta.url).href,
    pc1Thumb: new URL('@/assets/images/products/pc-1-thumb.jpg', import.meta.url).href,
    pc2Main: new URL('@/assets/images/products/pc-2-main.jpg', import.meta.url).href,
    pc2Thumb: new URL('@/assets/images/products/pc-2-thumb.jpg', import.meta.url).href,
    
    // Dynamic product images function for future backend integration
    getProductImage: (productId: number, imageType: 'main' | 'thumb' = 'main') => {
      // For now, returns local path
      // TODO: Switch to backend URL when available
      return `/api/products/${productId}/image?type=${imageType}`;
    },
  },

  // ===== UI ICONS =====
  icons: {
    cart: new URL('@/assets/images/ui/icons/cart.svg', import.meta.url).href,
    user: new URL('@/assets/images/ui/icons/user.svg', import.meta.url).href,
    search: new URL('@/assets/images/ui/icons/search.svg', import.meta.url).href,
    heart: new URL('@/assets/images/ui/icons/heart.svg', import.meta.url).href,
    star: new URL('@/assets/images/ui/icons/star.svg', import.meta.url).href,
    arrowRight: new URL('@/assets/images/ui/icons/arrow-right.svg', import.meta.url).href,
    arrowLeft: new URL('@/assets/images/ui/icons/arrow-left.svg', import.meta.url).href,
    check: new URL('@/assets/images/ui/icons/check.svg', import.meta.url).href,
    close: new URL('@/assets/images/ui/icons/close.svg', import.meta.url).href,
    menu: new URL('@/assets/images/ui/icons/menu.svg', import.meta.url).href,
    download: new URL('@/assets/images/ui/icons/download.svg', import.meta.url).href,
    upload: new URL('@/assets/images/ui/icons/upload.svg', import.meta.url).href,
  },

  // ===== BANNERS =====
  banners: {
    heroMain: new URL('@/assets/images/banners/hero-main.jpg', import.meta.url).href,
    heroMobile: new URL('@/assets/images/banners/hero-mobile.jpg', import.meta.url).href,
    promoNewArrivals: new URL('@/assets/images/banners/promo-new-arrivals.jpg', import.meta.url).href,
    promoDiscount: new URL('@/assets/images/banners/promo-discount.jpg', import.meta.url).href,
    seasonalBanner: new URL('@/assets/images/banners/seasonal-banner.jpg', import.meta.url).href,
  },

  // ===== BACKGROUNDS =====
  backgrounds: {
    pattern: new URL('@/assets/images/backgrounds/pattern.png', import.meta.url).href,
    gradient: new URL('@/assets/images/backgrounds/gradient.svg', import.meta.url).href,
    dark: new URL('@/assets/images/backgrounds/dark.jpg', import.meta.url).href,
  },

  // ===== AVATARS =====
  avatars: {
    default: new URL('@/assets/images/avatars/default-avatar.jpg', import.meta.url).href,
    defaultAlt: new URL('@/assets/images/avatars/default-avatar-alt.jpg', import.meta.url).href,
    placeholder: new URL('@/assets/images/avatars/placeholder.png', import.meta.url).href,
  },

  // ===== DECORATIONS =====
  decorations: {
    divider: new URL('@/assets/images/decorations/divider.svg', import.meta.url).href,
    shape: new URL('@/assets/images/decorations/shape.svg', import.meta.url).href,
  },
} as const;

/**
 * Helper function to validate image paths
 */
export function isValidImagePath(path: string | undefined): boolean {
  return typeof path === 'string' && path.length > 0;
}

/**
 * Helper function for responsive images
 */
export function getResponsiveImageSet(
  desktopImage: string,
  mobileImage?: string,
  tabletImage?: string
) {
  return {
    desktop: desktopImage,
    mobile: mobileImage || desktopImage,
    tablet: tabletImage || desktopImage,
  };
}
