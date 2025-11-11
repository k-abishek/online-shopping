-- Create the shopify_db database
CREATE DATABASE IF NOT EXISTS shopify_db;

-- Use the database
USE shopify_db;

-- Create Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Create Products Table
CREATE TABLE IF NOT EXISTS products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DOUBLE NOT NULL,
    total_items_in_stock INT NOT NULL,
    image_url VARCHAR(1000),
    category_id BIGINT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Insert Sample Categories (ignore if already exists)
INSERT IGNORE INTO categories (name) VALUES 
    ('Food'),
    ('Mobiles'),
    ('Electronics'),
    ('Stationery');

-- Insert Sample Products (only if categories exist)
INSERT INTO products (name, price, total_items_in_stock, category_id) 
SELECT 'Organic Apple', 3.99, 150, id FROM categories WHERE name = 'Food'
UNION ALL
SELECT 'Fresh Bananas', 2.49, 200, id FROM categories WHERE name = 'Food'
UNION ALL
SELECT 'iPhone 15 Pro', 999.99, 50, id FROM categories WHERE name = 'Mobiles'
UNION ALL
SELECT 'Samsung Galaxy S24', 899.99, 45, id FROM categories WHERE name = 'Mobiles'
UNION ALL
SELECT 'Sony Headphones', 299.99, 75, id FROM categories WHERE name = 'Electronics'
UNION ALL
SELECT 'Dell Laptop', 1299.99, 30, id FROM categories WHERE name = 'Electronics'
UNION ALL
SELECT 'Notebook Set', 12.99, 200, id FROM categories WHERE name = 'Stationery'
UNION ALL
SELECT 'Pen Pack', 5.99, 500, id FROM categories WHERE name = 'Stationery';
