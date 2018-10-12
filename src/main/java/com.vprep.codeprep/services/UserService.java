package com.vprep.codeprep.services;


import com.vprep.codeprep.dao.UserDAO;
import com.vprep.codeprep.entities.Role;
import com.vprep.codeprep.entities.User;
import com.vprep.codeprep.repositories.RoleRepository;
import com.vprep.codeprep.repositories.UserRepository;
import com.vprep.codeprep.vo.ProfileVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private UserDAO userDAO;
	
	public void createUser(User user) {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		user.setPassword(encoder.encode(user.getPassword()));
		Role userRole = new Role("USER");
		List<Role> roles = new ArrayList<>();
		roles.add(userRole);
		user.setRoles(roles);
		userRepository.save(user);
	}
	
	public void createAdmin(User user) {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		user.setPassword(encoder.encode(user.getPassword()));
		Role role = roleRepository.findByName("SUPER_ADMIN");
		List<Role> roles = new ArrayList<>();
		if(role != null){
			roles.add(role);
		} else {
			role = new Role();
			role.setName("SUPER_ADMIN");
			roles.add(role);
		}
		user.setRoles(roles);
//		userRepository.save(user);
	}
	
	public User findOne(String email) {
		
	  return userRepository.findByEmail(email);
	}

	public boolean isUserPresent(String email) {
		// TODO Auto-generated method stub
		User u=userRepository.findByEmail(email);
		if(u!=null)
			return true;
		
		return false;
	}

	public List<User> findAll() {
		// TODO Auto-generated method stub
		return userRepository.findAll();
	}

	public ProfileVO getLoggedInProfile(String email){

		return userDAO.fetchUserByEmail(email);
	}

	public ProfileVO saveProfile(MultipartHttpServletRequest request, User user){
		String name = request.getParameter("name");
		String phone = request.getParameter("contact_number");
		String email = request.getParameter("email_id");
		String institute = request.getParameter("institute_name");
		String address = request.getParameter("description");
		String city = request.getParameter("city");
		String country = request.getParameter("country");
		String password = request.getParameter("password");
		String confirmPassword = request.getParameter("confirm_password");

		if(user == null){
			user = new User();
		}
		user.setName(name);
		user.setPhone(phone);
		user.setEmail(email);
		user.setAddress(address);
		user.setCity(city);
		if( password != null && password.length() > 1 && password.equals(confirmPassword)){
			BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
			user.setPassword(encoder.encode(password));
		}
		return userDAO.saveProfile(user);
	}

	/*public List<User> findByName(String name) {
		// TODO Auto-generated method stub
		return  userRepository.findByNameLike("%"+name+"%");
	}*/

}
