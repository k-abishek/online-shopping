-- Create Database
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
    category_id BIGINT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Insert Sample Categories
INSERT INTO categories (name) VALUES 
    ('Food'),
    ('Mobiles'),
    ('Electronics'),
    ('Stationery');

-- Insert Sample Products
INSERT INTO products (name, price, total_items_in_stock, category_id) VALUES 
    ('Organic Apple', 3.99, 150, 1),
    ('iPhone 15 Pro', 999.99, 50, 2),
    ('Sony Headphones', 299.99, 75, 3),
    ('Notebook Set', 12.99, 200, 4);
