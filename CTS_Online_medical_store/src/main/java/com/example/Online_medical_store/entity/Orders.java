package com.example.Online_medical_store.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "orders")
public class Orders {

    //to generate random value to order_id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String emailId;
    //**each order is associated with one product so we are using one-one mapping
    //**Student as only one college (like CMREC not like CMRECET,CMRTC right)
    //one to many (one college cmrec is having many students)
    //many to one(numbers of students in one department)
    //many to many(customers can purchase various products,and products can be purchased by many customers)
    //in product class primary key of product_id and in Orders class primary key of order_id
    //will create a relationship of one-one and it will be name as product_ids.
    private ArrayList<Long> productIds;
    private ArrayList<Integer> quantity;
    private long userId;
    private String paymentType;
    private String deliveryAddress;
    private double price;
    private Date createdAt;
}
