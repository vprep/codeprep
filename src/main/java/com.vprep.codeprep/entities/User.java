package com.vprep.codeprep.entities;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
@Table(name = "user")
@SequenceGenerator(name = "user_id", sequenceName = "user_id_sequence", initialValue = 10, allocationSize = 1)
public class User {


	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "user_id")
	@Column(name = "id", nullable = false, updatable = false)
	private Long id;
	private String userName;
	private String firstName;
	private String lastName;
	private String phoneNumber;

	@Column(columnDefinition = "boolean default false", name = "enabled")
	private boolean isActive;

	@Email
	@NotEmpty
	@Column(unique = true)
	private String email;

	@Size(min = 4)
	private String password;

	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinTable(name = "USER_ROLES", joinColumns={
			@JoinColumn(name = "USER_ID", referencedColumnName = "id") }, inverseJoinColumns = {
			@JoinColumn(name = "ROLE_NAME", referencedColumnName = "name") })
	private List<Role> roles;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Long getId() {
		return id;
	}

	public User setId(Long id) {
		this.id = id;
		return this;
	}

	public String getUserName() {
		return userName;
	}

	public User setUserName(String userName) {
		this.userName = userName;
		return this;
	}

	public String getFirstName() {
		return firstName;
	}

	public User setFirstName(String firstName) {
		this.firstName = firstName;
		return this;
	}

	public String getLastName() {
		return lastName;
	}

	public User setLastName(String lastName) {
		this.lastName = lastName;
		return this;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public User setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
		return this;
	}

	public boolean isActive() {
		return isActive;
	}

	public User setActive(boolean active) {
		isActive = active;
		return this;
	}

	public List<Role> getRoles() {
		return roles;
	}

	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}

	public User(String userName, String firstName, String lastName, String phoneNumber, boolean isActive, String email, String password) {
		this.userName = userName;
		this.firstName = firstName;
		this.lastName = lastName;
		this.phoneNumber = phoneNumber;
		this.isActive = isActive;
		this.email = email;
		this.password = password;
	}

	public User() {

	}

}
