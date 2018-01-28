package com.localmarketplace.service;

import com.localmarketplace.service.dto.ProviderReviewLogDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing ProviderReviewLog.
 */
public interface ProviderReviewLogService {

    /**
     * Save a providerReviewLog.
     *
     * @param providerReviewLogDTO the entity to save
     * @return the persisted entity
     */
    ProviderReviewLogDTO save(ProviderReviewLogDTO providerReviewLogDTO);

    /**
     * Get all the providerReviewLogs.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ProviderReviewLogDTO> findAll(Pageable pageable);

    /**
     * Get the "id" providerReviewLog.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ProviderReviewLogDTO findOne(Long id);

    /**
     * Delete the "id" providerReviewLog.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
