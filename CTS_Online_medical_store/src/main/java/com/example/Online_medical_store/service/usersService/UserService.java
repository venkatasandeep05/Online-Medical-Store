package com.example.Online_medical_store.service.usersService;

import com.example.Online_medical_store.entity.Users;
import com.example.Online_medical_store.exceptions.UserNotFoundException;
import com.example.Online_medical_store.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UserService {

    @Autowired
    private UsersRepository usersRepository;

    // public List<Users> findAll(){
    // return usersRepository.findAll();
    // }

    public Users findByEmail(String email) {
        return usersRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("user is not found for email " + email));
    }

    public Users getUserDetailsById(long user_id) throws Exception {
        return usersRepository.findById(user_id)
                .orElseThrow(() -> new UserNotFoundException("User is not found for id " + user_id));
    }

    public Users signUpUser(Map<String, String> signup) throws Exception {
        try {
            if (usersRepository.findByEmail(signup.get("email")).isPresent()) {
                throw new Exception("User Already Exists with this EmailId");
            }

            Users users = new Users();
            users.setName(signup.get("name"));
            users.setEmail(signup.get("email"));
            users.setPassword(signup.get("password"));
            users.setAddress(signup.get("address"));
            users.setAge(signup.get("age"));
            users.setGender(signup.get("gender"));
            return usersRepository.save(users);

        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }
}
