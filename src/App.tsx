import { useEffect, useState, useCallback } from "react"
import { Routes, Route } from "react-router-dom"
import { Sidebar } from "@/components/layout/Sidebar"
import { MobileNav } from "@/components/layout/MobileNav"
import { ErrorState } from "@/components/shared/ErrorState"
import DashboardPage from "@/pages/DashboardPage"
import ProductsPage from "@/pages/ProductsPage"
import CategoriesPage from "@/pages/CategoriesPage"
import { fetchProducts, fetchCategories, createProduct, updateProduct, createCategory } from "@/lib/api"
import type { Product, Category, ProductFormValues, CategoryFormValues } from "@/types/inventory"

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
  try {
    const [productsData, categoriesData] = await Promise.all([fetchProducts(), fetchCategories()])
    setProducts(productsData)
    setCategories(categoriesData)
  } catch (err) {
    setError(err instanceof Error ? err.message : "Failed to load inventory data.")
  } finally {
    setIsLoading(false)
  }
}, [])

useEffect(() => {
  // eslint-disable-next-line -- fetchData is async; setState calls happen after the await.
  fetchData()
}, [fetchData])

function retryLoad() {
  setIsLoading(true)
  setError(null)
  fetchData()
}
  async function addProduct(values: ProductFormValues) {
    const newProduct = await createProduct(values)
    setProducts((prev) => [...prev, newProduct])
  }

  async function editProduct(id: number, values: ProductFormValues) {
    const updated = await updateProduct(id, values)
    setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)))
  }

  async function addCategory(values: CategoryFormValues) {
    const newCategory = await createCategory(values)
    setCategories((prev) => [...prev, newCategory])
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-background p-8">
        <div className="w-full max-w-md">
         <ErrorState message={error} onRetry={retryLoad} />
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <MobileNav />
        <main className="flex-1 overflow-auto bg-background">
          <Routes>
            <Route
              path="/"
              element={<DashboardPage products={products} categories={categories} isLoading={isLoading} />}
            />
            <Route
              path="/products"
              element={
                <ProductsPage
                  products={products}
                  categories={categories}
                  isLoading={isLoading}
                  onAddProduct={addProduct}
                  onUpdateProduct={editProduct}
                />
              }
            />
            <Route
              path="/categories"
              element={
                <CategoriesPage products={products} categories={categories} onAddCategory={addCategory} />
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App