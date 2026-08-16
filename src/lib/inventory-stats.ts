import type { Product } from "@/types/inventory"

export function getTotalItems(products: Product[]): number {
  return products.reduce((sum, p) => sum + p.quantity, 0)
}

export function getTotalValue(products: Product[]): number {
  return products.reduce((sum, p) => sum + p.price * p.quantity, 0)
}

export function getLowStockCount(products: Product[]): number {
  return products.filter((p) => p.quantity <= p.low_stock_threshold).length
}

export function getLowStockProducts(products: Product[]): Product[] {
  return products
    .filter((p) => p.quantity <= p.low_stock_threshold)
    .sort((a, b) => a.quantity - b.quantity)
}