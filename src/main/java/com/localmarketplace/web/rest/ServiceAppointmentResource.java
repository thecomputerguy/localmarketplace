package com.localmarketplace.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.localmarketplace.service.ServiceAppointmentService;
import com.localmarketplace.web.rest.errors.BadRequestAlertException;
import com.localmarketplace.web.rest.util.HeaderUtil;
import com.localmarketplace.web.rest.util.PaginationUtil;
import com.localmarketplace.service.dto.ServiceAppointmentDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ServiceAppointment.
 */
@RestController
@RequestMapping("/api")
public class ServiceAppointmentResource {

    private final Logger log = LoggerFactory.getLogger(ServiceAppointmentResource.class);

    private static final String ENTITY_NAME = "serviceAppointment";

    private final ServiceAppointmentService serviceAppointmentService;

    public ServiceAppointmentResource(ServiceAppointmentService serviceAppointmentService) {
        this.serviceAppointmentService = serviceAppointmentService;
    }

    /**
     * POST  /service-appointments : Create a new serviceAppointment.
     *
     * @param serviceAppointmentDTO the serviceAppointmentDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new serviceAppointmentDTO, or with status 400 (Bad Request) if the serviceAppointment has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/service-appointments")
    @Timed
    public ResponseEntity<ServiceAppointmentDTO> createServiceAppointment(@RequestBody ServiceAppointmentDTO serviceAppointmentDTO) throws URISyntaxException {
        log.debug("REST request to save ServiceAppointment : {}", serviceAppointmentDTO);
        if (serviceAppointmentDTO.getId() != null) {
            throw new BadRequestAlertException("A new serviceAppointment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ServiceAppointmentDTO result = serviceAppointmentService.save(serviceAppointmentDTO);
        return ResponseEntity.created(new URI("/api/service-appointments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /service-appointments : Updates an existing serviceAppointment.
     *
     * @param serviceAppointmentDTO the serviceAppointmentDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated serviceAppointmentDTO,
     * or with status 400 (Bad Request) if the serviceAppointmentDTO is not valid,
     * or with status 500 (Internal Server Error) if the serviceAppointmentDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/service-appointments")
    @Timed
    public ResponseEntity<ServiceAppointmentDTO> updateServiceAppointment(@RequestBody ServiceAppointmentDTO serviceAppointmentDTO) throws URISyntaxException {
        log.debug("REST request to update ServiceAppointment : {}", serviceAppointmentDTO);
        if (serviceAppointmentDTO.getId() == null) {
            return createServiceAppointment(serviceAppointmentDTO);
        }
        ServiceAppointmentDTO result = serviceAppointmentService.save(serviceAppointmentDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, serviceAppointmentDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /service-appointments : get all the serviceAppointments.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of serviceAppointments in body
     */
    @GetMapping("/service-appointments")
    @Timed
    public ResponseEntity<List<ServiceAppointmentDTO>> getAllServiceAppointments(Pageable pageable) {
        log.debug("REST request to get a page of ServiceAppointments");
        Page<ServiceAppointmentDTO> page = serviceAppointmentService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/service-appointments");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /service-appointments/:id : get the "id" serviceAppointment.
     *
     * @param id the id of the serviceAppointmentDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the serviceAppointmentDTO, or with status 404 (Not Found)
     */
    @GetMapping("/service-appointments/{id}")
    @Timed
    public ResponseEntity<ServiceAppointmentDTO> getServiceAppointment(@PathVariable Long id) {
        log.debug("REST request to get ServiceAppointment : {}", id);
        ServiceAppointmentDTO serviceAppointmentDTO = serviceAppointmentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(serviceAppointmentDTO));
    }

    /**
     * DELETE  /service-appointments/:id : delete the "id" serviceAppointment.
     *
     * @param id the id of the serviceAppointmentDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/service-appointments/{id}")
    @Timed
    public ResponseEntity<Void> deleteServiceAppointment(@PathVariable Long id) {
        log.debug("REST request to delete ServiceAppointment : {}", id);
        serviceAppointmentService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
