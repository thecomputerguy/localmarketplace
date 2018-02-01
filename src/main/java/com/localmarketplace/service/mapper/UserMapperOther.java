package com.localmarketplace.service.mapper;

import java.util.Set;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.localmarketplace.domain.Authority;
import com.localmarketplace.domain.User;
import com.localmarketplace.service.dto.UserDTO;
@Mapper(componentModel = "spring", uses = {})
public interface UserMapperOther extends EntityMapper<UserDTO, User> {

		 @Mapping(target = "persistentTokens", ignore = true)
		 @Mapping(target = "addresses", ignore = true)
		 @Mapping(target = "serviceRequests", ignore = true)
		 @Mapping(target = "ratings", ignore = true)
		 @Mapping(target = "serviceProviderMaps", ignore = true)
		 @Mapping(target = "mobileNumber", ignore = true)
	    User toEntity(UserDTO userDTO);
		 
		 @IterableMapping(elementTargetType = Authority.class)
		  Set<Authority> mapListToSet(Set<String> value);

		 default Authority mapStringToAuthority(String authority) {
		        
				 if(authority == null){
					return null;
				 }
				 Authority authorityObject = new Authority();
				 authorityObject.setName(authority);
				 return authorityObject;
		    }
		 
		 default Set<String> map(Set<Authority> value){
			 Set<String> authorities = value.stream().map((a) -> {
				 return a.getName();
			 }).collect(Collectors.toSet());
			 
			 return authorities;
		 }
		 
	    default User fromId(Long id) {
	        if (id == null) {
	            return null;
	        }
	        User user = new User();
	        user.setId(id);
	        return user;
	    }
}
