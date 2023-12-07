package com.apirestful.crm.model;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "note")

public class Note {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)

	@JsonProperty("NoteId")
	private int NoteId;
	
	@JsonProperty("ContactId")
	private int ContactId;

	@JsonProperty("AccountId")
	private int AccountId;
	
	@JsonProperty("OpportunityId")
	private int OpportunityId;
	
	@JsonProperty("UserId")
	private int UserId;

	@JsonProperty("DateTime")
	private Date DateTime;
	
	@JsonProperty("Content")
	private String Content;
	
	// Getters and setters
    public int getNoteId() {
        return NoteId;
    }

    public int getContactId() {
        return ContactId;
    }

    public int getAccountId() {
        return AccountId;
    }

    public int getOpportunityId() {
        return OpportunityId;
    }

    public int getUserId() {
        return UserId;
    }

    public Date getDateTime() {
        return DateTime;
    }
    
    public String getContent() {
        return Content;
    }
}
