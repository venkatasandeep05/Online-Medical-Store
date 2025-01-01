package com.example.Online_medical_store.controller;

import com.example.Online_medical_store.controller.requestPOJO.ErrorResponse;
import com.example.Online_medical_store.entity.Products;
import com.example.Online_medical_store.service.productService.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    ProductService productService;

    @GetMapping("/getAllProducts")
    public List<Products> productsList(){
        return productService.findAll();
    }


    @GetMapping("/getProductById/{id}")
    public ResponseEntity<?> productById(@PathVariable int id) {
        try {
            return ResponseEntity.ok(productService.productById(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(e.getMessage()));
        }
    }

    @GetMapping("/getProductByName/{name}")
    public ResponseEntity<?> productByName(@PathVariable String name) {
        try {
            return ResponseEntity.ok(productService.productByName(name));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(e.getMessage()));
        }
    }

    @PostMapping("/saveProducts")
    public ResponseEntity<?> saveProducts(@RequestBody List<Products> products){
        return ResponseEntity.ok(productService.saveProducrts(products));
    }
}
