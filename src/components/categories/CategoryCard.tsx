import { useNavigate } from "react-router-dom"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import type { Category } from "@/types/inventory"

interface CategoryCardProps {
  category: Category
  productCount: number
  onEdit: (category: Category) => void
  onDelete: (category: Category) => void
}

export function CategoryCard({ category, productCount, onEdit, onDelete }: CategoryCardProps) {
  const navigate = useNavigate()

  return (
    <Card
      onClick={() => navigate(`/products?category=${category.id}`)}
      className="flex h-32 cursor-pointer flex-col justify-between p-4 transition-colors hover:border-primary/40 hover:bg-primary/10"
    >
      <div className="flex items-start justify-between">
        <p className="text-lg font-semibold text-foreground">{category.name}</p>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation()
              onEdit(category)
            }}
            className="h-7 w-7 text-muted-foreground hover:bg-primary/10 hover:text-foreground"
          >
            <Pencil size={14} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation()
              onDelete(category)
            }}
            className="h-7 w-7 text-muted-foreground hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950 dark:hover:text-red-400"
          >
            <Trash2 size={14} />
          </Button>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        {productCount} product{productCount !== 1 ? "s" : ""}
      </p>
    </Card>
  )
}