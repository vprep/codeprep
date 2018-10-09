package com.vprep.codeprep;


import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.vprep.codeprep.entities.User;
import com.vprep.codeprep.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

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
    		  User newAdmin = new User("admin_user","admin","codeprep","123456789",true,"admin@mail.com", "123456");
    		  userService.createAdmin(newAdmin);
    	  }
	}


}
