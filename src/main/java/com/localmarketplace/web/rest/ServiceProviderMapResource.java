package com.localmarketplace.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.localmarketplace.service.ServiceProviderMapService;
import com.localmarketplace.web.rest.errors.BadRequestAlertException;
import com.localmarketplace.web.rest.util.HeaderUtil;
import com.localmarketplace.web.rest.util.PaginationUtil;
import com.localmarketplace.service.dto.ServiceProviderMapDTO;
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
 * REST controller for managing ServiceProviderMap.
 */
@RestController
@RequestMapping("/api")
public class ServiceProviderMapResource {

    private final Logger log = LoggerFactory.getLogger(ServiceProviderMapResource.class);

    private static final String ENTITY_NAME = "serviceProviderMap";

    private final ServiceProviderMapService serviceProviderMapService;

    public ServiceProviderMapResource(ServiceProviderMapService serviceProviderMapService) {
        this.serviceProviderMapService = serviceProviderMapService;
    }

    /**
     * POST  /service-provider-maps : Create a new serviceProviderMap.
     *
     * @param serviceProviderMapDTO the serviceProviderMapDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new serviceProviderMapDTO, or with status 400 (Bad Request) if the serviceProviderMap has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/service-provider-maps")
    @Timed
    public ResponseEntity<ServiceProviderMapDTO> createServiceProviderMap(@RequestBody ServiceProviderMapDTO serviceProviderMapDTO) throws URISyntaxException {
        log.debug("REST request to save ServiceProviderMap : {}", serviceProviderMapDTO);
        if (serviceProviderMapDTO.getId() != null) {
            throw new BadRequestAlertException("A new serviceProviderMap cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ServiceProviderMapDTO result = serviceProviderMapService.save(serviceProviderMapDTO);
        return ResponseEntity.created(new URI("/api/service-provider-maps/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /service-provider-maps : Updates an existing serviceProviderMap.
     *
     * @param serviceProviderMapDTO the serviceProviderMapDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated serviceProviderMapDTO,
     * or with status 400 (Bad Request) if the serviceProviderMapDTO is not valid,
     * or with status 500 (Internal Server Error) if the serviceProviderMapDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/service-provider-maps")
    @Timed
    public ResponseEntity<ServiceProviderMapDTO> updateServiceProviderMap(@RequestBody ServiceProviderMapDTO serviceProviderMapDTO) throws URISyntaxException {
        log.debug("REST request to update ServiceProviderMap : {}", serviceProviderMapDTO);
        if (serviceProviderMapDTO.getId() == null) {
            return createServiceProviderMap(serviceProviderMapDTO);
        }
        ServiceProviderMapDTO result = serviceProviderMapService.save(serviceProviderMapDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, serviceProviderMapDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /service-provider-maps : get all the serviceProviderMaps.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of serviceProviderMaps in body
     */
    @GetMapping("/service-provider-maps")
    @Timed
    public ResponseEntity<List<ServiceProviderMapDTO>> getAllServiceProviderMaps(Pageable pageable) {
        log.debug("REST request to get a page of ServiceProviderMaps");
        Page<ServiceProviderMapDTO> page = serviceProviderMapService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/service-provider-maps");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /service-provider-maps/:id : get the "id" serviceProviderMap.
     *
     * @param id the id of the serviceProviderMapDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the serviceProviderMapDTO, or with status 404 (Not Found)
     */
    @GetMapping("/service-provider-maps/{id}")
    @Timed
    public ResponseEntity<ServiceProviderMapDTO> getServiceProviderMap(@PathVariable Long id) {
        log.debug("REST request to get ServiceProviderMap : {}", id);
        ServiceProviderMapDTO serviceProviderMapDTO = serviceProviderMapService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(serviceProviderMapDTO));
    }

    /**
     * DELETE  /service-provider-maps/:id : delete the "id" serviceProviderMap.
     *
     * @param id the id of the serviceProviderMapDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/service-provider-maps/{id}")
    @Timed
    public ResponseEntity<Void> deleteServiceProviderMap(@PathVariable Long id) {
        log.debug("REST request to delete ServiceProviderMap : {}", id);
        serviceProviderMapService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
