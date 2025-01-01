package com.example.Online_medical_store.dto;

import com.example.Online_medical_store.entity.Products;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderByUserIdAndProductId {
    private int order_id;
    private String email_id;
    private int quantity;
    private double total_price;
    private int product_id;
    private String product_name;
    private double product_price;
    List<String> products;

}
