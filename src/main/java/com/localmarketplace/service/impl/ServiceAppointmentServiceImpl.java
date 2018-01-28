package com.localmarketplace.service.impl;

import com.localmarketplace.service.ServiceAppointmentService;
import com.localmarketplace.domain.ServiceAppointment;
import com.localmarketplace.repository.ServiceAppointmentRepository;
import com.localmarketplace.service.dto.ServiceAppointmentDTO;
import com.localmarketplace.service.mapper.ServiceAppointmentMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing ServiceAppointment.
 */
@Service
@Transactional
public class ServiceAppointmentServiceImpl implements ServiceAppointmentService {

    private final Logger log = LoggerFactory.getLogger(ServiceAppointmentServiceImpl.class);

    private final ServiceAppointmentRepository serviceAppointmentRepository;

    private final ServiceAppointmentMapper serviceAppointmentMapper;

    public ServiceAppointmentServiceImpl(ServiceAppointmentRepository serviceAppointmentRepository, ServiceAppointmentMapper serviceAppointmentMapper) {
        this.serviceAppointmentRepository = serviceAppointmentRepository;
        this.serviceAppointmentMapper = serviceAppointmentMapper;
    }

    /**
     * Save a serviceAppointment.
     *
     * @param serviceAppointmentDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ServiceAppointmentDTO save(ServiceAppointmentDTO serviceAppointmentDTO) {
        log.debug("Request to save ServiceAppointment : {}", serviceAppointmentDTO);
        ServiceAppointment serviceAppointment = serviceAppointmentMapper.toEntity(serviceAppointmentDTO);
        serviceAppointment = serviceAppointmentRepository.save(serviceAppointment);
        return serviceAppointmentMapper.toDto(serviceAppointment);
    }

    /**
     * Get all the serviceAppointments.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ServiceAppointmentDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ServiceAppointments");
        return serviceAppointmentRepository.findAll(pageable)
            .map(serviceAppointmentMapper::toDto);
    }

    /**
     * Get one serviceAppointment by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ServiceAppointmentDTO findOne(Long id) {
        log.debug("Request to get ServiceAppointment : {}", id);
        ServiceAppointment serviceAppointment = serviceAppointmentRepository.findOne(id);
        return serviceAppointmentMapper.toDto(serviceAppointment);
    }

    /**
     * Delete the serviceAppointment by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ServiceAppointment : {}", id);
        serviceAppointmentRepository.delete(id);
    }
}
