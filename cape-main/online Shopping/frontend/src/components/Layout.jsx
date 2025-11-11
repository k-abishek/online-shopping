import { BackpackIcon, ExitIcon, DashboardIcon } from "@radix-ui/react-icons"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function Layout({ children }) {
  const navigate = useNavigate()
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  const handleLogout = () => {
    setShowLogoutDialog(true)
  }

  const confirmLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userType")
    setShowLogoutDialog(false)
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-amazon-bg-gray dark:bg-gray-900">
      {/* Amazon-style Header */}
      <header className="bg-amazon-dark-blue shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-amazon-orange rounded flex items-center justify-center shadow-lg hover:bg-amazon-hover-orange transition-colors">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white">
                Shopify Admin
              </h1>
            </div>

            {/* Navigation */}
            <nav className="flex items-center space-x-2">
              <Link
                to="/dashboard"
                className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-amazon-light-blue transition-colors text-white border border-transparent hover:border-amazon-orange"
              >
                <DashboardIcon className="h-5 w-5" />
                <span className="font-medium text-sm">Dashboard</span>
              </Link>
              <Link
                to="/admin"
                className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-amazon-light-blue transition-colors text-white border border-transparent hover:border-amazon-orange"
              >
                <BackpackIcon className="h-5 w-5" />
                <span className="font-medium text-sm">Products</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-red-700 transition-colors text-white border border-transparent hover:border-red-500"
              >
                <ExitIcon className="h-5 w-5" />
                <span className="font-medium text-sm">Logout</span>
              </button>
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-amazon-dark-blue text-gray-300 mt-auto py-6 border-t border-amazon-light-blue">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© 2024 Shopify Admin. All rights reserved.</p>
        </div>
      </footer>

      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to logout from the admin panel?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowLogoutDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmLogout}
              className="bg-amazon-orange hover:bg-amazon-hover-orange text-white"
            >
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
