package com.vprep.codeprep.repositories;

import com.vprep.codeprep.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository  extends JpaRepository<Role, String> {

    Role findByName(String name);
 
}
