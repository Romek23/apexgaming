/**
 * Product Card Component
 * Displays a single product with image, name, and price
 */

import React from 'react';
import { Image } from './Image';
import { IMAGE_PATHS } from '@/config/imagePaths';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  mainImage: string;
  thumbnailImage?: string;
  category?: string;
  rating?: number;
  reviewCount?: number;
  isNew?: boolean;
  onCardClick?: (productId: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  mainImage,
  thumbnailImage,
  category,
  rating = 0,
  reviewCount = 0,
  isNew = false,
  onCardClick,
}) => {
  return (
    <div
      onClick={() => onCardClick?.(id)}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative bg-gray-100 overflow-hidden group">
        <Image
          src={mainImage}
          alt={name}
          fallbackSrc={IMAGE_PATHS.avatars.placeholder}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* New Badge */}
        {isNew && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            New
          </div>
        )}

        {/* Heart Icon */}
        <button className="absolute top-2 left-2 bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <img src={IMAGE_PATHS.icons.heart} alt="Wishlist" className="w-5 h-5" />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        {category && (
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            {category}
          </p>
        )}

        {/* Name */}
        <h3 className="font-bold text-lg text-gray-800 line-clamp-2 mb-2">
          {name}
        </h3>

        {/* Rating */}
        {rating > 0 && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={IMAGE_PATHS.icons.star}
                  alt="star"
                  className={`w-4 h-4 ${i < Math.floor(rating) ? 'opacity-100' : 'opacity-30'}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              ({reviewCount})
            </span>
          </div>
        )}

        {/* Price */}
        <p className="text-2xl font-bold text-blue-600">
          ${price.toFixed(2)}
        </p>

        {/* Button */}
        <button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  );
};
