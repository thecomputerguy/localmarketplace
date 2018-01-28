package com.localmarketplace.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.localmarketplace.service.ServiceRequestService;
import com.localmarketplace.web.rest.errors.BadRequestAlertException;
import com.localmarketplace.web.rest.util.HeaderUtil;
import com.localmarketplace.web.rest.util.PaginationUtil;
import com.localmarketplace.service.dto.ServiceRequestDTO;
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
 * REST controller for managing ServiceRequest.
 */
@RestController
@RequestMapping("/api")
public class ServiceRequestResource {

    private final Logger log = LoggerFactory.getLogger(ServiceRequestResource.class);

    private static final String ENTITY_NAME = "serviceRequest";

    private final ServiceRequestService serviceRequestService;

    public ServiceRequestResource(ServiceRequestService serviceRequestService) {
        this.serviceRequestService = serviceRequestService;
    }

    /**
     * POST  /service-requests : Create a new serviceRequest.
     *
     * @param serviceRequestDTO the serviceRequestDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new serviceRequestDTO, or with status 400 (Bad Request) if the serviceRequest has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/service-requests")
    @Timed
    public ResponseEntity<ServiceRequestDTO> createServiceRequest(@RequestBody ServiceRequestDTO serviceRequestDTO) throws URISyntaxException {
        log.debug("REST request to save ServiceRequest : {}", serviceRequestDTO);
        if (serviceRequestDTO.getId() != null) {
            throw new BadRequestAlertException("A new serviceRequest cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ServiceRequestDTO result = serviceRequestService.save(serviceRequestDTO);
        return ResponseEntity.created(new URI("/api/service-requests/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /service-requests : Updates an existing serviceRequest.
     *
     * @param serviceRequestDTO the serviceRequestDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated serviceRequestDTO,
     * or with status 400 (Bad Request) if the serviceRequestDTO is not valid,
     * or with status 500 (Internal Server Error) if the serviceRequestDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/service-requests")
    @Timed
    public ResponseEntity<ServiceRequestDTO> updateServiceRequest(@RequestBody ServiceRequestDTO serviceRequestDTO) throws URISyntaxException {
        log.debug("REST request to update ServiceRequest : {}", serviceRequestDTO);
        if (serviceRequestDTO.getId() == null) {
            return createServiceRequest(serviceRequestDTO);
        }
        ServiceRequestDTO result = serviceRequestService.save(serviceRequestDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, serviceRequestDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /service-requests : get all the serviceRequests.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of serviceRequests in body
     */
    @GetMapping("/service-requests")
    @Timed
    public ResponseEntity<List<ServiceRequestDTO>> getAllServiceRequests(Pageable pageable) {
        log.debug("REST request to get a page of ServiceRequests");
        Page<ServiceRequestDTO> page = serviceRequestService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/service-requests");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /service-requests/:id : get the "id" serviceRequest.
     *
     * @param id the id of the serviceRequestDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the serviceRequestDTO, or with status 404 (Not Found)
     */
    @GetMapping("/service-requests/{id}")
    @Timed
    public ResponseEntity<ServiceRequestDTO> getServiceRequest(@PathVariable Long id) {
        log.debug("REST request to get ServiceRequest : {}", id);
        ServiceRequestDTO serviceRequestDTO = serviceRequestService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(serviceRequestDTO));
    }

    /**
     * DELETE  /service-requests/:id : delete the "id" serviceRequest.
     *
     * @param id the id of the serviceRequestDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/service-requests/{id}")
    @Timed
    public ResponseEntity<Void> deleteServiceRequest(@PathVariable Long id) {
        log.debug("REST request to delete ServiceRequest : {}", id);
        serviceRequestService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
