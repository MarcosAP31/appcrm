package com.apirestful.crm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.apirestful.crm.model.Note;
import com.apirestful.crm.repository.NoteRepository;

import java.util.List;

@Service
public class NoteService {
	private final NoteRepository noteRepository;

	@Autowired
	public NoteService(NoteRepository noteRepository) {
		this.noteRepository = noteRepository;
	}

	public List<Note> getAllNotes() {
		return noteRepository.findAll();
	}

	public Note getNoteById(int id) {
        return noteRepository.findById(id).orElse(null);
    }
	
	public Note createNote(Note note) {
		return noteRepository.save(note);
	}

	public Note updateNote(int id, Note note) {
		// Implement update logic based on your requirements
		// ...
		return noteRepository.save(note);
	}

	public void deleteNote(int id) {
		noteRepository.deleteById(id);
	}
}
