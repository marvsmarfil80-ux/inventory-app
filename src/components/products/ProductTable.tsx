import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/products/StatusBadge"
import { EmptyState } from "@/components/shared/EmptyState"
import { ConfirmDialog } from "@/components/shared/ConfirmDialog"
import { Pencil, Trash2, PackageSearch, PackagePlus } from "lucide-react"
import type { Product } from "@/types/inventory"

interface ProductTableProps {
  products: Product[]
  hasAnyProducts: boolean
  onEdit: (product: Product) => void
  onDelete: (id: number) => Promise<void>
  onAddProduct?: () => void
}

export function ProductTable({ products, hasAnyProducts, onEdit, onDelete, onAddProduct }: ProductTableProps) {
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  async function handleConfirmDelete() {
    if (!deleteTarget) return
    setIsDeleting(true)
    setDeleteError(null)
    try {
      await onDelete(deleteTarget.id)
      setDeleteTarget(null)
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : "Failed to delete product.")
    } finally {
      setIsDeleting(false)
    }
  }

  if (products.length === 0) {
    if (!hasAnyProducts) {
      return (
        <EmptyState
          icon={PackagePlus}
          title="No products yet"
          description="Add your first item to start tracking inventory."
          actionLabel={onAddProduct ? "Add Product" : undefined}
          onAction={onAddProduct}
        />
      )
    }
    return (
      <EmptyState
        icon={PackageSearch}
        title="No products found"
        description="Try adjusting your search or category filter."
      />
    )
  }

  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} className="hover:bg-primary/5">
                <TableCell className="font-medium text-foreground whitespace-nowrap">
                  {product.name}
                </TableCell>
                <TableCell className="text-muted-foreground whitespace-nowrap">
                  {product.category.name}
                </TableCell>
                <TableCell className="text-right text-foreground whitespace-nowrap">
                  ${product.price.toFixed(2)}
                </TableCell>
                <TableCell className="text-right text-foreground">{product.quantity}</TableCell>
                <TableCell className="whitespace-nowrap">
                  <StatusBadge product={product} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(product)}
                      className="text-muted-foreground hover:bg-primary/10 hover:text-foreground"
                    >
                      <Pencil size={14} className="mr-1.5" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setDeleteError(null)
                        setDeleteTarget(product)
                      }}
                      className="text-muted-foreground hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950 dark:hover:text-red-400"
                    >
                      <Trash2 size={14} className="mr-1.5" />
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteTarget(null)
            setDeleteError(null)
          }
        }}
        title="Delete product?"
        description={`This will permanently delete "${deleteTarget?.name}" from your inventory. This action cannot be undone.`}
        isConfirming={isDeleting}
        errorMessage={deleteError}
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}