package com.localmarketplace;

import java.util.HashSet;
import java.util.Set;

import org.joda.time.Instant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;

import com.localmarketplace.domain.Customer;
import com.localmarketplace.domain.Provider;
import com.localmarketplace.domain.ProviderRating;
import com.localmarketplace.service.AddressService;
import com.localmarketplace.service.AuditEventService;
import com.localmarketplace.service.CustomerService;
import com.localmarketplace.service.MailService;
import com.localmarketplace.service.ProviderRatingService;
import com.localmarketplace.service.ProviderReviewLogService;
import com.localmarketplace.service.ProviderService;
import com.localmarketplace.service.ServiceAppointmentService;
import com.localmarketplace.service.ServiceCategoryService;
import com.localmarketplace.service.ServiceDeliveryOfferService;
import com.localmarketplace.service.ServiceProviderMapService;
import com.localmarketplace.service.ServiceRequestService;
import com.localmarketplace.service.SocialService;
import com.localmarketplace.service.UserService;

public class DatabaseInitializer implements CommandLineRunner {

	@Autowired AddressService addressService;
	@Autowired AuditEventService auditEventService;
	@Autowired CustomerService cusotmerService;
	@Autowired MailService mailService;
	@Autowired ProviderRatingService providerRatingService;
	@Autowired ProviderReviewLogService providerReviewLogService;
	@Autowired ProviderService providerService;
	@Autowired ServiceAppointmentService serviceAppointmentService;
	@Autowired ServiceCategoryService serviceCategoryService;
	@Autowired ServiceDeliveryOfferService serviceDeliveryOfferService;
	@Autowired ServiceProviderMapService serviceProviderMapService;
	@Autowired ServiceRequestService serviceRequestService;
	@Autowired SocialService socialService;
	@Autowired UserService userService;
	
	@Override
	public void run(String... arg0) throws Exception {
		//Data to populate database when application starts....
		Provider provider1 = new Provider();
		Customer customer1 = new Customer();
		Provider provider2 = new Provider();
		Customer customer2 = new Customer();
		Provider provider3 = new Provider();
		Customer customer3 = new Customer();
		Provider provider4 = new Provider();
		Customer customer4 = new Customer();
		Provider provider5 = new Provider();
		Customer customer5 = new Customer();
		Provider provider6 = new Provider();
		Customer customer6 = new Customer();
		//Provider rating for rating the provider....
		Set<ProviderRating> providerRatings = new HashSet<>();
		ProviderRating providerRating = new ProviderRating();
		providerRating.setAvgCommRating(5L);
		providerRating.setAvgEtiRating(5L);
		providerRating.setAvgOverallRating(5L);
		providerRating.setAvgPriceRating(5L);
		providerRating.setAvgProfRating(5L);
		providerRating.setAvgPunctualityRating(5L);
		providerRating.setLastUpdatedOn(Instant.now().getMillis());
		
		provider1.setDescription("Plumbing services at your desk.");
		provider1.setEmail("varunsharma12@outlook.com");
		provider1.setFirstName("varun");
		provider1.setIsIndividual(true);
		provider1.setIsRegisteredOffice(false);
		provider1.setLastName("sharma");
		provider1.setMobileNumber(8446397639L);
		provider1.setOfficeAddress("hinjewadi");
		
		providerRating.setProvider(provider1);
		providerRatings.add(providerRating);
		provider1.setRatings(providerRatings);
		
	}

}
