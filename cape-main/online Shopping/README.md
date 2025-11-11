# 🛒 Shopify - Full-Stack E-Commerce Application

A modern, full-stack e-commerce application with Spring Boot backend, MySQL database, and React frontend with Amazon-inspired UI.

## 🌟 Features

### 🔐 Authentication System
- **Admin Panel**: Login with `admin@123` / `12345`
- **User Shop**: Login with any credentials for shopping experience
- Secure session management with localStorage
- Auto-redirect based on user type

### 📊 Admin Features
- **Dashboard**: Real-time statistics (total products, inventory value, stock levels)
- **Category Management**: Full CRUD operations for product categories
- **Product Management**: Add, edit, delete products with image URLs
- **Responsive Tables**: Clean data visualization with sorting

### 🛍️ User Features
- **Product Catalog**: Browse products with search and category filters
- **Product Zoom**: Click any product to view detailed modal with large image
- **Shopping Cart**: Add to cart with animated loading states
- **Stock Management**: Real-time stock availability display
- **Checkout**: Simple checkout process with cart management

### 🎨 UI/UX
- **Amazon-Inspired Theme**: Professional orange (#FF9900) and dark blue (#232F3E) color scheme
- **Dark Mode Support**: Toggle between light and dark themes
- **Responsive Design**: Mobile-first approach, works on all devices
- **Smooth Animations**: Hover effects, loading states, transitions
- **Modern Components**: Built with shadcn/ui and Radix UI

## 🚀 Quick Start

### Prerequisites
- **Java 17** (LTS) - Not Java 24!
- **Maven 3.9+** (via Maven Wrapper - included)
- **Node.js 16+** and npm
- **MySQL 5.7+** or **MySQL 8.0+**

### 1. Database Setup

#### Create Database
```sql
-- MySQL Command Line or MySQL Workbench
CREATE DATABASE shopify_db;
```

#### Run Initialization Scripts (Optional - Auto-created)
```bash
cd database
mysql -u root -p shopify_db < init.sql
```

**Note**: Database and tables are created automatically on first run!

### 2. Start Backend

#### Option A: Using Batch File (Windows - Recommended)
```cmd
cd backend
start-backend.bat
```

#### Option B: Using PowerShell Script
```powershell
cd backend
.\start-backend.ps1
```

#### Option C: Direct Maven Command
```bash
cd backend
.\mvnw.cmd spring-boot:run
```

Backend will run on `http://localhost:8080`

**Verify Backend**: Open `http://localhost:8080/api/products` in browser

### 3. Start Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

### 4. Access the Application

Open browser and navigate to: `http://localhost:5173`

#### Login Credentials

**Admin Access:**
- Username: `admin@123`
- Password: `12345`
- Redirects to: Dashboard

**User Shopping:**
- Username: Any value (e.g., `user@test.com`)
- Password: Any value
- Redirects to: Shop

## 📁 Project Structure

```
shopify/
├── backend/                    # Spring Boot REST API
│   ├── src/main/
│   │   ├── java/com/shopify/
│   │   │   ├── entity/        # JPA Entities (Product, Category)
│   │   │   ├── repository/    # Spring Data JPA Repositories
│   │   │   ├── service/       # Business Logic Layer
│   │   │   ├── controller/    # REST API Controllers
│   │   │   ├── dto/           # Data Transfer Objects
│   │   │   ├── config/        # CORS & App Configuration
│   │   │   ├── DataLoader.java # Sample Data Seeder
│   │   │   └── ShopifyApplication.java
│   │   └── resources/
│   │       └── application.properties
│   ├── pom.xml
│   ├── mvnw.cmd               # Maven Wrapper (Windows)
│   ├── start-backend.bat      # Quick Start Script (CMD)
│   └── start-backend.ps1      # Quick Start Script (PowerShell)
│
├── frontend/                   # React + Vite Application
│   ├── src/
│   │   ├── components/        # Reusable Components
│   │   │   ├── Layout.jsx     # App Layout with Header
│   │   │   └── ui/            # shadcn/ui Components
│   │   ├── pages/
│   │   │   ├── Login.jsx      # Login Page
│   │   │   ├── AdminLogin.jsx # Admin Login (unused)
│   │   │   ├── Dashboard.jsx  # Admin Dashboard
│   │   │   ├── Admin.jsx      # Product & Category Management
│   │   │   └── Shop.jsx       # User Shopping Page
│   │   ├── services/
│   │   │   └── api.js         # Axios API Client
│   │   └── lib/
│   │       └── utils.js       # Utility Functions
│   ├── package.json
│   ├── tailwind.config.js     # Tailwind + Amazon Theme
│   └── vite.config.js
│
├── database/                   # SQL Scripts
│   ├── init.sql               # Table Creation (MySQL)
│   ├── setup-database.sql     # Database Setup
│   └── update_inr_and_images.sql
│
└── README.md                   # This File
```

## 🔗 API Endpoints

### Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard` | Get statistics (products, value, stock, categories) |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products with categories |
| GET | `/api/products/{id}` | Get single product by ID |
| POST | `/api/products` | Create new product |
| PUT | `/api/products/{id}` | Update existing product |
| DELETE | `/api/products/{id}` | Delete product |

### Categories
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | Get all categories |
| GET | `/api/categories/{id}` | Get single category |
| POST | `/api/categories` | Create new category |
| PUT | `/api/categories/{id}` | Update category |
| DELETE | `/api/categories/{id}` | Delete category |

## 💾 Database Schema

### Categories Table
```sql
CREATE TABLE categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
```

### Products Table
```sql
CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DOUBLE NOT NULL,
    total_items_in_stock INT NOT NULL,
    image_url VARCHAR(500),
    category_id BIGINT,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);
```

## 📦 Sample Data

The application auto-loads sample data on first startup:

**Categories:**
- Food
- Electronics
- Fashion
- Books

**Sample Products:**
- Organic Apple - ₹299.99 (Food, 150 units)
- iPhone 15 Pro - ₹79999.99 (Electronics, 50 units)
- Sony Headphones - ₹24999.99 (Electronics, 75 units)
- Notebook Set - ₹899.99 (Books, 200 units)

## 🛠️ Technology Stack

### Backend
- **Spring Boot** 3.3.5
- **Spring Data JPA** with Hibernate 6.5.3
- **MySQL Connector** (managed version)
- **Lombok** for boilerplate reduction
- **Maven** 3.9.9 (via wrapper)
- **Java** 17 LTS

### Frontend
- **React** 18.3
- **Vite** 5 (Lightning-fast dev server)
- **TailwindCSS** 3 (Utility-first CSS)
- **shadcn/ui** (Modern component library)
- **Radix UI** (Headless UI primitives)
- **React Router** 6 (Client-side routing)
- **Axios** (HTTP client)

### Database
- **MySQL** 5.7.44 or 8.0+

## 📝 Configuration

### Backend Configuration
File: `backend/src/main/resources/application.properties`

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/shopify_db?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# Server
server.port=8080
```

### Frontend API Configuration
File: `frontend/src/services/api.js`

```javascript
const API_BASE_URL = 'http://localhost:8080/api'
```

## 🎨 Amazon Theme Colors

The application uses an Amazon-inspired color palette:

```javascript
// Tailwind Config
colors: {
  amazon: {
    orange: '#FF9900',        // Primary action color
    'dark-blue': '#232F3E',   // Header/navigation
    'light-blue': '#37475A',  // Hover states
    'bg-gray': '#EAEDED',     // Background
    'hover-orange': '#FFA724' // Hover effects
  }
}
```

## 🌓 Dark Mode

Toggle between light and dark themes using the theme button in the header. Theme preference is saved in localStorage.

## 🔍 Development Tips

### Hot Reload
- **Frontend**: Vite provides instant HMR (Hot Module Replacement)
- **Backend**: Use Maven with `-Dspring-boot.run.fork=false` for faster restart

### Debugging

#### Frontend
```bash
# Run in development mode with source maps
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

#### Backend
```bash
# Run with debug logs
.\mvnw.cmd spring-boot:run -Dspring-boot.run.arguments="--logging.level.root=DEBUG"

# Clean and rebuild
.\mvnw.cmd clean install
```

### Database Management
- **MySQL Workbench**: GUI for MySQL management
- **DBeaver**: Universal database tool
- **phpMyAdmin**: Web-based MySQL admin
- **Command Line**: `mysql -u root -p`

## 🚨 Troubleshooting

### Backend Issues

#### "Java 24 not supported"
```bash
# Solution: Use Java 17
# Set JAVA_HOME to Java 17 directory
# See ENVIRONMENT_SETUP.md for detailed instructions
```

#### "Port 8080 already in use"
```bash
# Find and kill process on port 8080
netstat -ano | findstr :8080
taskkill /PID <process_id> /F
```

#### "Cannot connect to MySQL"
- Verify MySQL service is running
- Check username/password in `application.properties`
- Ensure database exists (or use `createDatabaseIfNotExist=true`)
- Check firewall settings

### Frontend Issues

#### "npm install fails"
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### "Cannot connect to backend"
- Verify backend is running on `http://localhost:8080`
- Check browser console for CORS errors
- Verify API_BASE_URL in `api.js`

#### "Page shows blank"
```bash
# Check for JavaScript errors in browser console
# Verify all dependencies are installed
npm install
```

### Database Issues

#### "Table doesn't exist"
```bash
# Let Hibernate create tables automatically
# Or run init.sql manually:
mysql -u root -p shopify_db < database/init.sql
```

#### "Data not loading"
- Check DataLoader.java is running
- Verify database connection
- Check Spring Boot logs for errors

## 📊 Project Status

### ✅ Completed Features
- [x] Backend API with Spring Boot + MySQL
- [x] Frontend with React + Vite + Tailwind
- [x] Amazon-inspired UI theme
- [x] Admin dashboard with statistics
- [x] Category CRUD operations
- [x] Product CRUD operations
- [x] User shopping interface
- [x] Shopping cart functionality
- [x] Product zoom/modal view
- [x] Search and filter products
- [x] Dark mode support
- [x] Responsive design
- [x] Auto database creation
- [x] Sample data seeding
- [x] Enhanced "Add to Cart" button with loading states

### 🔄 Potential Enhancements
- [ ] User registration/authentication with JWT
- [ ] Order management system
- [ ] Payment gateway integration
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Email notifications
- [ ] Inventory alerts
- [ ] Sales analytics
- [ ] Multi-image product gallery
- [ ] Advanced search with filters

## 📄 License

This project is for educational purposes.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For questions or issues:
1. Check the troubleshooting section
2. Review ENVIRONMENT_SETUP.md for backend setup
3. Check PROJECT_STATUS_AND_SETUP.md for detailed status
4. Create an issue in the repository

---

**Built with ❤️ using Spring Boot, React, and MySQL**

**Happy Coding! 🚀**
