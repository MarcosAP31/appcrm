package com.apirestful.crm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.apirestful.crm.model.Account;
import com.apirestful.crm.service.AccountService;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
//@CrossOrigin(origins = "http://localhost:3000") // Replace with your Vue.js app's origin
public class AccountController {
	@Autowired
	private final AccountService accountService;

	@Autowired
	public AccountController(AccountService accountService) {
		this.accountService = accountService;
	}

	@GetMapping
	@ResponseBody
	public ResponseEntity<List<Account>> getAllAccounts() {
		List<Account> accounts = accountService.getAllAccounts();
		// Log the accounts here
	    System.out.println("Retrieved accounts: " + accounts);
		return new ResponseEntity<>(accounts, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	@ResponseBody
	public ResponseEntity<Account> getAccountById(@PathVariable int id) {
	    Account account = accountService.getAccountById(id);

	    if (account != null) {
	        // Log the account here
	        System.out.println("Retrieved account by ID " + id + ": " + account);
	        return new ResponseEntity<>(account, HttpStatus.OK);
	    } else {
	        // Log that the account with the given ID was not found
	        System.out.println("Account with ID " + id + " not found");
	        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }
	}
	
	@PostMapping
	public ResponseEntity<Account> createAccount(@RequestBody Account account) {
		Account createdAccount = accountService.createAccount(account);
		return new ResponseEntity<>(createdAccount, HttpStatus.CREATED);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Account> updateAccount(@PathVariable int id, @RequestBody Account account) {
		Account updatedAccount = accountService.updateAccount(id, account);
		return new ResponseEntity<>(updatedAccount, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteAccount(@PathVariable int id) {
		accountService.deleteAccount(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
