package com.localmarketplace.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.localmarketplace.service.ServiceDeliveryOfferService;
import com.localmarketplace.web.rest.errors.BadRequestAlertException;
import com.localmarketplace.web.rest.util.HeaderUtil;
import com.localmarketplace.web.rest.util.PaginationUtil;
import com.localmarketplace.service.dto.ServiceDeliveryOfferDTO;
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
 * REST controller for managing ServiceDeliveryOffer.
 */
@RestController
@RequestMapping("/api")
public class ServiceDeliveryOfferResource {

    private final Logger log = LoggerFactory.getLogger(ServiceDeliveryOfferResource.class);

    private static final String ENTITY_NAME = "serviceDeliveryOffer";

    private final ServiceDeliveryOfferService serviceDeliveryOfferService;

    public ServiceDeliveryOfferResource(ServiceDeliveryOfferService serviceDeliveryOfferService) {
        this.serviceDeliveryOfferService = serviceDeliveryOfferService;
    }

    /**
     * POST  /service-delivery-offers : Create a new serviceDeliveryOffer.
     *
     * @param serviceDeliveryOfferDTO the serviceDeliveryOfferDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new serviceDeliveryOfferDTO, or with status 400 (Bad Request) if the serviceDeliveryOffer has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/service-delivery-offers")
    @Timed
    public ResponseEntity<ServiceDeliveryOfferDTO> createServiceDeliveryOffer(@RequestBody ServiceDeliveryOfferDTO serviceDeliveryOfferDTO) throws URISyntaxException {
        log.debug("REST request to save ServiceDeliveryOffer : {}", serviceDeliveryOfferDTO);
        if (serviceDeliveryOfferDTO.getId() != null) {
            throw new BadRequestAlertException("A new serviceDeliveryOffer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ServiceDeliveryOfferDTO result = serviceDeliveryOfferService.save(serviceDeliveryOfferDTO);
        return ResponseEntity.created(new URI("/api/service-delivery-offers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /service-delivery-offers : Updates an existing serviceDeliveryOffer.
     *
     * @param serviceDeliveryOfferDTO the serviceDeliveryOfferDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated serviceDeliveryOfferDTO,
     * or with status 400 (Bad Request) if the serviceDeliveryOfferDTO is not valid,
     * or with status 500 (Internal Server Error) if the serviceDeliveryOfferDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/service-delivery-offers")
    @Timed
    public ResponseEntity<ServiceDeliveryOfferDTO> updateServiceDeliveryOffer(@RequestBody ServiceDeliveryOfferDTO serviceDeliveryOfferDTO) throws URISyntaxException {
        log.debug("REST request to update ServiceDeliveryOffer : {}", serviceDeliveryOfferDTO);
        if (serviceDeliveryOfferDTO.getId() == null) {
            return createServiceDeliveryOffer(serviceDeliveryOfferDTO);
        }
        ServiceDeliveryOfferDTO result = serviceDeliveryOfferService.save(serviceDeliveryOfferDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, serviceDeliveryOfferDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /service-delivery-offers : get all the serviceDeliveryOffers.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of serviceDeliveryOffers in body
     */
    @GetMapping("/service-delivery-offers")
    @Timed
    public ResponseEntity<List<ServiceDeliveryOfferDTO>> getAllServiceDeliveryOffers(Pageable pageable) {
        log.debug("REST request to get a page of ServiceDeliveryOffers");
        Page<ServiceDeliveryOfferDTO> page = serviceDeliveryOfferService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/service-delivery-offers");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /service-delivery-offers/:id : get the "id" serviceDeliveryOffer.
     *
     * @param id the id of the serviceDeliveryOfferDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the serviceDeliveryOfferDTO, or with status 404 (Not Found)
     */
    @GetMapping("/service-delivery-offers/{id}")
    @Timed
    public ResponseEntity<ServiceDeliveryOfferDTO> getServiceDeliveryOffer(@PathVariable Long id) {
        log.debug("REST request to get ServiceDeliveryOffer : {}", id);
        ServiceDeliveryOfferDTO serviceDeliveryOfferDTO = serviceDeliveryOfferService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(serviceDeliveryOfferDTO));
    }

    /**
     * DELETE  /service-delivery-offers/:id : delete the "id" serviceDeliveryOffer.
     *
     * @param id the id of the serviceDeliveryOfferDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/service-delivery-offers/{id}")
    @Timed
    public ResponseEntity<Void> deleteServiceDeliveryOffer(@PathVariable Long id) {
        log.debug("REST request to delete ServiceDeliveryOffer : {}", id);
        serviceDeliveryOfferService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
