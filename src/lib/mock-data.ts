import type { Product, Category } from "@/types/inventory"

export const mockCategories: Category[] = [
  { id: 1, name: "Electronics", description: "Devices and gadgets" },
  { id: 2, name: "Furniture", description: "Office and home furniture" },
  { id: 3, name: "Office Supplies", description: "Stationery and consumables" },
  { id: 4, name: "Accessories", description: "Cables, mounts, and add-ons" },
]

export const mockProducts: Product[] = [
  { id: 1, name: "Samsung Smart TV 55\"", price: 899.0, quantity: 12, low_stock_threshold: 5, category_id: 1, category: mockCategories[0] },
  { id: 2, name: "Clean Desk (Standing)", price: 349.0, quantity: 4, low_stock_threshold: 5, category_id: 2, category: mockCategories[1] },
  { id: 3, name: "Wireless Mouse", price: 29.99, quantity: 45, low_stock_threshold: 10, category_id: 4, category: mockCategories[3] },
  { id: 4, name: "A4 Bond Paper (Ream)", price: 4.5, quantity: 3, low_stock_threshold: 15, category_id: 3, category: mockCategories[2] },
  { id: 5, name: "Ergonomic Office Chair", price: 199.0, quantity: 8, low_stock_threshold: 5, category_id: 2, category: mockCategories[1] },
  { id: 6, name: "USB-C Hub", price: 45.0, quantity: 2, low_stock_threshold: 5, category_id: 4, category: mockCategories[3] },
  { id: 7, name: "Ballpoint Pens (Box)", price: 6.0, quantity: 60, low_stock_threshold: 20, category_id: 3, category: mockCategories[2] },
  { id: 8, name: "27\" Monitor", price: 279.0, quantity: 6, low_stock_threshold: 5, category_id: 1, category: mockCategories[0] },
]