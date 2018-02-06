package com.localmarketplace.repository;

import com.localmarketplace.domain.ServiceRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.Collection;


/**
 * Spring Data JPA repository for the ServiceRequest entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, Long> {
    Page<ServiceRequest> findAllByUserId(Long user, Pageable pageable);
}
