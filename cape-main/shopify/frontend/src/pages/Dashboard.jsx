import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Layout from "@/components/Layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CubeIcon, TokensIcon, ArchiveIcon } from "@radix-ui/react-icons"
import { dashboardApi } from "@/services/api"

export default function Dashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check if admin is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    const userType = localStorage.getItem("userType")
    
    if (!isLoggedIn || userType !== "admin") {
      navigate("/login")
      return
    }

    fetchDashboardStats()
  }, [navigate])

  const fetchDashboardStats = async () => {
    try {
      setLoading(true)
      const response = await dashboardApi.getStats()
      setStats(response.data)
      setError(null)
    } catch (err) {
      setError("Failed to fetch dashboard statistics. Please ensure the backend is running.")
      console.error("Error fetching dashboard stats:", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-destructive">Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{error}</p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Dashboard
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Overview of your store statistics
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Total Products */}
                    <Card className="border-gray-200 hover:shadow-xl transition-shadow bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-amazon-bg-gray">
              <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">
                Total Products
              </CardTitle>
              <CubeIcon className="h-4 w-4 text-amazon-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.totalProducts || 0}</div>
              <p className="text-xs text-gray-700 dark:text-gray-300">
                Products in inventory
              </p>
            </CardContent>
          </Card>

          {/* Total Value */}
          <Card className="border-gray-200 hover:shadow-xl transition-shadow bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-amazon-bg-gray">
              <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">
                Total Value
              </CardTitle>
              <TokensIcon className="h-4 w-4 text-amazon-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                ₹{stats?.totalValue?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "0.00"}
              </div>
              <p className="text-xs text-gray-700 dark:text-gray-300">
                Total inventory value
              </p>
            </CardContent>
          </Card>

          {/* Total Items in Stock */}
          <Card className="border-gray-200 hover:shadow-xl transition-shadow bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-amazon-bg-gray">
              <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">
                Items in Stock
              </CardTitle>
              <ArchiveIcon className="h-4 w-4 text-amazon-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.totalItemsInStock || 0}</div>
              <p className="text-xs text-gray-700 dark:text-gray-300">
                Total items available
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Categories Card */}
        <Card className="col-span-full border-gray-200 shadow-xl bg-white">
          <CardHeader className="bg-amazon-bg-gray">
            <CardTitle className="text-gray-900 dark:text-white">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            {stats?.categories && stats.categories.length > 0 ? (
              <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
                {stats.categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-white hover:shadow-md transition-all"
                  >
                    <span className="font-medium text-gray-700 dark:text-gray-300">{category.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No categories available</p>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
