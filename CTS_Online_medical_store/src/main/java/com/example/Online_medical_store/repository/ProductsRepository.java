package com.example.Online_medical_store.repository;

import com.example.Online_medical_store.entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


//we use only wrapper classes in JPA repository
//why we use wrapper class data type in JPA means only to use that data type to restrict other datatypes.
//why repository :repository internally it loads all crud operations [Extra information:and pagenation and
// sorting also  we can use while we using frontend using jsp]
@Repository
public interface ProductsRepository extends JpaRepository<Products,Long> {

//    @Query("Select pro FROM Products pro WHERE pro.category_id=:cat_id")
//    List<Products> getByCategoryId(@Param("cat_id")String cat_id);
        Optional<List<Products>> findByProductNameIgnoreCaseContaining(String name);
}
