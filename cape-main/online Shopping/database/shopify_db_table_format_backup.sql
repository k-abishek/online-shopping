-- ============================================
-- SHOPIFY DATABASE BACKUP (TABLE FORMAT)
-- Database: shopify_db
-- Date: 2025-11-11
-- ============================================

-- ============================================
-- CATEGORIES TABLE
-- ============================================
-- +----+-------------+
-- | id | name        |
-- +----+-------------+
-- | 5  | Food        |
-- | 6  | Electronics |
-- | 7  | Fashion     |
-- | 8  | Book        |
-- +----+-------------+

INSERT INTO `categories` VALUES 
(5, 'Food'),
(6, 'Electronics'),
(7, 'Fashion'),
(8, 'Book');

-- ============================================
-- PRODUCTS TABLE
-- ============================================
-- +----+--------------------------------------------------------------------------------+----------------+-------+---------------------+-------------+
-- | id | image_url                                                                      | name           | price | total_items_in_stock| category_id |
-- +----+--------------------------------------------------------------------------------+----------------+-------+---------------------+-------------+
-- | 5  | https://blog.boon.so/wp-content/uploads/2024/10/coca-cola-cold-drink-...       | Cool Drinks    | 30    | 50                  | 5           |
-- | 6  | https://img.freepik.com/free-psd/close-up-delicious-apple_23-215186...        | Apple          | 10    | 50                  | 5           |
-- | 7  | https://p2-ofp.static.pub//fes/cms/2024/07/17/109vq5fdalv01w5jsu6v...         | Laptop         | 50000 | 20                  | 6           |
-- | 8  | https://backend.paiinternational.in/media/images/1_BEZmMS5.jpg                 | Apple M4       | 80000 | 10                  | 6           |
-- | 9  | https://images.bewakoof.com/t320/men-s-blue-white-checked-shirt-685...         | Shirt          | 800   | 40                  | 7           |
-- | 10 | https://m.media-amazon.com/images/I/61lV0GpD3-L._AC_UF1000,1000_QL80_.jpg      | The Lean Start | 300   | 40                  | 8           |
-- +----+--------------------------------------------------------------------------------+----------------+-------+---------------------+-------------+

INSERT INTO `products` VALUES 
(5, 'https://blog.boon.so/wp-content/uploads/2024/10/coca-cola-cold-drink-soft-drink-coke-50593.jpg', 'Cool Drinks', 30, 50, 5),
(6, 'https://img.freepik.com/free-psd/close-up-delicious-apple_23-2151868338.jpg?semt=ais_hybrid&w=740&q=80', 'Apple', 10, 50, 5),
(7, 'https://p2-ofp.static.pub//fes/cms/2024/07/17/109vq5fdalv01w5jsu6vh35ncnk5jn890135.png', 'Laptop', 50000, 20, 6),
(8, 'https://backend.paiinternational.in/media/images/1_BEZmMS5.jpg', 'Apple M4', 80000, 10, 6),
(9, 'https://images.bewakoof.com/t320/men-s-blue-white-checked-shirt-685543-1762263545-1.jpg', 'Shirt', 800, 40, 7),
(10, 'https://m.media-amazon.com/images/I/61lV0GpD3-L._AC_UF1000,1000_QL80_.jpg', 'The Lean Startup', 300, 40, 8);

-- ============================================
-- END OF BACKUP
-- ============================================
