package com.apirestful.crm.model;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "account")

public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)

	@JsonProperty("UserId")
	private int UserId;

	@JsonProperty("Name")
	private String Name;
	
	@JsonProperty("LastName")
	private String LastName;
	
	@JsonProperty("Email")
	private String Email;
	
	@JsonProperty("UserName")
	private String UserName;
	
	@JsonProperty("Password")
	private String Password;
	
	@JsonProperty("Role")
	private String Role;
	
	@JsonProperty("Image")
	private String Image;
	
	// Getters and setters
    public int getUserId() {
        return UserId;
    }

    public String getName() {
        return Name;
    }

    public String getLastName() {
        return LastName;
    }

    public String getEmail() {
        return Email;
    }

    public String getUserName() {
        return UserName;
    }

    public String getPassword() {
        return Password;
    }
    
    public String getRole() {
        return Role;
    }
    
    public String getImage() {
        return Image;
    }
}
