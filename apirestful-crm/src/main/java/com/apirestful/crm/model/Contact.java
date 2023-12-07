package com.apirestful.crm.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "contact")
public class Contact {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)

	@JsonProperty("ContactId")
	private int ContactId;

	@JsonProperty("Name")
	private String Name;
	
	@JsonProperty("LastName")
	private String LastName;
	
	@JsonProperty("Email")
	private String Email;	
	
	@JsonProperty("Phone")
	private long Phone;
	
	@JsonProperty("Address")
	private String Address;
	
	@JsonProperty("Image")
	private String Image;
	
	@JsonProperty("Birthday")
	private Date Birthday;
	
	@JsonProperty("JobTitle")
	private String JobTitle;	
	
	@JsonProperty("AccountId")
	private int AccountId;

	// Getters and setters
    public int getContactId() {
        return ContactId;
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

    public long getPhone() {
        return Phone;
    }

    public String getAddress() {
        return Address;
    }

    public String getImage() {
        return Image;
    }
    
    public Date getBirthday() {
        return Birthday;
    }
    
    public String getJobTitle() {
        return JobTitle;
    }
    
    public int getAccountId() {
        return AccountId;
    }
}
