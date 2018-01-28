package com.localmarketplace.repository;

import com.localmarketplace.domain.ServiceCategory;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ServiceCategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ServiceCategoryRepository extends JpaRepository<ServiceCategory, Long> {

}
