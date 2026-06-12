/**
 * Основні типи даних клієнтської частини вебзастосунку
 * Main data types used in the client-side of the web application
 */

// ==================== USER TYPES ====================

/**
 * Тип користувача застосунку
 * Application user type
 */
export type AppUser = {
  id?: number;
  name: string;
  email: string;
  avatarUrl?: string;
};

// ==================== PC BUILDER TYPES ====================

/**
 * Ідентифікатор категорії комплектуючої
 * Component category identifier
 */
export type PartCategoryId =
  | "cpu"
  | "motherboard"
  | "gpu"
  | "ram"
  | "storage"
  | "psu"
  | "case"
  | "cooling";

/**
 * Опис однієї комплектуючої для конструктора ПК
 * Single PC component description
 */
export type PcPart = {
  id: string;
  categoryId: PartCategoryId;
  name: string;
  brand: string;
  price: number;
  wattage: number;
  specs: string[];
  badge?: string;
  socket?: "LGA1700" | "AM5";
  ramType?: "DDR5";
  formFactor?: "ATX" | "mATX" | "Mini-ITX";
  supportedFormFactors?: Array<"ATX" | "mATX" | "Mini-ITX">;
  gpuLengthMm?: number;
  maxGpuLengthMm?: number;
  psuCapacityW?: number;
  coolerSockets?: Array<"LGA1700" | "AM5">;
};

/**
 * Категорія комплектуючої у меню конструктора
 * Component category in the builder menu
 */
export type PartCategory = {
  id: PartCategoryId;
  label: string;
  description: string;
};

/**
 * Зібрана комплектуюча у збереженому збірці
 * Component in a saved build
 */
export type SavedBuildPart = {
  categoryId: string;
  categoryLabel: string;
  partName: string;
  brand: string;
  price: number;
  specs: string[];
};

/**
 * Збережена збірка ПК
 * Saved PC build
 */
export type SavedBuild = {
  id: number;
  name: string;
  totalPrice: number;
  estimatedWattage: number;
  parts: SavedBuildPart[];
  createdAt?: string;
};

// ==================== CART TYPES ====================

/**
 * Елемент каталогу в кошику
 * Catalog item in cart
 */
export type CartCatalogItem = {
  id: string;
  name: string;
  price: number;
  priceLabel: string;
  image: string;
  cpu: string;
  gpu: string;
  ram: string;
  ssd: string;
};

/**
 * Збережена збірка в кошику
 * Saved build in cart
 */
export type CartBuildItem = {
  id: number;
  name: string;
  totalPrice: number;
  estimatedWattage: number;
  parts: SavedBuildPart[];
};

/**
 * Компонент у кошику
 * Component in cart
 */
export type CartComponentItem = {
  id: string;
  categoryId: string;
  categoryLabel: string;
  name: string;
  brand: string;
  price: number;
  wattage: number;
  specs: string[];
};

/**
 * Кошик застосунку, що містить товари, збірки та компоненти
 * Application cart containing items, builds, and components
 */
export type AppCart = {
  catalogItems: CartCatalogItem[];
  buildItems: CartBuildItem[];
  componentItems: CartComponentItem[];
};

// ==================== NAVIGATION TYPES ====================

/**
 * Ідентифікатор сторінки застосунку
 * Application page identifier
 */
export type PageId =
  | "home"
  | "catalog"
  | "pc-builder"
  | "components"
  | "cart"
  | "auth"
  | "profile"
  | "about";

/**
 * Тип навігації за розділом
 * Navigation by section type
 */
export type AboutSectionId =
  | "about"
  | "advantages"
  | "reviews"
  | "popular-products";

// ==================== FORM TYPES ====================

/**
 * Данні реєстрації користувача
 * User registration data
 */
export type RegistrationData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

/**
 * Данні входу користувача
 * User login data
 */
export type LoginData = {
  email: string;
  password: string;
};

// ==================== API RESPONSE TYPES ====================

/**
 * Успішна API відповідь
 * Successful API response
 */
export type ApiSuccess<T> = {
  status: "success";
  data: T;
};

/**
 * Помилкова API відповідь
 * Error API response
 */
export type ApiError = {
  status: "error";
  message: string;
  code?: string;
};

/**
 * Загальний тип API відповіді
 * Generic API response type
 */
export type ApiResponse<T> = ApiSuccess<T> | ApiError;

// ==================== SORTING & FILTERING ====================

/**
 * Напрям сортування
 * Sort direction
 */
export type SortDirection = "asc" | "desc";

/**
 * Параметри фільтрації каталогу
 * Catalog filtering parameters
 */
export type FilterParams = {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  search?: string;
  sortBy?: "price" | "popularity" | "newest";
  sortDirection?: SortDirection;
};
