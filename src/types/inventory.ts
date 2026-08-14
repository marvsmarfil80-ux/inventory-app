export interface Category {
  id: number
  name: string
  description?: string | null
}

export interface Product {
  id: number
  name: string
  price: number
  quantity: number
  low_stock_threshold: number
  category_id: number
  category: Category
}