import { Card } from "@/components/ui/card"
import { EmptyState } from "@/components/shared/EmptyState"
import { Tags } from "lucide-react"
import type { Product, Category } from "@/types/inventory"

interface CategoriesPageProps {
  products: Product[]
  categories: Category[]
}

export default function CategoriesPage({ products, categories }: CategoriesPageProps) {
  return (
    <div className="p-4 lg:p-8">
      <h2 className="text-2xl font-semibold text-gray-900">Categories</h2>
      <p className="mt-1 text-sm text-gray-500">Pag-uuri ng mga products sa inventory mo.</p>

      <div className="mt-6">
        {categories.length === 0 ? (
          <EmptyState
            icon={Tags}
            title="Wala pang categories"
            description="Gumawa ng category para ma-organize ang inventory mo."
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const count = products.filter((p) => p.category_id === category.id).length
              return (
                <Card key={category.id} className="p-4">
                  <p className="font-medium text-gray-900">{category.name}</p>
                  {category.description && (
                    <p className="mt-1 text-sm text-gray-500">{category.description}</p>
                  )}
                  <p className="mt-3 text-sm text-gray-400">
                    {count} product{count !== 1 ? "s" : ""}
                  </p>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}