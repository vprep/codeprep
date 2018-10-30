package com.vprep.codeprep.converter;

import com.vprep.codeprep.entities.Role;
import com.vprep.codeprep.entities.User;
import com.vprep.codeprep.vo.UserVO;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;
import java.util.List;

public class VOToDomainConverter {

    public static User convertUserVO(UserVO userVO){

        User user = new User();
        user.setUsername(userVO.getUserName());
        user.setEmail(userVO.getEmail());
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        user.setPassword(encoder.encode(userVO.getPassword()));
        return user;


    }
}
