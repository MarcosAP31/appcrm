package com.apirestful.crm.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "activity")

public class Activity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)

	@JsonProperty("ActivityId")
	private int ActivityId;

	@JsonProperty("ContactId")
	private int ContactId;

	@JsonProperty("AccountId")
	private int AccountId;

	@JsonProperty("OpportunityId")
	private int OpportunityId;

	@JsonProperty("Type")
	private String Type;

	@JsonProperty("DateTime")
	private Date DateTime;

	@JsonProperty("Duration")
	private String Duration;

	@JsonProperty("Description")
	private String Description;

	// Getters and setters
	public int getActivityId() {
		return ActivityId;
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

	public String getType() {
		return Type;
	}

	public Date getDateTime() {
		return DateTime;
	}

	public String getDuration() {
		return Duration;
	}

	public String getDescription() {
		return Duration;
	}
}
