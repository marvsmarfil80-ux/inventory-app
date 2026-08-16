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
import { Pencil, PackageSearch, PackagePlus } from "lucide-react"
import type { Product } from "@/types/inventory"

interface ProductTableProps {
  products: Product[]
  hasAnyProducts: boolean
  onEdit: (product: Product) => void
  onAddProduct?: () => void
}

export function ProductTable({ products, hasAnyProducts, onEdit, onAddProduct }: ProductTableProps) {
  if (products.length === 0) {
    if (!hasAnyProducts) {
      return (
        <EmptyState
          icon={PackagePlus}
          title="No products yet"
          description="Add your first product to get started."
          actionLabel={onAddProduct ? "Add Product" : undefined}
          onAction={onAddProduct}
        />
      )
    }
    return (
      <EmptyState
        icon={PackageSearch}
        title="No products found"
        description="Try adjusting your search term or category filter."
      />
    )
  }

  return (
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
            <TableRow key={product.id} className="hover:bg-muted/50">
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
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(product)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Pencil size={14} className="mr-1.5" />
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}