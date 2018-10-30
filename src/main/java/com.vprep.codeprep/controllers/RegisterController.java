package com.vprep.codeprep.controllers;

import com.vprep.codeprep.entities.User;
import com.vprep.codeprep.services.UserService;
import com.vprep.codeprep.vo.UserVO;
import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Controller
public class RegisterController {

	@Autowired
	private UserService userService;

	@GetMapping("/register")
	public String registerForm(Model model) {

		model.addAttribute("user", new User());
		return "views/registerForm";
	}
	

	@ResponseBody
	@RequestMapping(value = "/register",method = RequestMethod.POST,consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public User registerUser(@RequestBody UserVO userVO, HttpServletRequest request, Model model) {


		return userService.createUser(userVO);

	}


	@ResponseBody
	@PutMapping("/test")
	public String testMethod(){
		return "testing api";
	}


}
