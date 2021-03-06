package com.vprep.codeprep;


import com.vprep.codeprep.entities.User;
import com.vprep.codeprep.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CodePrepInitializer implements CommandLineRunner {
	   @Autowired
	   private UserService userService;
	     
	public static void main(String[] args) {
		SpringApplication.run(CodePrepInitializer.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		  {
    		  User newAdmin = new User();
			  newAdmin.setUsername("admin_user");
			  newAdmin.setName("admin");
			  newAdmin.setPhone("123456789");
			  newAdmin.setActive(true);
			  newAdmin.setEmail("admin@vprep.in");
			  newAdmin.setPassword("123456");
    		  userService.createAdmin(newAdmin);
    	  }
	}


}
