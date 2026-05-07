/**
 * Image Assets Structure Documentation
 * Guide for organizing and using images in ApexGaming project
 */

# Image Assets Structure Guide

## 📁 Directory Structure

```
frontend/
└── src/
    ├── assets/
    │   └── images/
    │       ├── products/           # Product images
    │       ├── ui/                 # UI components
    │       │   ├── icons/          # SVG icons
    │       │   ├── buttons/        # Button images
    │       │   └── badges/         # Badge icons
    │       ├── banners/            # Hero and promotional banners
    │       ├── backgrounds/        # Background patterns
    │       ├── avatars/            # User avatars
    │       └── decorations/        # Decorative elements
    │
    ├── config/
    │   └── imagePaths.ts           # Centralized image path config
    │
    └── components/
        └── common/
            ├── Image.tsx           # Optimized image component
            ├── Icons.tsx           # Icon components
            ├── ProductCard.tsx     # Product card with images
            └── index.ts            # Exports
```

## 🎯 Usage Examples

### 1. Using Image Paths

```tsx
import { IMAGE_PATHS } from '@/config/imagePaths';

// Access logo
<img src={IMAGE_PATHS.logo.main} alt="Logo" />

// Access product images
<img src={IMAGE_PATHS.products.pc1Main} alt="Product" />

// Access icons
<img src={IMAGE_PATHS.icons.cart} alt="Cart" />
```

### 2. Using Image Component

```tsx
import { Image } from '@/components/common';

<Image
  src={productImage}
  alt="Product"
  fallbackSrc={placeholderImage}
  isLazy={true}
/>
```

### 3. Using Responsive Images

```tsx
import { ResponsiveImage } from '@/components/common';

<ResponsiveImage
  desktopSrc={heroDesktop}
  mobileSrc={heroMobile}
  alt="Hero Banner"
/>
```

### 4. Using Icons

```tsx
import { CartIcon, UserIcon, HeartIcon, Icons } from '@/components/common';

// Direct icon
<CartIcon size="md" className="text-blue-600" />

// From Icons object
<Icons.Search size="lg" />
```

### 5. Using Product Card

```tsx
import { ProductCard } from '@/components/common';

<ProductCard
  id={1}
  name="Gaming PC RTX 4080"
  price={2999}
  mainImage={productImage}
  category="High-End"
  rating={4.5}
  reviewCount={128}
  isNew={true}
/>
```

## 🔄 Migration Path

### Phase 1: Local Storage (Current)
- All images stored in `/src/assets/images/`
- Used via direct import or IMAGE_PATHS config

### Phase 2: Backend + Local Upload
- Backend API serves images from `/uploads/` directory
- Images uploaded via admin dashboard
- Frontend fetches URLs from backend

Example:
```tsx
const imageUrl = `http://localhost:8000/uploads/products/${productId}.jpg`;
```

### Phase 3: Cloud Storage
- Images stored in AWS S3 or Cloudinary
- CDN for fast delivery globally
- Backend generates presigned URLs

Example:
```tsx
const imageUrl = `https://cdn.apexgaming.com/products/pc-1.jpg`;
```

## 📊 Image Optimization Tips

1. **Use appropriate formats:**
   - `.jpg` for photographs (products, banners)
   - `.png` for images with transparency
   - `.svg` for icons and logos
   - `.webp` for modern browsers (fallback to jpg)

2. **Compress images:**
   - Use tools like TinyPNG, ImageOptim
   - Reduce file sizes for faster loading

3. **Responsive sizes:**
   - Desktop: 1920x1080+
   - Tablet: 768x1024
   - Mobile: 360x640

4. **Lazy loading:**
   - Use `isLazy={true}` for below-the-fold images
   - Improves initial page load

## 🔗 Related Files

- `config/imagePaths.ts` - Image path configuration
- `components/common/Image.tsx` - Image component
- `components/common/Icons.tsx` - Icon components
- `components/common/ProductCard.tsx` - Product display

## 🚀 Next Steps

1. Add SVG files to `ui/icons/`
2. Add product images to `products/`
3. Add banner images to `banners/`
4. Test image loading and responsiveness
5. Set up backend image serving (Phase 2)
