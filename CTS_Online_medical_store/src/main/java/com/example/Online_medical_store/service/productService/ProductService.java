package com.example.Online_medical_store.service.productService;

import com.example.Online_medical_store.entity.Products;
import com.example.Online_medical_store.repository.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

@Service
@Transactional
public class ProductService {

    @Autowired
    ProductsRepository productsRepository;

    public List<Products> findAll() {
        return productsRepository.findAll();
    }

    public List<Products> productByName(String name) throws Exception {
        Optional<List<Products>> products = productsRepository.findByProductNameIgnoreCaseContaining(name);
        if (products.isPresent() && !products.get().isEmpty())
            return products.get();
        else
            throw new Exception("Product not found");
    }

    public Products productById(long product_id) throws Exception {
        return productsRepository.findById(product_id)
                .orElseThrow(() -> new Exception("Product is not found for id " + product_id));
    }

    public List<Products> saveProducrts(List<Products> products) {
        return productsRepository.saveAll(products);
    }

    public boolean checkTotalAmountAgainstCart(double price, ArrayList<Long> productIds) {
        return true;
    }

    public void updateProductStock(ArrayList<Long> productId, ArrayList<Integer> quantity) throws Exception {

        for (int i = 0; i < productId.size(); i++) {
            Optional<Products> product = productsRepository.findById(productId.get(i));
            if (!product.isPresent())
                throw new Exception("Product is not found for id " + productId.get(i));
            if (product.get().getProductStock() < quantity.get(i)) {
                throw new Exception("Not enough stock for product " + product.get().getProductName());
            }
            product.get().setProductStock(product.get().getProductStock() - quantity.get(i));
            productsRepository.save(product.get());
        }
    }

}
