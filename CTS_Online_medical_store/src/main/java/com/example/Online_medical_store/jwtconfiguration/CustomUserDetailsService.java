package com.example.Online_medical_store.jwtconfiguration;

import com.example.Online_medical_store.entity.Users;
import com.example.Online_medical_store.service.usersService.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;


@Service
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	UserService userService;
    private static final Logger logger = LoggerFactory.getLogger(CustomUserDetailsService.class);
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {
    	try {
            Users user = userService.findByEmail(email);
            return UserPrincipal.create(user);
    	}catch(Exception e) {
	   		throw new UsernameNotFoundException("User not found with Mobile : " + email);
	   	}
    }

    // This method is used by JWTAuthenticationFilter
    @Transactional
    public UserDetails loadUserById(Long id) {
    	try {
   		 Users user = userService.getUserDetailsById(id);
   	        return UserPrincipal.create(user);
	   	}catch(Exception e) {
	   		throw new UsernameNotFoundException("User not found with id : " + id);
	   	}   
        //return UserPrincipal.create(user);
    }
   
//	@Override
//	public UserDetails loadUserByUsername(String mobile) throws UsernameNotFoundException {
//		// TODO Auto-generated method stub
//		return null;
//	}

}
