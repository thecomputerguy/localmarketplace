package com.localmarketplace.service.impl;

import com.localmarketplace.domain.User;
import com.localmarketplace.repository.UserRepository;
import com.localmarketplace.security.SecurityUtils;
import com.localmarketplace.service.ServiceRequestService;
import com.localmarketplace.domain.ServiceRequest;
import com.localmarketplace.repository.ServiceRequestRepository;
import com.localmarketplace.service.dto.ServiceRequestDTO;
import com.localmarketplace.service.mapper.ServiceRequestMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


/**
 * Service Implementation for managing ServiceRequest.
 */
@Service
@Transactional
public class ServiceRequestServiceImpl implements ServiceRequestService {

    private final Logger log = LoggerFactory.getLogger(ServiceRequestServiceImpl.class);

    private final ServiceRequestRepository serviceRequestRepository;

    private final ServiceRequestMapper serviceRequestMapper;

    private final UserRepository userRepository;

    public ServiceRequestServiceImpl(ServiceRequestRepository serviceRequestRepository, UserRepository userRepository, ServiceRequestMapper serviceRequestMapper) {
        this.serviceRequestRepository = serviceRequestRepository;
        this.userRepository = userRepository;
        this.serviceRequestMapper = serviceRequestMapper;
    }

    /**
     * Save a serviceRequest.
     *
     * @param serviceRequestDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ServiceRequestDTO save(ServiceRequestDTO serviceRequestDTO) {
        log.debug("Request to save ServiceRequest : {}", serviceRequestDTO);
        ServiceRequest serviceRequest = serviceRequestMapper.toEntity(serviceRequestDTO);
        serviceRequest = serviceRequestRepository.save(serviceRequest);
        return serviceRequestMapper.toDto(serviceRequest);
    }

    /**
     * Get all the serviceRequests.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ServiceRequestDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ServiceRequests");
        Optional<String> login = SecurityUtils.getCurrentUserLogin();
        Optional<User> user = userRepository.findOneByLogin(login.get());
        return serviceRequestRepository.findAllByUserId(user.get().getId(),pageable)
            .map(serviceRequestMapper::toDto);
    }

    /**
     * Get one serviceRequest by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ServiceRequestDTO findOne(Long id) {
        log.debug("Request to get ServiceRequest : {}", id);
        ServiceRequest serviceRequest = serviceRequestRepository.findOne(id);
        return serviceRequestMapper.toDto(serviceRequest);
    }

    /**
     * Delete the serviceRequest by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ServiceRequest : {}", id);
        serviceRequestRepository.delete(id);
    }
}
