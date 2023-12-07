package com.apirestful.crm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.apirestful.crm.model.Opportunity;
public interface OpportunityRepository extends JpaRepository<Opportunity, Integer> {
}
