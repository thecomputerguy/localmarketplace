package com.localmarketplace.security;

import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.localmarketplace.domain.User;
import com.localmarketplace.repository.UserRepository;
import com.localmarketplace.service.LoginAttemptService;

/**
 * Authenticate a user from the database.
 */
@Component("userDetailsService")
public class DomainUserDetailsService implements UserDetailsService {

    private final Logger log = LoggerFactory.getLogger(DomainUserDetailsService.class);

    private final UserRepository userRepository;
    
    private LoginAttemptService loginAttemptService;
    
    private HttpServletRequest httpServletRequest;

    public DomainUserDetailsService(UserRepository userRepository, LoginAttemptService loginAttemptService, HttpServletRequest httpServletRequest) {
        this.userRepository = userRepository;
        this.loginAttemptService = loginAttemptService;
        this.httpServletRequest = httpServletRequest;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(final String login) {
    	String clientIp = getClientIp();
        log.debug("Authenticating {}", login);
        if(this.loginAttemptService.isBlocked(clientIp)){
        	throw new LockedException("blocked");
        }
        String lowercaseLogin = login.toLowerCase(Locale.ENGLISH);
        Optional<User> userByEmailFromDatabase = userRepository.findOneWithAuthoritiesByEmail(lowercaseLogin);
        return userByEmailFromDatabase.map(user -> createSpringSecurityUser(lowercaseLogin, user)).orElseGet(() -> {
            Optional<User> userByLoginFromDatabase = userRepository.findOneWithAuthoritiesByLogin(lowercaseLogin);
            return userByLoginFromDatabase.map(user -> createSpringSecurityUser(lowercaseLogin, user))
                .orElseThrow(() -> new UsernameNotFoundException("User " + lowercaseLogin + " was not found in the " +
                    "database"));
        });
    }

    private String getClientIp() {
		String xfHeader = httpServletRequest.getHeader("X-Forwaded-For");
		if(xfHeader == null){
			return httpServletRequest.getRemoteAddr();
		}
		return xfHeader;
	}

	private org.springframework.security.core.userdetails.User createSpringSecurityUser(String lowercaseLogin, User user) {
        if (!user.getActivated()) {
            throw new UserNotActivatedException("User " + lowercaseLogin + " was not activated");
        }
        List<GrantedAuthority> grantedAuthorities = user.getAuthorities().stream()
            .map(authority -> new SimpleGrantedAuthority(authority.getName()))
            .collect(Collectors.toList());
        return new org.springframework.security.core.userdetails.User(user.getLogin(),
            user.getPassword(),
            grantedAuthorities);
    }
}
