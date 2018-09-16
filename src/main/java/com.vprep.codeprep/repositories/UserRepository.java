package com.vprep.codeprep.repositories;

import com.vprep.codeprep.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository  extends JpaRepository<User, String> {

	List<User> findByNameLike(String name);

	User findByEmail(String email);

}
