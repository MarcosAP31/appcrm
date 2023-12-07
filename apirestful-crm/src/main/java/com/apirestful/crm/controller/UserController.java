package com.apirestful.crm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.apirestful.crm.model.User;
import com.apirestful.crm.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/users")
//@CrossOrigin(origins = "http://localhost:3000") // Replace with your Vue.js app's origin
public class UserController {
	@Autowired
	private final UserService userService;

	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}

	@GetMapping
	@ResponseBody
	public ResponseEntity<List<User>> getAllUsers() {
		List<User> users = userService.getAllUsers();
		// Log the users here
	    System.out.println("Retrieved users: " + users);
		return new ResponseEntity<>(users, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	@ResponseBody
	public ResponseEntity<User> getUserById(@PathVariable int id) {
	    User user = userService.getUserById(id);

	    if (user != null) {
	        // Log the user here
	        System.out.println("Retrieved user by ID " + id + ": " + user);
	        return new ResponseEntity<>(user, HttpStatus.OK);
	    } else {
	        // Log that the user with the given ID was not found
	        System.out.println("User with ID " + id + " not found");
	        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }
	}
	
	@PostMapping
	public ResponseEntity<User> createUser(@RequestBody User user) {
		User createdUser = userService.createUser(user);
		return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
	}

	@PutMapping("/{id}")
	public ResponseEntity<User> updateUser(@PathVariable int id, @RequestBody User user) {
		User updatedUser = userService.updateUser(id, user);
		return new ResponseEntity<>(updatedUser, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteUser(@PathVariable int id) {
		userService.deleteUser(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
