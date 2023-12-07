package com.apirestful.crm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.apirestful.crm.model.Note;
import com.apirestful.crm.service.NoteService;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
//@CrossOrigin(origins = "http://localhost:3000") // Replace with your Vue.js app's origin
public class NoteController {
	@Autowired
	private final NoteService noteService;

	@Autowired
	public NoteController(NoteService noteService) {
		this.noteService = noteService;
	}

	@GetMapping
	@ResponseBody
	public ResponseEntity<List<Note>> getAllNotes() {
		List<Note> notes = noteService.getAllNotes();
		// Log the notes here
	    System.out.println("Retrieved notes: " + notes);
		return new ResponseEntity<>(notes, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	@ResponseBody
	public ResponseEntity<Note> getNoteById(@PathVariable int id) {
	    Note note = noteService.getNoteById(id);

	    if (note != null) {
	        // Log the note here
	        System.out.println("Retrieved note by ID " + id + ": " + note);
	        return new ResponseEntity<>(note, HttpStatus.OK);
	    } else {
	        // Log that the note with the given ID was not found
	        System.out.println("Note with ID " + id + " not found");
	        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }
	}
	
	@PostMapping
	public ResponseEntity<Note> createNote(@RequestBody Note note) {
		Note createdNote = noteService.createNote(note);
		return new ResponseEntity<>(createdNote, HttpStatus.CREATED);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Note> updateNote(@PathVariable int id, @RequestBody Note note) {
		Note updatedNote = noteService.updateNote(id, note);
		return new ResponseEntity<>(updatedNote, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteNote(@PathVariable int id) {
		noteService.deleteNote(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
