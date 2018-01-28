package com.localmarketplace.service;

import com.localmarketplace.service.dto.ServiceRequestDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing ServiceRequest.
 */
public interface ServiceRequestService {

    /**
     * Save a serviceRequest.
     *
     * @param serviceRequestDTO the entity to save
     * @return the persisted entity
     */
    ServiceRequestDTO save(ServiceRequestDTO serviceRequestDTO);

    /**
     * Get all the serviceRequests.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ServiceRequestDTO> findAll(Pageable pageable);

    /**
     * Get the "id" serviceRequest.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ServiceRequestDTO findOne(Long id);

    /**
     * Delete the "id" serviceRequest.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
