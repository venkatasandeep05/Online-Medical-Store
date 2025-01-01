package com.example.Online_medical_store.controller.requestPOJO;

import java.util.ArrayList;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CheckoutRequest {
    
    Long userId;
    Double price;
    String paymentType;
    String deliveryAddress;
    ArrayList<Long> productIds;
    ArrayList<Integer> quantity;
    String emailId;

}
