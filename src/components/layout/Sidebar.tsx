import { NavLink } from "react-router-dom"
import { navItems } from "@/lib/nav-items"

export function Sidebar() {
  return (
    <aside className="hidden h-screen w-64 flex-shrink-0 flex-col bg-[#111111] text-white lg:flex">
      <div className="px-6 py-6">
        <h1 className="text-lg font-semibold">Inventory</h1>
      </div>

      <nav className="flex flex-col gap-1 px-3">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  isActive
                    ? "bg-[#FF6A3D] text-white font-medium"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              {item.label}
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}