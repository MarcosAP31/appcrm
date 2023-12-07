package com.apirestful.crm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.apirestful.crm.model.Contact;
public interface ContactRepository extends JpaRepository<Contact, Integer> {
}
