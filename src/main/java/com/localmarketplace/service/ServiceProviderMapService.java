package com.localmarketplace.service;

import com.localmarketplace.service.dto.ServiceProviderMapDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing ServiceProviderMap.
 */
public interface ServiceProviderMapService {

    /**
     * Save a serviceProviderMap.
     *
     * @param serviceProviderMapDTO the entity to save
     * @return the persisted entity
     */
    ServiceProviderMapDTO save(ServiceProviderMapDTO serviceProviderMapDTO);

    /**
     * Get all the serviceProviderMaps.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ServiceProviderMapDTO> findAll(Pageable pageable);

    /**
     * Get the "id" serviceProviderMap.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ServiceProviderMapDTO findOne(Long id);

    /**
     * Delete the "id" serviceProviderMap.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
