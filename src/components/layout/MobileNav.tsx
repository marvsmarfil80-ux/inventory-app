import { useState } from "react"
import { NavLink } from "react-router-dom"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { navItems } from "@/lib/nav-items"
import { ThemeToggle } from "@/components/layout/ThemeToggle"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex items-center justify-between border-b border-border bg-background px-4 py-3 lg:hidden">
      <span className="text-lg font-semibold text-foreground">Inventory</span>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            aria-label="Open navigation menu"
            className="rounded-lg p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary"
          >
            <Menu size={20} />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 bg-[#111111] p-0 text-white [&>button]:text-white">
          <div className="flex h-full flex-col">
            <SheetTitle className="px-6 py-6 text-lg font-semibold">Inventory</SheetTitle>
            <nav className="flex flex-1 flex-col gap-1 px-3">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/"}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground font-medium"
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
            <div className="border-t border-white/10 px-3 py-3">
              <ThemeToggle />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}