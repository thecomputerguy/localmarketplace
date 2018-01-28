package com.localmarketplace.service.impl;

import com.localmarketplace.service.ServiceCategoryService;
import com.localmarketplace.domain.ServiceCategory;
import com.localmarketplace.repository.ServiceCategoryRepository;
import com.localmarketplace.service.dto.ServiceCategoryDTO;
import com.localmarketplace.service.mapper.ServiceCategoryMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing ServiceCategory.
 */
@Service
@Transactional
public class ServiceCategoryServiceImpl implements ServiceCategoryService {

    private final Logger log = LoggerFactory.getLogger(ServiceCategoryServiceImpl.class);

    private final ServiceCategoryRepository serviceCategoryRepository;

    private final ServiceCategoryMapper serviceCategoryMapper;

    public ServiceCategoryServiceImpl(ServiceCategoryRepository serviceCategoryRepository, ServiceCategoryMapper serviceCategoryMapper) {
        this.serviceCategoryRepository = serviceCategoryRepository;
        this.serviceCategoryMapper = serviceCategoryMapper;
    }

    /**
     * Save a serviceCategory.
     *
     * @param serviceCategoryDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ServiceCategoryDTO save(ServiceCategoryDTO serviceCategoryDTO) {
        log.debug("Request to save ServiceCategory : {}", serviceCategoryDTO);
        ServiceCategory serviceCategory = serviceCategoryMapper.toEntity(serviceCategoryDTO);
        serviceCategory = serviceCategoryRepository.save(serviceCategory);
        return serviceCategoryMapper.toDto(serviceCategory);
    }

    /**
     * Get all the serviceCategories.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ServiceCategoryDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ServiceCategories");
        return serviceCategoryRepository.findAll(pageable)
            .map(serviceCategoryMapper::toDto);
    }

    /**
     * Get one serviceCategory by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ServiceCategoryDTO findOne(Long id) {
        log.debug("Request to get ServiceCategory : {}", id);
        ServiceCategory serviceCategory = serviceCategoryRepository.findOne(id);
        return serviceCategoryMapper.toDto(serviceCategory);
    }

    /**
     * Delete the serviceCategory by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ServiceCategory : {}", id);
        serviceCategoryRepository.delete(id);
    }
}
