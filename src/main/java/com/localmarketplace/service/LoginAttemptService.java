package com.localmarketplace.service;

public interface LoginAttemptService {

	void loginFailed(String remoteAddress);

	void loginSuccess(String remoteAddress);
	
	boolean isBlocked(String key);

}
