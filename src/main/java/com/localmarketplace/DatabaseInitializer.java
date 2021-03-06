package com.localmarketplace;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.actuate.audit.AuditEventRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.localmarketplace.domain.ProviderRating;
import com.localmarketplace.domain.ServiceRequest;
import com.localmarketplace.domain.User;
import com.localmarketplace.repository.AddressRepository;
import com.localmarketplace.repository.CustomerRepository;
import com.localmarketplace.repository.ProviderRatingRepository;
import com.localmarketplace.repository.ProviderRepository;
import com.localmarketplace.repository.ProviderReviewLogRepository;
import com.localmarketplace.repository.ServiceAppointmentRepository;
import com.localmarketplace.repository.ServiceCategoryRepository;
import com.localmarketplace.repository.ServiceDeliveryOfferRepository;
import com.localmarketplace.repository.ServiceProviderMapRepository;
import com.localmarketplace.repository.ServiceRequestRepository;
import com.localmarketplace.repository.UserRepository;
import com.localmarketplace.service.MailService;
import com.localmarketplace.service.SocialService;

@Component
public class DatabaseInitializer implements CommandLineRunner {

	@Autowired AddressRepository addressRepository;
	@Autowired AuditEventRepository auditEventRepository;
	@Autowired CustomerRepository customerRepository;
	@Autowired MailService mailService;
	@Autowired ProviderRatingRepository providerRatingRepository;
	@Autowired ProviderReviewLogRepository providerReviewLogRepository;
	@Autowired ProviderRepository providerRepository;
	@Autowired ServiceAppointmentRepository serviceAppointmentRepository;
	@Autowired ServiceCategoryRepository serviceCategoryRepository;
	@Autowired ServiceDeliveryOfferRepository serviceDeliveryOfferRepository;
	@Autowired ServiceProviderMapRepository serviceProviderMapRepository;
	@Autowired ServiceRequestRepository serviceRequestRepository;
	@Autowired SocialService socialService;
	@Autowired UserRepository userRepository;
	@Autowired PasswordEncoder passwordEncoder;
	
	@Override
	public void run(String... arg0) throws Exception {
		//Data to populate database when application starts....
		User provider1 = new User();
		User customer1 = new User();
		User provider2 = new User();
		User customer2 = new User();
		/*Provider provider3 = new Provider();
		Customer customer3 = new Customer();
		Provider provider4 = new Provider();
		Customer customer4 = new Customer();
		Provider provider5 = new Provider();
		Customer customer5 = new Customer();
		Provider provider6 = new Provider();
		Customer customer6 = new Customer();*/
		//Provider rating for rating the provider....
		Set<ProviderRating> providerRatings = new HashSet<>();
		ProviderRating providerRating1 = new ProviderRating();
		providerRating1.setAvgCommRating(5L);
		providerRating1.setAvgEtiRating(5L);
		providerRating1.setAvgOverallRating(5L);
		providerRating1.setAvgPriceRating(5L);
		providerRating1.setAvgProfRating(5L);
		providerRating1.setAvgPunctualityRating(5L);
		providerRating1.setLastUpdatedOn(Instant.now().toEpochMilli());
		
		ProviderRating providerRating2 = new ProviderRating();
		providerRating2.setAvgCommRating(5L);
		providerRating2.setAvgEtiRating(5L);
		providerRating2.setAvgOverallRating(4L);
		providerRating2.setAvgPriceRating(4L);
		providerRating2.setAvgProfRating(4L);
		providerRating2.setAvgPunctualityRating(4L);
		providerRating2.setLastUpdatedOn(Instant.now().toEpochMilli());
		
		provider1.setLogin("varun12");
		provider1.setPassword(passwordEncoder.encode("sharma"));
		provider1.setDescription("Plumbing services at your desk.");
		provider1.setEmail("varunsharma12@outlook.com");
		provider1.setFirstName("varun");
		provider1.setIsIndividual(true);
		provider1.setIsRegisteredOffice(false);
		provider1.setLastName("sharma");
		provider1.setMobileNumber(8446397639L);
		provider1.setZip(411057L);
		provider1.setOfficeAddress("hinjewadi");
		
		providerRating1.setUser(provider1);
		providerRatings.add(providerRating1);
		provider1.setRatings(providerRatings);
		
		provider2.setLogin("savy12");
		provider2.setPassword(passwordEncoder.encode("sharma"));
		provider2.setDescription("Electrical services at your desk.");
		provider2.setEmail("varunsharma7346@outlook.com");
		provider2.setFirstName("savy");
		provider2.setIsIndividual(true);
		provider2.setIsRegisteredOffice(false);
		provider2.setLastName("sharma");
		provider2.setMobileNumber(8446397639L);
		provider2.setZip(441057L);
		provider2.setOfficeAddress("hinjewadi");
		
		providerRating2.setUser(provider1);
		providerRatings.add(providerRating2);
		provider2.setRatings(providerRatings);
		
		userRepository.save(provider1);
		userRepository.save(provider2);
		//Create customer objects and store them in database
		Set<ServiceRequest> serviceRequests = new HashSet<>();
		
		customer1.setLogin("rahul26");
		customer1.setPassword(passwordEncoder.encode("sharma"));
		customer1.setFirstName("Rahul");
		customer1.setEmail("varunronaldo6976@gmail.com");
		customer1.setLastName("Sharma");
		customer1.setMobileNumber(8446397639L);
		customer1.setServiceRequests(serviceRequests);
		customer1.setIsIndividual(true);
		customer1.setIsRegisteredOffice(false);
		
		ServiceRequest serviceRequest1 = new ServiceRequest();
		serviceRequest1.setUser(customer1);
		serviceRequest1.setExpectedStartTime(Instant.now());
		serviceRequest1.setRequirementDescription("Need kitchen sink to be fixed.");
		serviceRequest1.setServiceDeliveryOffers(null);
		serviceRequest1.setServiceRequiredOn(Instant.now());
		serviceRequest1.setTentativeEffortsRequiredInHours(5L);
		serviceRequests.add(serviceRequest1);
		customer1.setServiceRequests(serviceRequests);
		
		userRepository.save(customer1);
		
	}

}
