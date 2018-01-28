package com.localmarketplace.repository;

import com.localmarketplace.domain.ServiceDeliveryOffer;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ServiceDeliveryOffer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ServiceDeliveryOfferRepository extends JpaRepository<ServiceDeliveryOffer, Long> {

}
