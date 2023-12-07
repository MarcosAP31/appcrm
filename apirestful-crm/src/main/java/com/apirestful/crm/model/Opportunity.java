package com.apirestful.crm.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "opportunity")
public class Opportunity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)

	@JsonProperty("OpportunityId")
	private int OpportunityId;

	@JsonProperty("AccountId")
	private int AccountId;
	
	@JsonProperty("ContactId")
	private int ContactId;
	
	@JsonProperty("Name")
	private String Name;
	
	@JsonProperty("Description")
	private String Description;
	
	@JsonProperty("Status")
	private String Status;
	
	@JsonProperty("CloseDate")
	private Date CloseDate;
	
	@JsonProperty("Amount")
	private int Amount;

	@JsonProperty("Probability")
	private float Probability;
	
	// Getters and setters
    public int getOpportunityId() {
        return OpportunityId;
    }

    public int getAccountId() {
        return AccountId;
    }

    public int getContactId() {
        return ContactId;
    }

    public String getName() {
        return Name;
    }

    public String getDescription() {
        return Description;
    }

    public String getStatus() {
        return Status;
    }

    public Date getCloseDate() {
        return CloseDate;
    }
    
    public int getAmount() {
        return Amount;
    }
    
    public float getProbability() {
        return Probability;
    }
}
