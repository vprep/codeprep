package com.vprep.codeprep.entities;

import com.vprep.codeprep.entities.common.CommonDataEntity;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "user")
@SequenceGenerator(name = "user_id", sequenceName = "user_id_sequence", initialValue = 10, allocationSize = 1)
public class User extends CommonDataEntity {


	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "user_id")
	@Column(name = "id", nullable = false, updatable = false)
	private Long id;
	private String username;
	private String phone;

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


	private Integer paymentType;

	private Date paymentTypeDate;

	private String oathProvider;

	private String oauthUid;

	private String name;

	private String rollNo;

	private String yearOfAdm;

	private String branch;

	@Column(name = "`group`")
	private String group;

	private String subGroup;

	private String address;

	private String city;

	private Integer engineeringCollegeId;

	private String state;

	private String zip;

	private String gender;

	private Date dob;

	private String image;

	private Integer userType;

	private String isTutor;

	public String getAddress() {
		return address;
	}

	public User setAddress(String address) {
		this.address = address;
		return this;
	}

	public String getCity() {
		return city;
	}

	public User setCity(String city) {
		this.city = city;
		return this;
	}

	public Integer getEngineeringCollegeId() {
		return engineeringCollegeId;
	}

	public User setEngineeringCollegeId(Integer engineeringCollegeId) {
		this.engineeringCollegeId = engineeringCollegeId;
		return this;
	}

	public String getState() {
		return state;
	}

	public User setState(String state) {
		this.state = state;
		return this;
	}

	public String getZip() {
		return zip;
	}

	public User setZip(String zip) {
		this.zip = zip;
		return this;
	}

	public String getGender() {
		return gender;
	}

	public User setGender(String gender) {
		this.gender = gender;
		return this;
	}

	public Date getDob() {
		return dob;
	}

	public User setDob(Date dob) {
		this.dob = dob;
		return this;
	}

	public String getImage() {
		return image;
	}

	public User setImage(String image) {
		this.image = image;
		return this;
	}

	public Integer getUserType() {
		return userType;
	}

	public User setUserType(Integer userType) {
		this.userType = userType;
		return this;
	}

	public String getIsTutor() {
		return isTutor;
	}

	public User setIsTutor(String isTutor) {
		this.isTutor = isTutor;
		return this;
	}

	public Integer getPaymentType() {
		return paymentType;
	}

	public User setPaymentType(Integer paymentType) {
		this.paymentType = paymentType;
		return this;
	}

	public Date getPaymentTypeDate() {
		return paymentTypeDate;
	}

	public User setPaymentTypeDate(Date paymentTypeDate) {
		this.paymentTypeDate = paymentTypeDate;
		return this;
	}

	public String getOathProvider() {
		return oathProvider;
	}

	public User setOathProvider(String oathProvider) {
		this.oathProvider = oathProvider;
		return this;
	}

	public String getOauthUid() {
		return oauthUid;
	}

	public User setOauthUid(String oauthUid) {
		this.oauthUid = oauthUid;
		return this;
	}

	public String getName() {
		return name;
	}

	public User setName(String name) {
		this.name = name;
		return this;
	}

	public String getRollNo() {
		return rollNo;
	}

	public User setRollNo(String rollNo) {
		this.rollNo = rollNo;
		return this;
	}

	public String getYearOfAdm() {
		return yearOfAdm;
	}

	public User setYearOfAdm(String yearOfAdm) {
		this.yearOfAdm = yearOfAdm;
		return this;
	}

	public String getBranch() {
		return branch;
	}

	public User setBranch(String branch) {
		this.branch = branch;
		return this;
	}

	public String getGroup() {
		return group;
	}

	public User setGroup(String group) {
		this.group = group;
		return this;
	}

	public String getSubGroup() {
		return subGroup;
	}

	public User setSubGroup(String subGroup) {
		this.subGroup = subGroup;
		return this;
	}

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

	public String getUsername() {
		return username;
	}

	public User setUsername(String username) {
		this.username = username;
		return this;
	}


	public String getPhone() {
		return phone;
	}

	public User setPhone(String phone) {
		this.phone = phone;
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


	public User(String username, String phone, boolean isActive, String email, String password, List<Role> roles, Integer paymentType, Date paymentTypeDate, String oathProvider, String oauthUid, String name, String rollNo, String yearOfAdm, String branch, String group, String subGroup) {
		this.username = username;
		this.phone = phone;
		this.isActive = isActive;
		this.email = email;
		this.password = password;
		this.roles = roles;
		this.paymentType = paymentType;
		this.paymentTypeDate = paymentTypeDate;
		this.oathProvider = oathProvider;
		this.oauthUid = oauthUid;
		this.name = name;
		this.rollNo = rollNo;
		this.yearOfAdm = yearOfAdm;
		this.branch = branch;
		this.group = group;
		this.subGroup = subGroup;
	}

	public User() {

	}

}
