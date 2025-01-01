package com.example.Online_medical_store.controller;

import com.example.Online_medical_store.entity.Users;
import com.example.Online_medical_store.service.usersService.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequestMapping("api/signup")
public class SignUpController {

    @Autowired
    UserService userService;

    @RequestMapping("user")
    public ResponseEntity<?> userLogin(@RequestBody HashMap<String, String> signup) {
        try {
            Users user = userService.signUpUser(signup);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
