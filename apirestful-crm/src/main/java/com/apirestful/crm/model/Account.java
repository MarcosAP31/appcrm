package com.apirestful.crm.model;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "account")

public class Account {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)

	@JsonProperty("AccountId")
	private int AccountId;

	@JsonProperty("Name")
	private String Name;

	@JsonProperty("Industry")
	private String Industry;
	
	@JsonProperty("Website")
	private String Website;
	
	@JsonProperty("Phone")
	private long Phone;
	
	@JsonProperty("Address")
	private String Address;
	
	// Getters and setters
    public int getAccountId() {
        return AccountId;
    }

    public String getName() {
        return Name;
    }

    public String getIndustry() {
        return Industry;
    }

    public String getWebsite() {
        return Website;
    }

    public long getPhone() {
        return Phone;
    }

    public String getAddress() {
        return Address;
    }
}
