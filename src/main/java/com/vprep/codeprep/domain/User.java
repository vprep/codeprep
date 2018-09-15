package com.vprep.codeprep.domain;

import javax.persistence.*;

@Entity
@Table(name = "user")
@SequenceGenerator(name = "user_id", sequenceName = "user_id_sequence", initialValue = 10, allocationSize = 1)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_id")
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    private String firstName;

    private String lastName;

    @Column(nullable = false, unique = true, name = "username")
    private String email;

    @Column(nullable = true)
    private String phoneNumber;

    private String password;

    @Column(columnDefinition = "boolean default false", name = "enabled")
    private boolean isActive;


    public Long getId() {
        return id;
    }

    public User setId(Long id) {
        this.id = id;
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

    public String getEmail() {
        return email;
    }

    public User setEmail(String email) {
        this.email = email;
        return this;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public User setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public User setPassword(String password) {
        this.password = password;
        return this;
    }

    public boolean isActive() {
        return isActive;
    }

    public User setActive(boolean active) {
        isActive = active;
        return this;
    }
}
