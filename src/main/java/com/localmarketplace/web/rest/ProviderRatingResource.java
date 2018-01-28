package com.localmarketplace.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.localmarketplace.service.ProviderRatingService;
import com.localmarketplace.web.rest.errors.BadRequestAlertException;
import com.localmarketplace.web.rest.util.HeaderUtil;
import com.localmarketplace.web.rest.util.PaginationUtil;
import com.localmarketplace.service.dto.ProviderRatingDTO;
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
 * REST controller for managing ProviderRating.
 */
@RestController
@RequestMapping("/api")
public class ProviderRatingResource {

    private final Logger log = LoggerFactory.getLogger(ProviderRatingResource.class);

    private static final String ENTITY_NAME = "providerRating";

    private final ProviderRatingService providerRatingService;

    public ProviderRatingResource(ProviderRatingService providerRatingService) {
        this.providerRatingService = providerRatingService;
    }

    /**
     * POST  /provider-ratings : Create a new providerRating.
     *
     * @param providerRatingDTO the providerRatingDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new providerRatingDTO, or with status 400 (Bad Request) if the providerRating has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/provider-ratings")
    @Timed
    public ResponseEntity<ProviderRatingDTO> createProviderRating(@RequestBody ProviderRatingDTO providerRatingDTO) throws URISyntaxException {
        log.debug("REST request to save ProviderRating : {}", providerRatingDTO);
        if (providerRatingDTO.getId() != null) {
            throw new BadRequestAlertException("A new providerRating cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProviderRatingDTO result = providerRatingService.save(providerRatingDTO);
        return ResponseEntity.created(new URI("/api/provider-ratings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /provider-ratings : Updates an existing providerRating.
     *
     * @param providerRatingDTO the providerRatingDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated providerRatingDTO,
     * or with status 400 (Bad Request) if the providerRatingDTO is not valid,
     * or with status 500 (Internal Server Error) if the providerRatingDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/provider-ratings")
    @Timed
    public ResponseEntity<ProviderRatingDTO> updateProviderRating(@RequestBody ProviderRatingDTO providerRatingDTO) throws URISyntaxException {
        log.debug("REST request to update ProviderRating : {}", providerRatingDTO);
        if (providerRatingDTO.getId() == null) {
            return createProviderRating(providerRatingDTO);
        }
        ProviderRatingDTO result = providerRatingService.save(providerRatingDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, providerRatingDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /provider-ratings : get all the providerRatings.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of providerRatings in body
     */
    @GetMapping("/provider-ratings")
    @Timed
    public ResponseEntity<List<ProviderRatingDTO>> getAllProviderRatings(Pageable pageable) {
        log.debug("REST request to get a page of ProviderRatings");
        Page<ProviderRatingDTO> page = providerRatingService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/provider-ratings");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /provider-ratings/:id : get the "id" providerRating.
     *
     * @param id the id of the providerRatingDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the providerRatingDTO, or with status 404 (Not Found)
     */
    @GetMapping("/provider-ratings/{id}")
    @Timed
    public ResponseEntity<ProviderRatingDTO> getProviderRating(@PathVariable Long id) {
        log.debug("REST request to get ProviderRating : {}", id);
        ProviderRatingDTO providerRatingDTO = providerRatingService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(providerRatingDTO));
    }

    /**
     * DELETE  /provider-ratings/:id : delete the "id" providerRating.
     *
     * @param id the id of the providerRatingDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/provider-ratings/{id}")
    @Timed
    public ResponseEntity<Void> deleteProviderRating(@PathVariable Long id) {
        log.debug("REST request to delete ProviderRating : {}", id);
        providerRatingService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
