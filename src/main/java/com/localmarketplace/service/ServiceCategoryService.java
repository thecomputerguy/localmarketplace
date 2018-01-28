package com.localmarketplace.service;

import com.localmarketplace.service.dto.ServiceCategoryDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing ServiceCategory.
 */
public interface ServiceCategoryService {

    /**
     * Save a serviceCategory.
     *
     * @param serviceCategoryDTO the entity to save
     * @return the persisted entity
     */
    ServiceCategoryDTO save(ServiceCategoryDTO serviceCategoryDTO);

    /**
     * Get all the serviceCategories.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ServiceCategoryDTO> findAll(Pageable pageable);

    /**
     * Get the "id" serviceCategory.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ServiceCategoryDTO findOne(Long id);

    /**
     * Delete the "id" serviceCategory.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
