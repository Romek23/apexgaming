/**
 * Icon Components
 * Reusable SVG icons with TypeScript support
 */

import React from 'react';
import { IMAGE_PATHS } from '@/config/imagePaths';

interface IconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const sizeMap = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
};

// ===== COMMON ICONS =====

export const CartIcon: React.FC<IconProps> = ({ size = 'md', className = '', ...props }) => (
  <img src={IMAGE_PATHS.icons.cart} alt="Cart" className={`${sizeMap[size]} ${className}`} {...props} />
);

export const UserIcon: React.FC<IconProps> = ({ size = 'md', className = '', ...props }) => (
  <img src={IMAGE_PATHS.icons.user} alt="User" className={`${sizeMap[size]} ${className}`} {...props} />
);

export const SearchIcon: React.FC<IconProps> = ({ size = 'md', className = '', ...props }) => (
  <img src={IMAGE_PATHS.icons.search} alt="Search" className={`${sizeMap[size]} ${className}`} {...props} />
);

export const HeartIcon: React.FC<IconProps> = ({ size = 'md', className = '', ...props }) => (
  <img src={IMAGE_PATHS.icons.heart} alt="Heart" className={`${sizeMap[size]} ${className}`} {...props} />
);

export const StarIcon: React.FC<IconProps> = ({ size = 'md', className = '', ...props }) => (
  <img src={IMAGE_PATHS.icons.star} alt="Star" className={`${sizeMap[size]} ${className}`} {...props} />
);

export const ArrowRightIcon: React.FC<IconProps> = ({ size = 'md', className = '', ...props }) => (
  <img src={IMAGE_PATHS.icons.arrowRight} alt="Arrow Right" className={`${sizeMap[size]} ${className}`} {...props} />
);

export const ArrowLeftIcon: React.FC<IconProps> = ({ size = 'md', className = '', ...props }) => (
  <img src={IMAGE_PATHS.icons.arrowLeft} alt="Arrow Left" className={`${sizeMap[size]} ${className}`} {...props} />
);

export const CheckIcon: React.FC<IconProps> = ({ size = 'md', className = '', ...props }) => (
  <img src={IMAGE_PATHS.icons.check} alt="Check" className={`${sizeMap[size]} ${className}`} {...props} />
);

export const CloseIcon: React.FC<IconProps> = ({ size = 'md', className = '', ...props }) => (
  <img src={IMAGE_PATHS.icons.close} alt="Close" className={`${sizeMap[size]} ${className}`} {...props} />
);

export const MenuIcon: React.FC<IconProps> = ({ size = 'md', className = '', ...props }) => (
  <img src={IMAGE_PATHS.icons.menu} alt="Menu" className={`${sizeMap[size]} ${className}`} {...props} />
);

export const DownloadIcon: React.FC<IconProps> = ({ size = 'md', className = '', ...props }) => (
  <img src={IMAGE_PATHS.icons.download} alt="Download" className={`${sizeMap[size]} ${className}`} {...props} />
);

export const UploadIcon: React.FC<IconProps> = ({ size = 'md', className = '', ...props }) => (
  <img src={IMAGE_PATHS.icons.upload} alt="Upload" className={`${sizeMap[size]} ${className}`} {...props} />
);

// ===== ICON GROUPS =====

export const Icons = {
  Cart: CartIcon,
  User: UserIcon,
  Search: SearchIcon,
  Heart: HeartIcon,
  Star: StarIcon,
  ArrowRight: ArrowRightIcon,
  ArrowLeft: ArrowLeftIcon,
  Check: CheckIcon,
  Close: CloseIcon,
  Menu: MenuIcon,
  Download: DownloadIcon,
  Upload: UploadIcon,
} as const;
