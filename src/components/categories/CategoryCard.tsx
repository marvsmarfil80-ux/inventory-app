import { Link } from "react-router-dom"
import { Card } from "@/components/ui/card"
import type { Category } from "@/types/inventory"

interface CategoryCardProps {
  category: Category
  productCount: number
}

export function CategoryCard({ category, productCount }: CategoryCardProps) {
  return (
    <Link to={`/products?category=${category.id}`}>
      <Card className="flex h-32 flex-col justify-between p-4 transition-colors hover:border-primary/40 hover:bg-primary/5">
        <p className="text-lg font-semibold text-foreground">{category.name}</p>
        <p className="text-sm text-muted-foreground">
          {productCount} product{productCount !== 1 ? "s" : ""}
        </p>
      </Card>
    </Link>
  )
}