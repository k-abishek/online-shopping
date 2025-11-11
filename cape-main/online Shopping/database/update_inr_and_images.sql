-- Update database schema to add image_url column and convert prices to INR
-- Run this script to update existing database

-- Add image_url column if it doesn't exist (MySQL doesn't support IF NOT EXISTS for ALTER TABLE ADD COLUMN)
-- Check first if column exists, or just run and handle error
ALTER TABLE products ADD COLUMN image_url VARCHAR(1000);

-- Clear existing data to reload with INR prices and images
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE products;
TRUNCATE TABLE categories;
SET FOREIGN_KEY_CHECKS = 1;

-- Insert categories
INSERT INTO categories (id, name) VALUES 
(1, 'Food'),
(2, 'Mobiles'),
(3, 'Electronics'),
(4, 'Stationery');

-- Reset category auto increment
ALTER TABLE categories AUTO_INCREMENT = 5;

-- Insert products with INR prices and image URLs
INSERT INTO products (id, name, price, total_items_in_stock, image_url, category_id) VALUES 
(1, 'Organic Apple', 299.00, 150, 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400', 1),
(2, 'iPhone 15 Pro', 134900.00, 50, 'https://images.unsplash.com/photo-1678652197950-32d529427814?w=400', 2),
(3, 'Sony Headphones', 24999.00, 75, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', 3),
(4, 'Notebook Set', 899.00, 200, 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400', 4);

-- Reset product auto increment
ALTER TABLE products AUTO_INCREMENT = 5;

-- Verify the update
SELECT 
    p.id,
    p.name,
    p.price as "Price (INR)",
    p.total_items_in_stock as "Stock",
    c.name as "Category",
    CASE 
        WHEN p.image_url IS NOT NULL THEN 'Yes'
        ELSE 'No'
    END as "Has Image"
FROM products p
JOIN categories c ON p.category_id = c.id
ORDER BY p.id;
