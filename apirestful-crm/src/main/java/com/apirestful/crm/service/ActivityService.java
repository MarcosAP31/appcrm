package com.apirestful.crm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.apirestful.crm.model.Activity;
import com.apirestful.crm.repository.ActivityRepository;

import java.util.List;

@Service
public class ActivityService {
	private final ActivityRepository activityRepository;

	@Autowired
	public ActivityService(ActivityRepository activityRepository) {
		this.activityRepository = activityRepository;
	}

	public List<Activity> getAllActivitys() {
		return activityRepository.findAll();
	}

	public Activity getActivityById(int id) {
        return activityRepository.findById(id).orElse(null);
    }
	
	public Activity createActivity(Activity activity) {
		return activityRepository.save(activity);
	}

	public Activity updateActivity(int id, Activity activity) {
		// Implement update logic based on your requirements
		// ...
		return activityRepository.save(activity);
	}

	public void deleteActivity(int id) {
		activityRepository.deleteById(id);
	}
}
