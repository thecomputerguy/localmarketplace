package com.localmarketplace.repository;

import com.localmarketplace.domain.ServiceProviderMap;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ServiceProviderMap entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ServiceProviderMapRepository extends JpaRepository<ServiceProviderMap, Long> {

}
