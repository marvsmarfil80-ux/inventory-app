import type { Product, Category, ProductFormValues, CategoryFormValues } from "@/types/inventory"

const API_URL = import.meta.env.VITE_API_URL

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorBody = await response.json().catch(() => null)
    const message = errorBody?.detail || `Request failed with status ${response.status}`
    throw new Error(message)
  }
  return response.json()
}

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/products/`)
  return handleResponse<Product[]>(res)
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${API_URL}/categories/`)
  return handleResponse<Category[]>(res)
}

export async function createProduct(values: ProductFormValues): Promise<Product> {
  const res = await fetch(`${API_URL}/products/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  })
  return handleResponse<Product>(res)
}

export async function updateProduct(id: number, values: ProductFormValues): Promise<Product> {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  })
  return handleResponse<Product>(res)
}

export async function createCategory(values: CategoryFormValues): Promise<Category> {
  const res = await fetch(`${API_URL}/categories/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  })
  return handleResponse<Category>(res)
}