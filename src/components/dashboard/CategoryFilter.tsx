import type { Category } from "@/types/inventory"

interface CategoryFilterProps {
  categories: Category[]
  activeCategory: number | "all"
  onSelect: (categoryId: number | "all") => void
}

export function CategoryFilter({ categories, activeCategory, onSelect }: CategoryFilterProps) {
  const baseClass = "rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
  const activeClass = "bg-primary text-primary-foreground"
  const inactiveClass = "bg-card text-muted-foreground border border-border hover:bg-muted"

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onSelect("all")}
        className={`${baseClass} ${activeCategory === "all" ? activeClass : inactiveClass}`}
      >
        All Categories
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => onSelect(category.id)}
          className={`${baseClass} ${activeCategory === category.id ? activeClass : inactiveClass}`}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}