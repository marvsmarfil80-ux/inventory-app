import { useState } from "react"
import { Plus, Tags } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/shared/EmptyState"
import { ConfirmDialog } from "@/components/shared/ConfirmDialog"
import { CategoryCard } from "@/components/categories/CategoryCard"
import { CategoryForm } from "@/components/categories/CategoryForm"
import type { Product, Category, CategoryFormValues } from "@/types/inventory"

interface CategoriesPageProps {
  products: Product[]
  categories: Category[]
  onAddCategory: (values: CategoryFormValues) => Promise<void>
  onUpdateCategory: (id: number, values: CategoryFormValues) => Promise<void>
  onDeleteCategory: (id: number) => Promise<void>
}

export default function CategoriesPage({
  products,
  categories,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
}: CategoriesPageProps) {
  const [formOpen, setFormOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [formKey, setFormKey] = useState(0)

  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  function handleAddClick() {
    setEditingCategory(null)
    setFormKey((k) => k + 1)
    setFormOpen(true)
  }

  function handleEditClick(category: Category) {
    setEditingCategory(category)
    setFormKey((k) => k + 1)
    setFormOpen(true)
  }

  async function handleFormSubmit(values: CategoryFormValues) {
    if (editingCategory) {
      await onUpdateCategory(editingCategory.id, values)
    } else {
      await onAddCategory(values)
    }
  }

  function handleDeleteClick(category: Category) {
    setDeleteError(null)
    setDeleteTarget(category)
  }

  async function handleConfirmDelete() {
    if (!deleteTarget) return
    setIsDeleting(true)
    setDeleteError(null)
    try {
      await onDeleteCategory(deleteTarget.id)
      setDeleteTarget(null)
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : "Failed to delete category.")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="p-4 lg:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Categories</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Organize and manage your inventory categories.
          </p>
        </div>
        <Button onClick={handleAddClick} className="w-full sm:w-auto">
          <Plus size={16} className="mr-1.5" />
          New Category
        </Button>
      </div>

      <div className="mt-6">
        {categories.length === 0 ? (
          <EmptyState
            icon={Tags}
            title="No categories yet"
            description="Create a category to organize your inventory."
            actionLabel="New Category"
            onAction={handleAddClick}
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const count = products.filter((p) => p.category_id === category.id).length
              return (
                <CategoryCard
                  key={category.id}
                  category={category}
                  productCount={count}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteClick}
                />
              )
            })}
          </div>
        )}
      </div>

      <CategoryForm
        key={formKey}
        open={formOpen}
        onOpenChange={setFormOpen}
        initialCategory={editingCategory}
        onSubmit={handleFormSubmit}
      />

      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteTarget(null)
            setDeleteError(null)
          }
        }}
        title="Delete category?"
        description={`This will permanently delete "${deleteTarget?.name}". Categories with existing products cannot be deleted.`}
        isConfirming={isDeleting}
        errorMessage={deleteError}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}