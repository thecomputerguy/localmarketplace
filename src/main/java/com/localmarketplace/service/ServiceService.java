package com.localmarketplace.service;

import com.localmarketplace.service.dto.ServiceDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Service.
 */
public interface ServiceService {

    /**
     * Save a service.
     *
     * @param serviceDTO the entity to save
     * @return the persisted entity
     */
    ServiceDTO save(ServiceDTO serviceDTO);

    /**
     * Get all the services.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ServiceDTO> findAll(Pageable pageable);

    /**
     * Get the "id" service.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ServiceDTO findOne(Long id);

    /**
     * Delete the "id" service.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
