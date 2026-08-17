import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import type { Category, CategoryFormValues } from "@/types/inventory"

interface CategoryFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialCategory?: Category | null
  onSubmit: (values: CategoryFormValues) => Promise<void>
}

function getInitialValues(initialCategory: Category | null | undefined): CategoryFormValues {
  if (initialCategory) {
    return {
      name: initialCategory.name,
      description: initialCategory.description ?? "",
    }
  }
  return { name: "", description: "" }
}

export function CategoryForm({ open, onOpenChange, initialCategory, onSubmit }: CategoryFormProps) {
  const [values, setValues] = useState<CategoryFormValues>(() => getInitialValues(initialCategory))
  const [error, setError] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isEditing = Boolean(initialCategory)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitError(null)
    if (!values.name.trim()) {
      setError("Category name is required.")
      return
    }
    setError(null)

    setIsSubmitting(true)
    try {
      await onSubmit(values)
      onOpenChange(false)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Failed to save category.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Category" : "New Category"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="cat-name">Category Name</Label>
            <Input
              id="cat-name"
              placeholder="e.g. Electronics"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
            {error && <p className="text-xs text-red-500 dark:text-red-400">{error}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="cat-description">Description</Label>
            <Textarea
              id="cat-description"
              placeholder="Optional short description..."
              value={values.description}
              onChange={(e) => setValues({ ...values, description: e.target.value })}
              rows={3}
            />
          </div>

          {submitError && (
            <p className="rounded-md bg-red-50 px-3 py-2 text-xs text-red-600 dark:bg-red-950 dark:text-red-400">
              {submitError}
            </p>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="hover:border-primary/40 hover:bg-primary/10 hover:text-foreground"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : isEditing ? "Save Changes" : "Create Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}