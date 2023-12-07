package com.apirestful.crm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.apirestful.crm.model.Account;
public interface AccountRepository extends JpaRepository<Account, Integer> {
}
