package com.localmarketplace.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.localmarketplace.service.ServiceCategoryService;
import com.localmarketplace.web.rest.errors.BadRequestAlertException;
import com.localmarketplace.web.rest.util.HeaderUtil;
import com.localmarketplace.web.rest.util.PaginationUtil;
import com.localmarketplace.service.dto.ServiceCategoryDTO;
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
 * REST controller for managing ServiceCategory.
 */
@RestController
@RequestMapping("/api")
public class ServiceCategoryResource {

    private final Logger log = LoggerFactory.getLogger(ServiceCategoryResource.class);

    private static final String ENTITY_NAME = "serviceCategory";

    private final ServiceCategoryService serviceCategoryService;

    public ServiceCategoryResource(ServiceCategoryService serviceCategoryService) {
        this.serviceCategoryService = serviceCategoryService;
    }

    /**
     * POST  /service-categories : Create a new serviceCategory.
     *
     * @param serviceCategoryDTO the serviceCategoryDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new serviceCategoryDTO, or with status 400 (Bad Request) if the serviceCategory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/service-categories")
    @Timed
    public ResponseEntity<ServiceCategoryDTO> createServiceCategory(@RequestBody ServiceCategoryDTO serviceCategoryDTO) throws URISyntaxException {
        log.debug("REST request to save ServiceCategory : {}", serviceCategoryDTO);
        if (serviceCategoryDTO.getId() != null) {
            throw new BadRequestAlertException("A new serviceCategory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ServiceCategoryDTO result = serviceCategoryService.save(serviceCategoryDTO);
        return ResponseEntity.created(new URI("/api/service-categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /service-categories : Updates an existing serviceCategory.
     *
     * @param serviceCategoryDTO the serviceCategoryDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated serviceCategoryDTO,
     * or with status 400 (Bad Request) if the serviceCategoryDTO is not valid,
     * or with status 500 (Internal Server Error) if the serviceCategoryDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/service-categories")
    @Timed
    public ResponseEntity<ServiceCategoryDTO> updateServiceCategory(@RequestBody ServiceCategoryDTO serviceCategoryDTO) throws URISyntaxException {
        log.debug("REST request to update ServiceCategory : {}", serviceCategoryDTO);
        if (serviceCategoryDTO.getId() == null) {
            return createServiceCategory(serviceCategoryDTO);
        }
        ServiceCategoryDTO result = serviceCategoryService.save(serviceCategoryDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, serviceCategoryDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /service-categories : get all the serviceCategories.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of serviceCategories in body
     */
    @GetMapping("/service-categories")
    @Timed
    public ResponseEntity<List<ServiceCategoryDTO>> getAllServiceCategories(Pageable pageable) {
        log.debug("REST request to get a page of ServiceCategories");
        Page<ServiceCategoryDTO> page = serviceCategoryService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/service-categories");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /service-categories/:id : get the "id" serviceCategory.
     *
     * @param id the id of the serviceCategoryDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the serviceCategoryDTO, or with status 404 (Not Found)
     */
    @GetMapping("/service-categories/{id}")
    @Timed
    public ResponseEntity<ServiceCategoryDTO> getServiceCategory(@PathVariable Long id) {
        log.debug("REST request to get ServiceCategory : {}", id);
        ServiceCategoryDTO serviceCategoryDTO = serviceCategoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(serviceCategoryDTO));
    }

    /**
     * DELETE  /service-categories/:id : delete the "id" serviceCategory.
     *
     * @param id the id of the serviceCategoryDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/service-categories/{id}")
    @Timed
    public ResponseEntity<Void> deleteServiceCategory(@PathVariable Long id) {
        log.debug("REST request to delete ServiceCategory : {}", id);
        serviceCategoryService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
