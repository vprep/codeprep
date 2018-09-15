package com.vprep.codeprep.service;

import com.vprep.codeprep.domain.User;
import com.vprep.codeprep.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {


    @Autowired
    private UserRepository userRepository;



    public User createUser(User user){

        return userRepository.save(user);
    }

    public List<User> getUserList(){
        return userRepository.findAll();
    }


    public User getUserById(Long id){
        return userRepository.findById(id).get();
    }

    public void deleteUserById(Long id){
        userRepository.deleteById(id);
    }
}
