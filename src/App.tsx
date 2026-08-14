import { useState } from "react"
import { Sidebar } from "@/components/layout/Sidebar"
import { StatsCards } from "@/components/dashboard/StatsCards"
import { CategoryFilter } from "@/components/dashboard/CategoryFilter"
import { mockProducts, mockCategories } from "@/lib/mock-data"

function App() {
  const [activeCategory, setActiveCategory] = useState<number | "all">("all")

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-[#FAFAFA] p-8">
        <h2 className="text-2xl font-semibold text-gray-900">Dashboard</h2>
        <p className="mt-1 text-sm text-gray-500">
          Overview ng inventory mo.
        </p>

        <div className="mt-6">
          <StatsCards products={mockProducts} categories={mockCategories} />
        </div>

        <div className="mt-6">
          <CategoryFilter
            categories={mockCategories}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />
        </div>
      </main>
    </div>
  )
}

export default App