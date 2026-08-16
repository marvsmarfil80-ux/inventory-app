import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import { Sidebar } from "@/components/layout/Sidebar"
import { MobileNav } from "@/components/layout/MobileNav"
import DashboardPage from "@/pages/DashboardPage"
import ProductsPage from "@/pages/ProductsPage"
import CategoriesPage from "@/pages/CategoriesPage"
import { mockProducts, mockCategories } from "@/lib/mock-data"
import type { Product, ProductFormValues } from "@/types/inventory"

function App() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  function addProduct(values: ProductFormValues) {
    const category = mockCategories.find((c) => c.id === values.category_id)!
    const newProduct: Product = {
      id: Math.max(0, ...products.map((p) => p.id)) + 1,
      ...values,
      category,
    }
    setProducts((prev) => [...prev, newProduct])
  }

  function updateProduct(id: number, values: ProductFormValues) {
    const category = mockCategories.find((c) => c.id === values.category_id)!
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...values, category } : p)))
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
              element={<DashboardPage products={products} categories={mockCategories} isLoading={isLoading} />}
            />
            <Route
              path="/products"
              element={
                <ProductsPage
                  products={products}
                  categories={mockCategories}
                  isLoading={isLoading}
                  onAddProduct={addProduct}
                  onUpdateProduct={updateProduct}
                />
              }
            />
            <Route
              path="/categories"
              element={<CategoriesPage products={products} categories={mockCategories} />}
            />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App