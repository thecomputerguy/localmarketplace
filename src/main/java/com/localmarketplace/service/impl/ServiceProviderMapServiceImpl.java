package com.localmarketplace.service.impl;

import com.localmarketplace.service.ServiceProviderMapService;
import com.localmarketplace.domain.ServiceProviderMap;
import com.localmarketplace.repository.ServiceProviderMapRepository;
import com.localmarketplace.service.dto.ServiceProviderMapDTO;
import com.localmarketplace.service.mapper.ServiceProviderMapMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing ServiceProviderMap.
 */
@Service
@Transactional
public class ServiceProviderMapServiceImpl implements ServiceProviderMapService {

    private final Logger log = LoggerFactory.getLogger(ServiceProviderMapServiceImpl.class);

    private final ServiceProviderMapRepository serviceProviderMapRepository;

    private final ServiceProviderMapMapper serviceProviderMapMapper;

    public ServiceProviderMapServiceImpl(ServiceProviderMapRepository serviceProviderMapRepository, ServiceProviderMapMapper serviceProviderMapMapper) {
        this.serviceProviderMapRepository = serviceProviderMapRepository;
        this.serviceProviderMapMapper = serviceProviderMapMapper;
    }

    /**
     * Save a serviceProviderMap.
     *
     * @param serviceProviderMapDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ServiceProviderMapDTO save(ServiceProviderMapDTO serviceProviderMapDTO) {
        log.debug("Request to save ServiceProviderMap : {}", serviceProviderMapDTO);
        ServiceProviderMap serviceProviderMap = serviceProviderMapMapper.toEntity(serviceProviderMapDTO);
        serviceProviderMap = serviceProviderMapRepository.save(serviceProviderMap);
        return serviceProviderMapMapper.toDto(serviceProviderMap);
    }

    /**
     * Get all the serviceProviderMaps.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ServiceProviderMapDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ServiceProviderMaps");
        return serviceProviderMapRepository.findAll(pageable)
            .map(serviceProviderMapMapper::toDto);
    }

    /**
     * Get one serviceProviderMap by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ServiceProviderMapDTO findOne(Long id) {
        log.debug("Request to get ServiceProviderMap : {}", id);
        ServiceProviderMap serviceProviderMap = serviceProviderMapRepository.findOne(id);
        return serviceProviderMapMapper.toDto(serviceProviderMap);
    }

    /**
     * Delete the serviceProviderMap by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ServiceProviderMap : {}", id);
        serviceProviderMapRepository.delete(id);
    }
}
