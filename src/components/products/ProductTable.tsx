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
import { Pencil } from "lucide-react"
import type { Product } from "@/types/inventory"

interface ProductTableProps {
  products: Product[]
  onEdit: (product: Product) => void
}

export function ProductTable({ products, onEdit }: ProductTableProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 bg-white py-16 text-center">
        <p className="text-sm font-medium text-gray-900">No products found</p>
        <p className="mt-1 text-sm text-gray-500">
          Try a different category or check back later.
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
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
            <TableRow key={product.id} className="hover:bg-gray-50">
              <TableCell className="font-medium text-gray-900">{product.name}</TableCell>
              <TableCell className="text-gray-600">{product.category.name}</TableCell>
              <TableCell className="text-right text-gray-900">
                ${product.price.toFixed(2)}
              </TableCell>
              <TableCell className="text-right text-gray-900">{product.quantity}</TableCell>
              <TableCell>
                <StatusBadge product={product} />
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(product)}
                  className="text-gray-500 hover:text-gray-900"
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