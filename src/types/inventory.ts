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

export interface ProductFormValues {
  name: string
  price: number
  quantity: number
  low_stock_threshold: number
  category_id: number
}

export interface CategoryFormValues {
  name: string
  description: string
}