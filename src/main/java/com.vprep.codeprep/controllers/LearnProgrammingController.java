
package com.vprep.codeprep.controllers;
        import com.vprep.codeprep.services.ProblemService;
        import com.vprep.codeprep.services.UserService;
        import com.vprep.codeprep.vo.ProblemVO;
        import com.vprep.codeprep.vo.ProfileVO;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.stereotype.Controller;
        import org.springframework.ui.Model;
        import org.springframework.web.bind.annotation.GetMapping;

        import java.io.IOException;
        import java.security.Principal;
        import java.util.List;

@Controller
public class LearnProgrammingController {


    @Autowired
    private UserService userService;


    @GetMapping("/learnprogramming")
    public String submitProblem(Model model, Principal principal) throws IOException {



        return "views/learnProgramming";
    }
}
