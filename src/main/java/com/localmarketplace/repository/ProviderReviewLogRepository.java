package com.localmarketplace.repository;

import com.localmarketplace.domain.ProviderReviewLog;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ProviderReviewLog entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProviderReviewLogRepository extends JpaRepository<ProviderReviewLog, Long> {

}
