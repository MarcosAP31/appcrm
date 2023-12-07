package com.apirestful.crm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.apirestful.crm.model.Opportunity;
import com.apirestful.crm.repository.OpportunityRepository;

import java.util.List;

@Service
public class OpportunityService {
	private final OpportunityRepository opportunityRepository;

	@Autowired
	public OpportunityService(OpportunityRepository opportunityRepository) {
		this.opportunityRepository = opportunityRepository;
	}

	public List<Opportunity> getAllOpportunitys() {
		return opportunityRepository.findAll();
	}

	public Opportunity getOpportunityById(int id) {
        return opportunityRepository.findById(id).orElse(null);
    }
	
	public Opportunity createOpportunity(Opportunity opportunity) {
		return opportunityRepository.save(opportunity);
	}

	public Opportunity updateOpportunity(int id, Opportunity opportunity) {
		// Implement update logic based on your requirements
		// ...
		return opportunityRepository.save(opportunity);
	}

	public void deleteOpportunity(int id) {
		opportunityRepository.deleteById(id);
	}
}
