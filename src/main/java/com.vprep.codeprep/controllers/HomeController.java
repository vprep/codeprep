package com.vprep.codeprep.controllers;

import com.vprep.codeprep.services.ProblemService;
import com.vprep.codeprep.vo.ProblemVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.io.IOException;
import java.security.Principal;
import java.util.List;

@Controller
public class HomeController {

    @Autowired
    private ProblemService problemService;

    @GetMapping("/home")
    public String showProfilePage(Model model, Principal principal) throws IOException {

        List<ProblemVO> problemVOList = problemService.getAllProblems();
        model.addAttribute("problemList",problemVOList);

        return "views/home";
    }


}
