import { useMemo, useState } from "react"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CategoryFilter } from "@/components/dashboard/CategoryFilter"
import { ProductTable } from "@/components/products/ProductTable"
import { ProductTableSkeleton } from "@/components/products/ProductTableSkeleton"
import { ProductForm } from "@/components/products/ProductForm"
import { filterProductsByCategory, filterProductsBySearch } from "@/lib/inventory-filters"
import type { Product, Category, ProductFormValues } from "@/types/inventory"

interface ProductsPageProps {
  products: Product[]
  categories: Category[]
  isLoading: boolean
  onAddProduct: (values: ProductFormValues) => void
  onUpdateProduct: (id: number, values: ProductFormValues) => void
}

export default function ProductsPage({
  products,
  categories,
  isLoading,
  onAddProduct,
  onUpdateProduct,
}: ProductsPageProps) {
  const [activeCategory, setActiveCategory] = useState<number | "all">("all")
  const [search, setSearch] = useState("")
  const [formOpen, setFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formKey, setFormKey] = useState(0)

  const filteredProducts = useMemo(() => {
    const byCategory = filterProductsByCategory(products, activeCategory)
    return filterProductsBySearch(byCategory, search)
  }, [products, activeCategory, search])

  function handleAddClick() {
    setEditingProduct(null)
    setFormKey((k) => k + 1)
    setFormOpen(true)
  }

  function handleEditClick(product: Product) {
    setEditingProduct(product)
    setFormKey((k) => k + 1)
    setFormOpen(true)
  }

  function handleFormSubmit(values: ProductFormValues) {
    if (editingProduct) {
      onUpdateProduct(editingProduct.id, values)
    } else {
      onAddProduct(values)
    }
  }

  return (
    <div className="p-4 lg:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Products</h2>
          <p className="mt-1 text-sm text-muted-foreground">Lahat ng tracked items sa inventory mo.</p>
        </div>
        <Button onClick={handleAddClick}>
          <Plus size={16} className="mr-1.5" />
          Add Product
        </Button>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />
      </div>

      <div className="mt-6">
        {isLoading ? (
          <ProductTableSkeleton />
        ) : (
          <ProductTable
            products={filteredProducts}
            hasAnyProducts={products.length > 0}
            onEdit={handleEditClick}
            onAddProduct={handleAddClick}
          />
        )}
      </div>

      <ProductForm
        key={formKey}
        open={formOpen}
        onOpenChange={setFormOpen}
        categories={categories}
        initialProduct={editingProduct}
        onSubmit={handleFormSubmit}
      />
    </div>
  )
}