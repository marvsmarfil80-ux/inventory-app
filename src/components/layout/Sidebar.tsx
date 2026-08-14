import { LayoutDashboard, Package, Tags } from "lucide-react"

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Products", icon: Package },
  { label: "Categories", icon: Tags },
]

export function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col bg-[#111111] text-white">
      <div className="px-6 py-6">
        <h1 className="text-lg font-semibold">Inventory</h1>
      </div>

      <nav className="flex flex-col gap-1 px-3">
        {navItems.map((item, index) => {
          const Icon = item.icon
          const isActive = index === 0
          return (
            <button
              key={item.label}
              type="button"
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                isActive
                  ? "bg-[#FF6A3D] text-white font-medium"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}