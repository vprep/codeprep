package com.vprep.codeprep.controllers;

import com.vprep.codeprep.services.ProblemService;
import com.vprep.codeprep.services.UserService;
import com.vprep.codeprep.vo.ProblemVO;
import com.vprep.codeprep.vo.ProfileVO;
import com.vprep.codeprep.vo.SubmissionVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.Principal;
import java.util.List;

@Controller
public class ProblemController {


    @Autowired
    private ProblemService problemService;

    @Autowired
    private UserService userService;


    @RequestMapping(value = "problem",method = RequestMethod.GET)
    public String getProblemById(Model model, @RequestParam Long id, Principal principal) throws IOException {
        String email = principal.getName();
        ProfileVO profileVO = userService.getLoggedInProfile(email);
        model.addAttribute("profileVO", profileVO);
        model.addAttribute("problem", problemService.getProblemById(id));
        model.addAttribute("submissionList",problemService.getAllSubmissionByUserId(1l));
        return "views/hackathon";
    }


    @ResponseBody
    @RequestMapping(value = "problems",method = RequestMethod.GET)
    public List<ProblemVO> getAllProblems() throws IOException {
        return problemService.getAllProblems();
    }


    @ResponseBody
    @RequestMapping(value = "read",method = RequestMethod.GET)
    public String readS3File() throws IOException {
        return problemService.readS3File();
    }

    @ResponseBody
    @RequestMapping(value = "solution",method = RequestMethod.GET)
    public SubmissionVO getSolutionById(@RequestParam Long id) throws IOException {
        return problemService.getSubmissionbyId(id);
    }








}
