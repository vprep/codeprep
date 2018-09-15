package com.vprep.codeprep.controller;

import com.vprep.codeprep.domain.User;
import com.vprep.codeprep.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Controller
@RequestMapping("/codeprep")
public class CodePrepController {


    @Autowired
    private UserService userService;

    @ResponseBody
    @RequestMapping(value = "/health", method = RequestMethod.GET)
    public String checkHealth() {
        return "server is up";
    }


    @ResponseBody
    @RequestMapping(value = "/user/create", method = RequestMethod.POST)
    public User createUser(@Valid @RequestBody User user) {
        return userService.createUser(user);
    }


    @ResponseBody
    @RequestMapping(value = "/user/list", method = RequestMethod.GET)
    public List<User> getUserList() {
        return userService.getUserList();
    }


    @ResponseBody
    @RequestMapping(value = "/user/{id}", method = RequestMethod.GET)
    public User getUserById(@PathVariable long id) {
        return userService.getUserById(id);
    }

    @ResponseBody
    @RequestMapping(value = "/user/delete/{id}", method = RequestMethod.GET)
    public void deleteUserById(@PathVariable long id) {
         userService.deleteUserById(id);
    }












}
