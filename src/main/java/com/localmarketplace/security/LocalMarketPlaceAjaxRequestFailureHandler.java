package com.localmarketplace.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

public class LocalMarketPlaceAjaxRequestFailureHandler extends SimpleUrlAuthenticationFailureHandler {

	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException exception) throws IOException, ServletException {
		String errorMessage = "Failed to signIn! please check your credentials and try again.";
		
		if(exception.getMessage().equalsIgnoreCase("blocked")){
			errorMessage = "you have been blocked from our system for 5 invalid login attempts.";
		}
		response.sendError(401,errorMessage);
	}

	
}
