package com.apirestful.crm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.apirestful.crm.model.Activity;
import com.apirestful.crm.service.ActivityService;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
//@CrossOrigin(origins = "http://localhost:3000") // Replace with your Vue.js app's origin
public class ActivityController {
	@Autowired
	private final ActivityService activityService;

	@Autowired
	public ActivityController(ActivityService activityService) {
		this.activityService = activityService;
	}

	@GetMapping
	@ResponseBody
	public ResponseEntity<List<Activity>> getAllActivitys() {
		List<Activity> activities = activityService.getAllActivitys();
		// Log the activities here
	    System.out.println("Retrieved activities: " + activities);
		return new ResponseEntity<>(activities, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	@ResponseBody
	public ResponseEntity<Activity> getActivityById(@PathVariable int id) {
	    Activity activity = activityService.getActivityById(id);

	    if (activity != null) {
	        // Log the activity here
	        System.out.println("Retrieved activity by ID " + id + ": " + activity);
	        return new ResponseEntity<>(activity, HttpStatus.OK);
	    } else {
	        // Log that the activity with the given ID was not found
	        System.out.println("Activity with ID " + id + " not found");
	        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }
	}
	
	@PostMapping
	public ResponseEntity<Activity> createActivity(@RequestBody Activity activity) {
		Activity createdActivity = activityService.createActivity(activity);
		return new ResponseEntity<>(createdActivity, HttpStatus.CREATED);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Activity> updateActivity(@PathVariable int id, @RequestBody Activity activity) {
		Activity updatedActivity = activityService.updateActivity(id, activity);
		return new ResponseEntity<>(updatedActivity, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteActivity(@PathVariable int id) {
		activityService.deleteActivity(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
