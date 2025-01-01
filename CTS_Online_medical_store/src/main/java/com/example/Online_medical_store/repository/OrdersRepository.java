package com.example.Online_medical_store.repository;

import com.example.Online_medical_store.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;
// import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrdersRepository extends JpaRepository<Orders,Long> {

    List<Orders> findByUserId(Long userId);
}
