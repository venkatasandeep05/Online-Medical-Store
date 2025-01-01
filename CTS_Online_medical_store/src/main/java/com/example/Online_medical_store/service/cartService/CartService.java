package com.example.Online_medical_store.service.cartService;

import com.example.Online_medical_store.entity.Cart;
import com.example.Online_medical_store.entity.Products;
import com.example.Online_medical_store.repository.CartRepository;
import com.example.Online_medical_store.repository.OrdersRepository;
import com.example.Online_medical_store.repository.ProductsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

@Service
@Transactional
public class CartService {

    @Autowired
    OrdersRepository ordersRepository;

    @Autowired
    ProductsRepository productsRepository;

    @Autowired
    CartRepository cartRepository;

    public List<Cart> addOrderByUserIdAndProductId(long productId, long userId, int quantity) throws Exception {
        try {

            Products product = productsRepository.findById(productId)
                    .orElseThrow(() -> new Exception("Product is not found for id " + productId));
            if (product.getProductStock() < quantity) {
                throw new Exception("Not enough stock for product " + product.getProductName());
            }
            if (cartRepository.findByProductIdAndUserId(productId, userId).isPresent()) {
                Cart cart = cartRepository.findByProductIdAndUserId(productId, userId).get();
                cart.setQuantity(quantity);
                cartRepository.save(cart);
            } else {

                Cart cart = new Cart();
                cart.setProductId(productId);
                cart.setUserId(userId);
                cart.setQuantity(quantity);
                cartRepository.save(cart);
            }
            return getCartByUserId(userId);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public List<Cart> getCartByUserId(long userId) throws Exception {
        try {
            Optional<List<Cart>> cart = cartRepository.findByUserId(userId);
            if (cart.isPresent() && !cart.get().isEmpty())
                return cart.get();
            else
                throw new Exception("Cart is empty");
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public void removeCartByUserIdAndProductId(Long userId, Long productId) throws Exception {
        try {
            cartRepository.deleteByUserIdAndProductId(userId, productId);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public List<Cart> removeAllCartByUserId(long userId) {
        cartRepository.deleteByUserId(userId);
        return null;
    }
}
