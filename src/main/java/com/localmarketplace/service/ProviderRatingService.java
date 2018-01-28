package com.localmarketplace.service;

import com.localmarketplace.service.dto.ProviderRatingDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing ProviderRating.
 */
public interface ProviderRatingService {

    /**
     * Save a providerRating.
     *
     * @param providerRatingDTO the entity to save
     * @return the persisted entity
     */
    ProviderRatingDTO save(ProviderRatingDTO providerRatingDTO);

    /**
     * Get all the providerRatings.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ProviderRatingDTO> findAll(Pageable pageable);

    /**
     * Get the "id" providerRating.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ProviderRatingDTO findOne(Long id);

    /**
     * Delete the "id" providerRating.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
