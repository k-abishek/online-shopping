package com.shopify;

import com.shopify.entity.Category;
import com.shopify.entity.Product;
import com.shopify.repository.CategoryRepository;
import com.shopify.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {
    
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    
    @Override
    public void run(String... args) throws Exception {
        // Check if data already exists
        if (categoryRepository.count() > 0) {
            System.out.println("Database already contains data. Skipping initialization.");
            return;
        }
        
        // Create Categories
        Category food = categoryRepository.save(new Category("Food"));
        Category electronics = categoryRepository.save(new Category("Electronics"));
        Category fashion = categoryRepository.save(new Category("Fashion"));
        Category books = categoryRepository.save(new Category("Books"));
        
        // Create Sample Products (Prices in INR)
        productRepository.save(new Product("Organic Apple", 299.00, 150, "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400", food));
        productRepository.save(new Product("Sony Headphones", 24999.00, 75, "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400", electronics));
        productRepository.save(new Product("Cotton T-Shirt", 799.00, 100, "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400", fashion));
        productRepository.save(new Product("The Great Gatsby", 399.00, 50, "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400", books));
        
        System.out.println("Database initialized with sample data!");
    }
}
