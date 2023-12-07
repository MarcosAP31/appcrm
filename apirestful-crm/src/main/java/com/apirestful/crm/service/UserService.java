package com.apirestful.crm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.apirestful.crm.model.User;
import com.apirestful.crm.repository.UserRepository;

import java.util.List;

@Service
public class UserService {
	private final UserRepository userRepository;

	@Autowired
	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	public User getUserById(int id) {
        return userRepository.findById(id).orElse(null);
    }
	
	public User createUser(User user) {
		return userRepository.save(user);
	}

	public User updateUser(int id, User user) {
		// Implement update logic based on your requirements
		// ...
		return userRepository.save(user);
	}

	public void deleteUser(int id) {
		userRepository.deleteById(id);
	}
}
