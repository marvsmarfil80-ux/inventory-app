import { useState } from "react"
import { Routes, Route } from "react-router-dom"
import { Sidebar } from "@/components/layout/Sidebar"
import DashboardPage from "@/pages/DashboardPage"
import ProductsPage from "@/pages/ProductsPage"
import CategoriesPage from "@/pages/CategoriesPage"
import { mockProducts, mockCategories } from "@/lib/mock-data"
import type { Product, ProductFormValues } from "@/types/inventory"

function App() {
  const [products, setProducts] = useState<Product[]>(mockProducts)

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
      <main className="flex-1 overflow-auto bg-[#FAFAFA]">
        <Routes>
          <Route path="/" element={<DashboardPage products={products} categories={mockCategories} />} />
          <Route
            path="/products"
            element={
              <ProductsPage
                products={products}
                categories={mockCategories}
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
  )
}

export default App