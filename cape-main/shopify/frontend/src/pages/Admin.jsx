import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Layout from "@/components/Layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { productApi, categoryApi } from "@/services/api"

export default function Admin() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showDialog, setShowDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [deletingProductId, setDeletingProductId] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    totalItemsInStock: "",
    categoryId: "",
    imageUrl: ""
  })
  
  // Category management states
  const [showCategoryDialog, setShowCategoryDialog] = useState(false)
  const [showDeleteCategoryDialog, setShowDeleteCategoryDialog] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [deletingCategoryId, setDeletingCategoryId] = useState(null)
  const [categoryFormData, setCategoryFormData] = useState({ name: "" })

  useEffect(() => {
    // Check if admin is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    const userType = localStorage.getItem("userType")
    
    if (!isLoggedIn || userType !== "admin") {
      navigate("/login")
      return
    }

    fetchProducts()
    fetchCategories()
  }, [navigate])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await productApi.getAll()
      setProducts(response.data)
      setError(null)
    } catch (err) {
      setError("Failed to fetch products. Please ensure the backend is running.")
      console.error("Error fetching products:", err)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await categoryApi.getAll()
      setCategories(response.data)
    } catch (err) {
      console.error("Error fetching categories:", err)
    }
  }

  const handleAdd = () => {
    setEditingProduct(null)
    setFormData({
      name: "",
      price: "",
      totalItemsInStock: "",
      categoryId: categories[0]?.id || "",
      imageUrl: ""
    })
    setShowDialog(true)
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      price: product.price.toString(),
      totalItemsInStock: product.totalItemsInStock.toString(),
      categoryId: product.category?.id || categories[0]?.id || "",
      imageUrl: product.imageUrl || ""
    })
    setShowDialog(true)
  }

  const handleDelete = (productId) => {
    setDeletingProductId(productId)
    setShowDeleteDialog(true)
  }

  const confirmDelete = async () => {
    try {
      await productApi.delete(deletingProductId)
      await fetchProducts()
      setShowDeleteDialog(false)
      setDeletingProductId(null)
    } catch (err) {
      alert("Failed to delete product. Please try again.")
      console.error("Error deleting product:", err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const productData = {
      name: formData.name,
      price: parseFloat(formData.price),
      totalItemsInStock: parseInt(formData.totalItemsInStock),
      categoryId: parseInt(formData.categoryId),
      imageUrl: formData.imageUrl
    }

    try {
      if (editingProduct) {
        await productApi.update(editingProduct.id, productData)
      } else {
        await productApi.create(productData)
      }
      await fetchProducts()
      setShowDialog(false)
      setFormData({ name: "", price: "", totalItemsInStock: "", categoryId: "", imageUrl: "" })
    } catch (err) {
      alert("Failed to save product. Please try again.")
      console.error("Error saving product:", err)
    }
  }

  // Category Management Functions
  const handleAddCategory = () => {
    setEditingCategory(null)
    setCategoryFormData({ name: "" })
    setShowCategoryDialog(true)
  }

  const handleEditCategory = (category) => {
    setEditingCategory(category)
    setCategoryFormData({ name: category.name })
    setShowCategoryDialog(true)
  }

  const handleDeleteCategory = (categoryId) => {
    setDeletingCategoryId(categoryId)
    setShowDeleteCategoryDialog(true)
  }

  const confirmDeleteCategory = async () => {
    try {
      await categoryApi.delete(deletingCategoryId)
      await fetchCategories()
      await fetchProducts()
      setShowDeleteCategoryDialog(false)
      setDeletingCategoryId(null)
    } catch (err) {
      alert("Failed to delete category. Make sure no products are assigned to it.")
      console.error("Error deleting category:", err)
    }
  }

  const handleCategorySubmit = async (e) => {
    e.preventDefault()
    
    try {
      if (editingCategory) {
        await categoryApi.update(editingCategory.id, categoryFormData)
      } else {
        await categoryApi.create(categoryFormData)
      }
      await fetchCategories()
      setShowCategoryDialog(false)
      setCategoryFormData({ name: "" })
    } catch (err) {
      alert("Failed to save category. Please try again.")
      console.error("Error saving category:", err)
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading products...</p>
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
        {/* Category Management Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                Category Management
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Manage product categories
              </p>
            </div>
            <Button
              onClick={handleAddCategory}
              className="bg-amazon-orange hover:bg-amazon-hover-orange text-white"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Category
            </Button>
          </div>

          <Card className="border-gray-200 shadow-xl bg-white">
            <CardHeader className="bg-amazon-bg-gray">
              <CardTitle className="text-gray-900 dark:text-white">
                All Categories
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {categories.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-blue-50/50 dark:bg-blue-900/10">
                        <TableHead className="font-semibold">ID</TableHead>
                        <TableHead className="font-semibold">Category Name</TableHead>
                        <TableHead className="font-semibold text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categories.map((category) => (
                        <TableRow key={category.id} className="hover:bg-blue-50/50 dark:hover:bg-blue-900/10">
                          <TableCell className="font-medium">{category.id}</TableCell>
                          <TableCell className="font-medium text-lg">{category.name}</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditCategory(category)}
                              className="border-blue-300 hover:bg-blue-50 dark:border-blue-700 dark:hover:bg-blue-900/20"
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteCategory(category.id)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No categories found. Click "Add Category" to create one.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Product Management Section */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Product Management
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Add, edit, or delete products from your inventory
            </p>
          </div>
          <Button
            onClick={handleAdd}
            className="bg-amazon-orange hover:bg-amazon-hover-orange text-white"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Product
          </Button>
        </div>

        {/* Products Table */}
        <Card className="border-gray-200 shadow-xl bg-white">
          <CardHeader className="bg-amazon-bg-gray">
            <CardTitle className="text-gray-900 dark:text-white">
              All Products
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {products.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-purple-50/50 dark:bg-purple-900/10">
                      <TableHead className="font-semibold">ID</TableHead>
                      <TableHead className="font-semibold">Image</TableHead>
                      <TableHead className="font-semibold">Product Name</TableHead>
                      <TableHead className="font-semibold">Category</TableHead>
                      <TableHead className="font-semibold">Price (INR)</TableHead>
                      <TableHead className="font-semibold">Stock</TableHead>
                      <TableHead className="font-semibold text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id} className="hover:bg-purple-50/50 dark:hover:bg-purple-900/10">
                        <TableCell className="font-medium">{product.id}</TableCell>
                        <TableCell>
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                            {product.imageUrl ? (
                              <img 
                                src={product.imageUrl} 
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-gray-900 dark:text-white">{product.name}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                            {product.category?.name || "N/A"}
                          </span>
                        </TableCell>
                        <TableCell className="font-semibold text-red-600 dark:text-red-400">
                          ₹{product.price.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            product.totalItemsInStock > 10 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                              : product.totalItemsInStock > 0
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                          }`}>
                            {product.totalItemsInStock}
                          </span>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(product)}
                            className="border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800 text-gray-900 dark:text-white"
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(product.id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-center text-gray-700 dark:text-gray-300 py-8">
                No products found. Click "Add Product" to create one.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit Product Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Edit Product" : "Add New Product"}
            </DialogTitle>
            <DialogDescription>
              {editingProduct 
                ? "Update the product details below" 
                : "Fill in the details to add a new product"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-900 dark:text-white">Product Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="border-gray-300 focus:border-amazon-orange focus:ring-amazon-orange"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrl" className="text-gray-900 dark:text-white">Image URL</Label>
                <Input
                  id="imageUrl"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="border-gray-300 focus:border-amazon-orange focus:ring-amazon-orange"
                />
                {formData.imageUrl && (
                  <div className="mt-2 w-32 h-32 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img 
                      src={formData.imageUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="price" className="text-gray-900 dark:text-white">Price (INR ₹)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                  className="border-gray-300 focus:border-amazon-orange focus:ring-amazon-orange"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock" className="text-gray-900 dark:text-white">Stock Quantity</Label>
                <Input
                  id="stock"
                  type="number"
                  min="0"
                  value={formData.totalItemsInStock}
                  onChange={(e) => setFormData({ ...formData, totalItemsInStock: e.target.value })}
                  required
                  className="border-gray-300 focus:border-amazon-orange focus:ring-amazon-orange"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="text-gray-900 dark:text-white">Category</Label>
                <select
                  id="category"
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-amazon-orange text-gray-900 dark:text-white"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowDialog(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-amazon-orange hover:bg-amazon-hover-orange text-white"
              >
                {editingProduct ? "Update" : "Add"} Product
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Category Dialog */}
      <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? "Edit Category" : "Add New Category"}
            </DialogTitle>
            <DialogDescription>
              {editingCategory 
                ? "Update the category name below" 
                : "Enter a name for the new category"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCategorySubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="categoryName" className="text-gray-900 dark:text-white">Category Name</Label>
                <Input
                  id="categoryName"
                  placeholder="e.g., Electronics, Fashion, Books"
                  value={categoryFormData.name}
                  onChange={(e) => setCategoryFormData({ name: e.target.value })}
                  required
                  className="border-gray-300 focus:border-amazon-orange focus:ring-amazon-orange"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCategoryDialog(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-amazon-orange hover:bg-amazon-hover-orange text-white"
              >
                {editingCategory ? "Update" : "Add"} Category
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Category Confirmation Dialog */}
      <Dialog open={showDeleteCategoryDialog} onOpenChange={setShowDeleteCategoryDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete Category</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this category? Make sure no products are assigned to it first.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteCategoryDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDeleteCategory}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  )
}
