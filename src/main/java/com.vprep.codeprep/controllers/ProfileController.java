package com.vprep.codeprep.controllers;


import com.vprep.codeprep.entities.User;
import com.vprep.codeprep.services.UserService;
import com.vprep.codeprep.vo.ProfileVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.security.Principal;

@Controller
public class ProfileController {
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/profile")
	public String showProfilePage(Model model, Principal principal) {
		
		String email = principal.getName();
		ProfileVO profileVO = userService.getLoggedInProfile(email);
		model.addAttribute("profileVO", profileVO);

		
		return "views/profile";
	}

	@PostMapping("/profile/save")
	public String saveProfile(MultipartHttpServletRequest request, Model model, Principal principal) {

		String email = principal.getName();
		User user = userService.findOne(email);
		ProfileVO profileVO = userService.saveProfile(request,user);
		model.addAttribute("profileVO", profileVO);

		return "redirect:/profile";
	}




}
