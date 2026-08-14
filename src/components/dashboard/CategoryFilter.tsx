import type { Category } from "@/types/inventory"

interface CategoryFilterProps {
  categories: Category[]
  activeCategory: number | "all"
  onSelect: (categoryId: number | "all") => void
}

export function CategoryFilter({ categories, activeCategory, onSelect }: CategoryFilterProps) {
  const baseClass = "rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
  const activeClass = "bg-[#FF6A3D] text-white"
  const inactiveClass = "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"

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