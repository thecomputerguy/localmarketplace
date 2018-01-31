package com.localmarketplace.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.security.web.authentication.WebAuthenticationDetails;

import com.localmarketplace.service.LoginAttemptService;

public class AuthenticationSuccessEventListener implements ApplicationListener<AuthenticationSuccessEvent>{

	@Autowired LoginAttemptService loginAttemptService;
	
	@Override
	public void onApplicationEvent(AuthenticationSuccessEvent event) {
		
		WebAuthenticationDetails  webAuthenticationDetails = (WebAuthenticationDetails)event.getAuthentication().getDetails();
		loginAttemptService.loginSuccess(webAuthenticationDetails.getRemoteAddress());
	}

	
}
