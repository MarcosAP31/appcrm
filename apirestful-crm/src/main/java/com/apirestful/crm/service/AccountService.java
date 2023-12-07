package com.apirestful.crm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.apirestful.crm.model.Account;
import com.apirestful.crm.repository.AccountRepository;

import java.util.List;

@Service
public class AccountService {
	private final AccountRepository accountRepository;

	@Autowired
	public AccountService(AccountRepository accountRepository) {
		this.accountRepository = accountRepository;
	}

	public List<Account> getAllAccounts() {
		return accountRepository.findAll();
	}

	public Account getAccountById(int id) {
        return accountRepository.findById(id).orElse(null);
    }
	
	public Account createAccount(Account account) {
		return accountRepository.save(account);
	}

	public Account updateAccount(int id, Account account) {
		// Implement update logic based on your requirements
		// ...
		return accountRepository.save(account);
	}

	public void deleteAccount(int id) {
		accountRepository.deleteById(id);
	}
}
