package com.localmarketplace.service.impl;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import com.localmarketplace.service.LoginAttemptService;

@Service
public class LoginAttemptServiceImpl implements LoginAttemptService{

	private final Logger log = LoggerFactory.getLogger(LoginAttemptServiceImpl.class);
	private final int MAX_ATTEMPT = 10;
	private LoadingCache<String, Integer> attemptsCache;
	
	public LoginAttemptServiceImpl() {
		super();
		this.attemptsCache = CacheBuilder.newBuilder().expireAfterWrite(10, TimeUnit.MINUTES).build(new CacheLoader<String, Integer>() {

			@Override
			public Integer load(String key) throws Exception {
				
				return 0;
			}
			
		});
		
	}
	
	@Override
	public void loginFailed(String key) {
		int attempts = 0;
		try{
			attempts = this.attemptsCache.get(key);
		}catch(ExecutionException ex){
			attempts = 0;
		}
		attempts++;
		this.attemptsCache.put(key, attempts);
	}

	@Override
	public void loginSuccess(String key) {
		this.attemptsCache.invalidate(key);
	}

	@Override
	public boolean isBlocked(String key) {
		try{
			
			return this.attemptsCache.get(key) >= this.MAX_ATTEMPT; 
		}catch(ExecutionException ex){
			return false;
		}
	}
	
}
