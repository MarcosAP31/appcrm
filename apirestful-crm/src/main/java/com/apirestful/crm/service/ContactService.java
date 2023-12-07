package com.apirestful.crm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.apirestful.crm.model.Contact;
import com.apirestful.crm.repository.ContactRepository;

import java.util.List;

@Service
public class ContactService {
	private final ContactRepository contactRepository;

	@Autowired
	public ContactService(ContactRepository contactRepository) {
		this.contactRepository = contactRepository;
	}

	public List<Contact> getAllContacts() {
		return contactRepository.findAll();
	}

	public Contact getContactById(int id) {
        return contactRepository.findById(id).orElse(null);
    }
	
	public Contact createContact(Contact contact) {
		return contactRepository.save(contact);
	}

	public Contact updateContact(int id, Contact contact) {
		// Implement update logic based on your requirements
		// ...
		return contactRepository.save(contact);
	}

	public void deleteContact(int id) {
		contactRepository.deleteById(id);
	}
}
