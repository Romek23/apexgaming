export type AppUser = {
  id?: number;
  name: string;
  email: string;
  avatarUrl?: string;
};

export type SavedBuildPart = {
  categoryId: string;
  categoryLabel: string;
  partName: string;
  brand: string;
  price: number;
  specs: string[];
};

export type SavedBuild = {
  id: number;
  name: string;
  totalPrice: number;
  estimatedWattage: number;
  parts: SavedBuildPart[];
  createdAt?: string;
};

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

export type CartBuildItem = {
  id: number;
  name: string;
  totalPrice: number;
  estimatedWattage: number;
  parts: SavedBuildPart[];
};

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

export type AppCart = {
  catalogItems: CartCatalogItem[];
  buildItems: CartBuildItem[];
  componentItems: CartComponentItem[];
};
