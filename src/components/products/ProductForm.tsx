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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import type { Product, Category } from "@/types/inventory"

interface ProductFormValues {
  name: string
  price: number
  quantity: number
  low_stock_threshold: number
  category_id: number
}

interface ProductFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  categories: Category[]
  initialProduct?: Product | null
  onSubmit: (values: ProductFormValues) => void
}

function getInitialValues(
  initialProduct: Product | null | undefined,
  categories: Category[]
): ProductFormValues {
  if (initialProduct) {
    return {
      name: initialProduct.name,
      price: initialProduct.price,
      quantity: initialProduct.quantity,
      low_stock_threshold: initialProduct.low_stock_threshold,
      category_id: initialProduct.category_id,
    }
  }
  return {
    name: "",
    price: 0,
    quantity: 0,
    low_stock_threshold: 5,
    category_id: categories[0]?.id ?? 0,
  }
}

export function ProductForm({
  open,
  onOpenChange,
  categories,
  initialProduct,
  onSubmit,
}: ProductFormProps) {
  const [values, setValues] = useState<ProductFormValues>(() =>
    getInitialValues(initialProduct, categories)
  )
  const [errors, setErrors] = useState<Partial<Record<keyof ProductFormValues, string>>>({})

  const isEditing = Boolean(initialProduct)

  function validate(): boolean {
    const newErrors: Partial<Record<keyof ProductFormValues, string>> = {}
    if (!values.name.trim()) newErrors.name = "Product name is required."
    if (values.price <= 0) newErrors.price = "Price must be a positive number."
    if (values.quantity < 0) newErrors.quantity = "Quantity cannot be negative."
    if (values.low_stock_threshold < 0) newErrors.low_stock_threshold = "Low stock threshold cannot be negative."
    if (!values.category_id) newErrors.category_id = "Please select a category."
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    onSubmit(values)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Product" : "Add New Product"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Item Name</Label>
            <Input
              id="name"
              placeholder="e.g. Samsung TV"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
            {errors.name && <p className="text-xs text-red-500 dark:text-red-400">{errors.name}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="category">Category</Label>
            <Select
              value={values.category_id ? String(values.category_id) : undefined}
              onValueChange={(val) => setValues({ ...values, category_id: Number(val) })}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category..." />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem
                    key={c.id}
                    value={String(c.id)}
                    className="focus:bg-primary/10 focus:text-foreground"
                  >
  {c.name}
</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category_id && (
              <p className="text-xs text-red-500 dark:text-red-400">{errors.category_id}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={values.price}
                onChange={(e) => setValues({ ...values, price: Number(e.target.value) })}
              />
              {errors.price && <p className="text-xs text-red-500 dark:text-red-400">{errors.price}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="0"
                value={values.quantity}
                onChange={(e) => setValues({ ...values, quantity: Number(e.target.value) })}
              />
              {errors.quantity && (
                <p className="text-xs text-red-500 dark:text-red-400">{errors.quantity}</p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="threshold">Low Stock Threshold</Label>
            <Input
              id="threshold"
              type="number"
              min="0"
              value={values.low_stock_threshold}
              onChange={(e) =>
                setValues({ ...values, low_stock_threshold: Number(e.target.value) })
              }
            />
            {errors.low_stock_threshold && (
              <p className="text-xs text-red-500 dark:text-red-400">{errors.low_stock_threshold}</p>
            )}
          </div>

          <DialogFooter>
            <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="hover:border-primary/40 hover:bg-primary/10 hover:text-foreground"
            >
              Cancel
            </Button>
            <Button type="submit">{isEditing ? "Save Changes" : "Add Product"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}