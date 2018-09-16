package com.vprep.codeprep.controllers;

import com.vprep.codeprep.entities.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.Principal;

@Controller
public class HackathonController {


    @GetMapping("/hackathon")
    public String showProfilePage(Model model, Principal principal) {


        return "views/hackathon";
    }
}
