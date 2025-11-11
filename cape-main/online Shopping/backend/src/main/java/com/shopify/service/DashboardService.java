package com.shopify.service;

import com.shopify.dto.DashboardStatsDTO;
import com.shopify.entity.Category;
import com.shopify.repository.CategoryRepository;
import com.shopify.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {
    
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    
    public DashboardStatsDTO getDashboardStats() {
        long totalProducts = productRepository.count();
        List<Category> categories = categoryRepository.findAll();
        Double totalValue = productRepository.findTotalInventoryValue();
        Long totalItemsInStock = productRepository.findTotalItemsInStock();
        
        // Handle null values
        if (totalValue == null) totalValue = 0.0;
        if (totalItemsInStock == null) totalItemsInStock = 0L;
        
        return new DashboardStatsDTO(totalProducts, categories, totalValue, totalItemsInStock);
    }
}
