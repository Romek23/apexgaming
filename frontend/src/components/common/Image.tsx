/**
 * Image component for optimized image rendering
 * Handles loading states, error handling, and responsive images
 */

import React, { useState, useEffect } from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  isLazy?: boolean;
  onImageLoad?: () => void;
  onImageError?: () => void;
  className?: string;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  fallbackSrc,
  isLazy = true,
  onImageLoad,
  onImageError,
  className = '',
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState<string>(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImageSrc(src);
    setHasError(false);
    setIsLoading(true);
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
    onImageLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);

    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
    }

    onImageError?.();
  };

  return (
    <img
      src={imageSrc}
      alt={alt}
      loading={isLazy ? 'lazy' : 'eager'}
      onLoad={handleLoad}
      onError={handleError}
      className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      {...props}
    />
  );
};

interface ResponsiveImageProps {
  desktopSrc: string;
  mobileSrc?: string;
  tabletSrc?: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  desktopSrc,
  mobileSrc,
  tabletSrc,
  alt,
  fallbackSrc,
  className = '',
}) => {
  return (
    <picture>
      {mobileSrc && (
        <source media="(max-width: 640px)" srcSet={mobileSrc} />
      )}
      {tabletSrc && (
        <source media="(max-width: 1024px)" srcSet={tabletSrc} />
      )}
      <Image
        src={desktopSrc}
        alt={alt}
        fallbackSrc={fallbackSrc}
        className={className}
      />
    </picture>
  );
};

interface ImageGalleryProps {
  images: string[];
  alt: string;
  fallbackSrc?: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  alt,
  fallbackSrc,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (images.length === 0) {
    return null;
  }

  const mainImage = images[selectedIndex];
  const thumbnails = images;

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="w-full bg-gray-200 rounded-lg overflow-hidden">
        <Image
          src={mainImage}
          alt={alt}
          fallbackSrc={fallbackSrc}
          className="w-full h-96 object-cover"
        />
      </div>

      {/* Thumbnails */}
      {thumbnails.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {thumbnails.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`flex-shrink-0 rounded-lg overflow-hidden transition-all ${
                selectedIndex === idx
                  ? 'ring-2 ring-blue-500 opacity-100'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={img}
                alt={`${alt} ${idx + 1}`}
                fallbackSrc={fallbackSrc}
                className="w-20 h-20 object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
