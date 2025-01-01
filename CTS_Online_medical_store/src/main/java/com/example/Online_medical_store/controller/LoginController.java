package com.example.Online_medical_store.controller;

import com.example.Online_medical_store.controller.requestPOJO.LoginRequest;
import com.example.Online_medical_store.entity.Users;
import com.example.Online_medical_store.jwtconfiguration.AuthManager;
import com.example.Online_medical_store.jwtconfiguration.JwtTokenProvider;
import com.example.Online_medical_store.jwtconfiguration.UserPrincipal;
import com.example.Online_medical_store.service.usersService.UserService;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@Slf4j
@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    UserDetailsService userDetailsService;

    @Autowired
    UserService userService;

    @Autowired
    AuthManager authManager;

    @Autowired
    JwtTokenProvider tokenProvider;

    @RequestMapping("status")//post and get
    public ResponseEntity<?> serverStatus() {
        return new ResponseEntity<>("Server is running.", HttpStatus.OK);
    }
    @RequestMapping("login/user")//post and get
    public ResponseEntity<?> userLogin(@RequestBody LoginRequest loginRequest) {

        try {
            Authentication authentication =  authManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()) ,loginRequest);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = tokenProvider.generateToken(authentication);
            JSONObject obj =  this.getUserResponse(token);
            if(obj == null) {
                throw new Exception("Error while generating Reponse");
            }

            return new ResponseEntity<String>(obj.toString(), HttpStatus.OK);
        }catch(Exception e ) {
            log.info("Error in authenticateUser ",e);
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
    private JSONObject getUserResponse(String token) {

        try {
            Users user = userService.getUserDetailsById(_getUserId());
            HashMap<String,String> response = new HashMap<String,String>();
            response.put("id", ""+_getUserId());
            response.put("email", user.getEmail());
            response.put("name", user.getName());
            response.put("address", user.getAddress());


            JSONObject obj = new JSONObject();

            obj.put("user_profile_details",response);
            obj.put("token", token);
            return obj;
        } catch (Exception e) {
            log.info("Error in getUserResponse ",e);
        }
        return null;
    }

    private long _getUserId() {
        log.info("user id vaildating. "+ SecurityContextHolder.getContext().getAuthentication());
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        log.info("(LoginController)user id is "+userPrincipal.getId());
        return userPrincipal.getId();
    }
}
