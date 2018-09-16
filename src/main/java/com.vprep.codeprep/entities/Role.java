package com.vprep.codeprep.entities;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "role")
@SequenceGenerator(name = "role_id", sequenceName = "role_id_sequence", initialValue = 10, allocationSize = 1)
public class Role {

	@Id
	private String name;
	@ManyToMany(mappedBy = "roles")
	private List<User> users;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	public Role(String name, List<User> users) {
		this.name = name;
		this.users = users;
	}

	public Role() {
	}

	public Role(String name) {
		this.name = name;
	}

}
