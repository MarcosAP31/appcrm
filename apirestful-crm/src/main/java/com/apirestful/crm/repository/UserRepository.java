package com.apirestful.crm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.apirestful.crm.model.User;
public interface UserRepository extends JpaRepository<User, Integer> {
}
