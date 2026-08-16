import { useState } from "react"
import { Plus, Tags } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/shared/EmptyState"
import { CategoryCard } from "@/components/categories/CategoryCard"
import { CategoryForm } from "@/components/categories/CategoryForm"
import type { Product, Category, CategoryFormValues } from "@/types/inventory"

interface CategoriesPageProps {
  products: Product[]
  categories: Category[]
  onAddCategory: (values: CategoryFormValues) => void
}

export default function CategoriesPage({ products, categories, onAddCategory }: CategoriesPageProps) {
  const [formOpen, setFormOpen] = useState(false)

  return (
    <div className="p-4 lg:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Categories</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Organize and manage your inventory categories.
          </p>
        </div>
        <Button onClick={() => setFormOpen(true)}>
          <Plus size={16} className="mr-1.5" />
          New Category
        </Button>
      </div>

      <div className="mt-6">
        {categories.length === 0 ? (
          <EmptyState
            icon={Tags}
            title="No categories yet"
            description="Create your first category to organize your inventory."
            actionLabel="New Category"
            onAction={() => setFormOpen(true)}
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const count = products.filter((p) => p.category_id === category.id).length
              return <CategoryCard key={category.id} category={category} productCount={count} />
            })}
          </div>
        )}
      </div>

      <CategoryForm open={formOpen} onOpenChange={setFormOpen} onSubmit={onAddCategory} />
    </div>
  )
}