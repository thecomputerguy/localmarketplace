package com.localmarketplace.repository;

import com.localmarketplace.domain.ProviderRating;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ProviderRating entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProviderRatingRepository extends JpaRepository<ProviderRating, Long> {

}
