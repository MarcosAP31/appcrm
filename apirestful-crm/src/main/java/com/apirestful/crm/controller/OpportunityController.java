package com.apirestful.crm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.apirestful.crm.model.Opportunity;
import com.apirestful.crm.service.OpportunityService;

import java.util.List;

@RestController
@RequestMapping("/api/opportunitys")
//@CrossOrigin(origins = "http://localhost:3000") // Replace with your Vue.js app's origin
public class OpportunityController {
	@Autowired
	private final OpportunityService opportunityService;

	@Autowired
	public OpportunityController(OpportunityService opportunityService) {
		this.opportunityService = opportunityService;
	}

	@GetMapping
	@ResponseBody
	public ResponseEntity<List<Opportunity>> getAllOpportunitys() {
		List<Opportunity> opportunitys = opportunityService.getAllOpportunitys();
		// Log the opportunitys here
	    System.out.println("Retrieved opportunitys: " + opportunitys);
		return new ResponseEntity<>(opportunitys, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	@ResponseBody
	public ResponseEntity<Opportunity> getOpportunityById(@PathVariable int id) {
	    Opportunity opportunity = opportunityService.getOpportunityById(id);

	    if (opportunity != null) {
	        // Log the opportunity here
	        System.out.println("Retrieved opportunity by ID " + id + ": " + opportunity);
	        return new ResponseEntity<>(opportunity, HttpStatus.OK);
	    } else {
	        // Log that the opportunity with the given ID was not found
	        System.out.println("Opportunity with ID " + id + " not found");
	        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }
	}
	
	@PostMapping
	public ResponseEntity<Opportunity> createOpportunity(@RequestBody Opportunity opportunity) {
		Opportunity createdOpportunity = opportunityService.createOpportunity(opportunity);
		return new ResponseEntity<>(createdOpportunity, HttpStatus.CREATED);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Opportunity> updateOpportunity(@PathVariable int id, @RequestBody Opportunity opportunity) {
		Opportunity updatedOpportunity = opportunityService.updateOpportunity(id, opportunity);
		return new ResponseEntity<>(updatedOpportunity, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteOpportunity(@PathVariable int id) {
		opportunityService.deleteOpportunity(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
