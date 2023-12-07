package com.apirestful.crm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.apirestful.crm.model.Contact;
import com.apirestful.crm.service.ContactService;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
//@CrossOrigin(origins = "http://localhost:3000") // Replace with your Vue.js app's origin
public class ContactController {
	@Autowired
	private final ContactService contactService;

	@Autowired
	public ContactController(ContactService contactService) {
		this.contactService = contactService;
	}

	@GetMapping
	@ResponseBody
	public ResponseEntity<List<Contact>> getAllContacts() {
		List<Contact> contacts = contactService.getAllContacts();
		// Log the contacts here
	    System.out.println("Retrieved contacts: " + contacts);
		return new ResponseEntity<>(contacts, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	@ResponseBody
	public ResponseEntity<Contact> getContactById(@PathVariable int id) {
	    Contact contact = contactService.getContactById(id);

	    if (contact != null) {
	        // Log the contact here
	        System.out.println("Retrieved contact by ID " + id + ": " + contact);
	        return new ResponseEntity<>(contact, HttpStatus.OK);
	    } else {
	        // Log that the contact with the given ID was not found
	        System.out.println("Contact with ID " + id + " not found");
	        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }
	}
	
	@PostMapping
	public ResponseEntity<Contact> createContact(@RequestBody Contact contact) {
		Contact createdContact = contactService.createContact(contact);
		return new ResponseEntity<>(createdContact, HttpStatus.CREATED);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Contact> updateContact(@PathVariable int id, @RequestBody Contact contact) {
		Contact updatedContact = contactService.updateContact(id, contact);
		return new ResponseEntity<>(updatedContact, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteContact(@PathVariable int id) {
		contactService.deleteContact(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
