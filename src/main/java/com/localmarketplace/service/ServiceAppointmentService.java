package com.localmarketplace.service;

import com.localmarketplace.service.dto.ServiceAppointmentDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing ServiceAppointment.
 */
public interface ServiceAppointmentService {

    /**
     * Save a serviceAppointment.
     *
     * @param serviceAppointmentDTO the entity to save
     * @return the persisted entity
     */
    ServiceAppointmentDTO save(ServiceAppointmentDTO serviceAppointmentDTO);

    /**
     * Get all the serviceAppointments.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ServiceAppointmentDTO> findAll(Pageable pageable);

    /**
     * Get the "id" serviceAppointment.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ServiceAppointmentDTO findOne(Long id);

    /**
     * Delete the "id" serviceAppointment.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
