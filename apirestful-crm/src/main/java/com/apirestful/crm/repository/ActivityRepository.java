package com.apirestful.crm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.apirestful.crm.model.Activity;
public interface ActivityRepository extends JpaRepository<Activity, Integer> {
}
