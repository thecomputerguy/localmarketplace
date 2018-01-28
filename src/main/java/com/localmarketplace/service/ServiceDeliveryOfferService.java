package com.localmarketplace.service;

import com.localmarketplace.service.dto.ServiceDeliveryOfferDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing ServiceDeliveryOffer.
 */
public interface ServiceDeliveryOfferService {

    /**
     * Save a serviceDeliveryOffer.
     *
     * @param serviceDeliveryOfferDTO the entity to save
     * @return the persisted entity
     */
    ServiceDeliveryOfferDTO save(ServiceDeliveryOfferDTO serviceDeliveryOfferDTO);

    /**
     * Get all the serviceDeliveryOffers.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ServiceDeliveryOfferDTO> findAll(Pageable pageable);

    /**
     * Get the "id" serviceDeliveryOffer.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ServiceDeliveryOfferDTO findOne(Long id);

    /**
     * Delete the "id" serviceDeliveryOffer.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
