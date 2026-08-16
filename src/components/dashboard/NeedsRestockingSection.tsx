import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { StatusBadge } from "@/components/products/StatusBadge"
import { getLowStockProducts } from "@/lib/inventory-stats"
import type { Product } from "@/types/inventory"

interface NeedsRestockingSectionProps {
  products: Product[]
  isLoading: boolean
}

const MAX_VISIBLE = 5

export function NeedsRestockingSection({ products, isLoading }: NeedsRestockingSectionProps) {
  const lowStockProducts = getLowStockProducts(products).slice(0, MAX_VISIBLE)

  return (
    <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="font-medium text-foreground">Needs restocking</h3>
        <Button
          asChild
          variant="outline"
          className="w-full hover:border-primary/40 hover:bg-primary/10 hover:text-foreground sm:w-auto"
        >
          <Link to="/products">View all products</Link>
        </Button>
      </div>

      <div className="mt-4">
        {isLoading ? (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full rounded-lg" />
            ))}
          </div>
        ) : lowStockProducts.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border py-8 text-center">
            <p className="text-sm text-muted-foreground">
              All products are sufficiently stocked.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="whitespace-nowrap px-4 py-2.5 font-medium text-muted-foreground">
                    Product
                  </th>
                  <th className="whitespace-nowrap px-4 py-2.5 font-medium text-muted-foreground">
                    Category
                  </th>
                  <th className="whitespace-nowrap px-4 py-2.5 text-right font-medium text-muted-foreground">
                    Stock
                  </th>
                  <th className="whitespace-nowrap px-4 py-2.5 font-medium text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {lowStockProducts.map((product, i) => (
                  <tr
                    key={product.id}
                    className={i !== lowStockProducts.length - 1 ? "border-b border-border" : ""}
                  >
                    <td className="whitespace-nowrap px-4 py-2.5 font-medium text-foreground">
                      {product.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2.5 text-muted-foreground">
                      {product.category.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2.5 text-right text-foreground">
                      {product.quantity}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2.5">
                      <StatusBadge product={product} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}