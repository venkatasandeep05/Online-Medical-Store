package com.example.Online_medical_store.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name ="users")
public class Users {
    //we use private when other person using this class he/she should make getters and setters to acess
    //this class we make this class as an encapsulate.


    @Id
    @GeneratedValue(strategy = javax.persistence.GenerationType.AUTO)
    private long id;
    private String name;
    private String email;
    private String password;
    private String address;
    private String age;
    private String gender;

}
