import type { Product } from "@/types/inventory"

export function filterProductsByCategory(
  products: Product[],
  categoryId: number | "all"
): Product[] {
  if (categoryId === "all") return products
  return products.filter((p) => p.category_id === categoryId)
}

export function filterProductsBySearch(products: Product[], query: string): Product[] {
  const q = query.trim().toLowerCase()
  if (!q) return products
  return products.filter((p) => p.name.toLowerCase().includes(q))
}