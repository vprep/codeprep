package com.vprep.codeprep.dao;

import com.vprep.codeprep.converter.DomainToVOConverter;
import com.vprep.codeprep.entities.User;
import com.vprep.codeprep.repositories.UserRepository;
import com.vprep.codeprep.vo.ProfileVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserDAO {

    @Autowired
    private UserRepository userRepository;


    public ProfileVO fetchUserByEmail(String email){
        return DomainToVOConverter.convertUserProfile(userRepository.findByEmail(email));
    }

    public ProfileVO saveProfile(User user){
        return DomainToVOConverter.convertUserProfile(userRepository.save(user));
    }
}
