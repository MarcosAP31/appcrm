package com.apirestful.crm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.apirestful.crm.model.Note;
public interface NoteRepository extends JpaRepository<Note, Integer> {
}
