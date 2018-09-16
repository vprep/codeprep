package com.vprep.codeprep.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.Principal;

@Controller
public class LeaderboardController {

    @GetMapping("/leaderboard")
    public String showProfilePage(Model model, Principal principal) {


        return "views/leaderboard";
    }
}
