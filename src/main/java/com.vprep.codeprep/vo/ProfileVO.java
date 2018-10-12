package com.vprep.codeprep.vo;

import com.vprep.codeprep.entities.Role;

import java.util.Date;
import java.util.List;

public class ProfileVO {

    private Long id;
    private String username;
    private String phone;
    private boolean isActive;
    private String email;
    private String password;
    private List<Role> roles;
    private Integer paymentType;
    private Date paymentTypeDate;
    private String oathProvider;
    private String oauthUid;
    private String name;
    private String rollNo;
    private String yearOfAdm;
    private String branch;
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

    public Long getId() {
        return id;
    }

    public ProfileVO setId(Long id) {
        this.id = id;
        return this;
    }

    public String getUsername() {
        return username;
    }

    public ProfileVO setUsername(String username) {
        this.username = username;
        return this;
    }

    public String getPhone() {
        return phone;
    }

    public ProfileVO setPhone(String phone) {
        this.phone = phone;
        return this;
    }

    public boolean isActive() {
        return isActive;
    }

    public ProfileVO setActive(boolean active) {
        isActive = active;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public ProfileVO setEmail(String email) {
        this.email = email;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public ProfileVO setPassword(String password) {
        this.password = password;
        return this;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public ProfileVO setRoles(List<Role> roles) {
        this.roles = roles;
        return this;
    }

    public Integer getPaymentType() {
        return paymentType;
    }

    public ProfileVO setPaymentType(Integer paymentType) {
        this.paymentType = paymentType;
        return this;
    }

    public Date getPaymentTypeDate() {
        return paymentTypeDate;
    }

    public ProfileVO setPaymentTypeDate(Date paymentTypeDate) {
        this.paymentTypeDate = paymentTypeDate;
        return this;
    }

    public String getOathProvider() {
        return oathProvider;
    }

    public ProfileVO setOathProvider(String oathProvider) {
        this.oathProvider = oathProvider;
        return this;
    }

    public String getOauthUid() {
        return oauthUid;
    }

    public ProfileVO setOauthUid(String oauthUid) {
        this.oauthUid = oauthUid;
        return this;
    }

    public String getName() {
        return name;
    }

    public ProfileVO setName(String name) {
        this.name = name;
        return this;
    }

    public String getRollNo() {
        return rollNo;
    }

    public ProfileVO setRollNo(String rollNo) {
        this.rollNo = rollNo;
        return this;
    }

    public String getYearOfAdm() {
        return yearOfAdm;
    }

    public ProfileVO setYearOfAdm(String yearOfAdm) {
        this.yearOfAdm = yearOfAdm;
        return this;
    }

    public String getBranch() {
        return branch;
    }

    public ProfileVO setBranch(String branch) {
        this.branch = branch;
        return this;
    }

    public String getGroup() {
        return group;
    }

    public ProfileVO setGroup(String group) {
        this.group = group;
        return this;
    }

    public String getSubGroup() {
        return subGroup;
    }

    public ProfileVO setSubGroup(String subGroup) {
        this.subGroup = subGroup;
        return this;
    }

    public String getAddress() {
        return address;
    }

    public ProfileVO setAddress(String address) {
        this.address = address;
        return this;
    }

    public String getCity() {
        return city;
    }

    public ProfileVO setCity(String city) {
        this.city = city;
        return this;
    }

    public Integer getEngineeringCollegeId() {
        return engineeringCollegeId;
    }

    public ProfileVO setEngineeringCollegeId(Integer engineeringCollegeId) {
        this.engineeringCollegeId = engineeringCollegeId;
        return this;
    }

    public String getState() {
        return state;
    }

    public ProfileVO setState(String state) {
        this.state = state;
        return this;
    }

    public String getZip() {
        return zip;
    }

    public ProfileVO setZip(String zip) {
        this.zip = zip;
        return this;
    }

    public String getGender() {
        return gender;
    }

    public ProfileVO setGender(String gender) {
        this.gender = gender;
        return this;
    }

    public Date getDob() {
        return dob;
    }

    public ProfileVO setDob(Date dob) {
        this.dob = dob;
        return this;
    }

    public String getImage() {
        return image;
    }

    public ProfileVO setImage(String image) {
        this.image = image;
        return this;
    }

    public Integer getUserType() {
        return userType;
    }

    public ProfileVO setUserType(Integer userType) {
        this.userType = userType;
        return this;
    }

    public String getIsTutor() {
        return isTutor;
    }

    public ProfileVO setIsTutor(String isTutor) {
        this.isTutor = isTutor;
        return this;
    }
}
