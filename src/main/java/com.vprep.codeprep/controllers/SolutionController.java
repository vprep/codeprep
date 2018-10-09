package com.vprep.codeprep.controllers;

import com.vprep.codeprep.entities.User;
import com.vprep.codeprep.services.SolutionService;
import com.vprep.codeprep.services.UserService;
import com.vprep.codeprep.vo.SubmissionVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.security.Principal;
import java.util.List;

@Controller
public class SolutionController {

    @Autowired
    private UserService userService;

    @Autowired
    private SolutionService solutionService;


    @ResponseBody
    @RequestMapping(value = "json/solutions",method = RequestMethod.GET)
    public List<SubmissionVO> getSolutionByUserId(Principal principal) throws IOException {
        String email = principal.getName();
        User user = userService.findOne(email);
        return solutionService.getAllSubmissionByUserId(user.getId());
    }





}
