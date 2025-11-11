package com.shopify.dto;

import com.shopify.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsDTO {
    private long totalProducts;
    private List<Category> categories;
    private Double totalValue;
    private Long totalItemsInStock;
}
