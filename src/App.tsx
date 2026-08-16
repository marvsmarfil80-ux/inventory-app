import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import { Sidebar } from "@/components/layout/Sidebar"
import { MobileNav } from "@/components/layout/MobileNav"
import DashboardPage from "@/pages/DashboardPage"
import ProductsPage from "@/pages/ProductsPage"
import CategoriesPage from "@/pages/CategoriesPage"
import { mockProducts, mockCategories } from "@/lib/mock-data"
import type { Product, Category, ProductFormValues, CategoryFormValues } from "@/types/inventory"

function App() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [categories, setCategories] = useState<Category[]>(mockCategories)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  function addProduct(values: ProductFormValues) {
    const category = categories.find((c) => c.id === values.category_id)!
    const newProduct: Product = {
      id: Math.max(0, ...products.map((p) => p.id)) + 1,
      ...values,
      category,
    }
    setProducts((prev) => [...prev, newProduct])
  }

  function updateProduct(id: number, values: ProductFormValues) {
    const category = categories.find((c) => c.id === values.category_id)!
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...values, category } : p)))
  }

  function addCategory(values: CategoryFormValues) {
    const newCategory: Category = {
      id: Math.max(0, ...categories.map((c) => c.id)) + 1,
      name: values.name,
      description: values.description || null,
    }
    setCategories((prev) => [...prev, newCategory])
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
                  onUpdateProduct={updateProduct}
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