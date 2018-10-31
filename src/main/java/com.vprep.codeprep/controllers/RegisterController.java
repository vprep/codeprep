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

	/*@GetMapping("/register")
	public String registerForm(Model model) {

		model.addAttribute("user", new User());
		return "views/registerForm";
	}*/
	


	@RequestMapping(value = "/register",method = RequestMethod.GET)
    public String registerUser(@RequestParam String userName, @RequestParam String email, @RequestParam String password) {
		UserVO userVO = new UserVO();
		userVO.setUserName(userName);
		userVO.setEmail(email);
		userVO.setPassword(password);


		userService.createUser(userVO);
		return "redirect:/home";

	}


	@ResponseBody
	@PutMapping("/test")
	public String testMethod(){
		return "testing api";
	}




}
