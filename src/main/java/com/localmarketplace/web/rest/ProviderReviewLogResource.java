package com.localmarketplace.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.localmarketplace.service.ProviderReviewLogService;
import com.localmarketplace.web.rest.errors.BadRequestAlertException;
import com.localmarketplace.web.rest.util.HeaderUtil;
import com.localmarketplace.web.rest.util.PaginationUtil;
import com.localmarketplace.service.dto.ProviderReviewLogDTO;
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
 * REST controller for managing ProviderReviewLog.
 */
@RestController
@RequestMapping("/api")
public class ProviderReviewLogResource {

    private final Logger log = LoggerFactory.getLogger(ProviderReviewLogResource.class);

    private static final String ENTITY_NAME = "providerReviewLog";

    private final ProviderReviewLogService providerReviewLogService;

    public ProviderReviewLogResource(ProviderReviewLogService providerReviewLogService) {
        this.providerReviewLogService = providerReviewLogService;
    }

    /**
     * POST  /provider-review-logs : Create a new providerReviewLog.
     *
     * @param providerReviewLogDTO the providerReviewLogDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new providerReviewLogDTO, or with status 400 (Bad Request) if the providerReviewLog has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/provider-review-logs")
    @Timed
    public ResponseEntity<ProviderReviewLogDTO> createProviderReviewLog(@RequestBody ProviderReviewLogDTO providerReviewLogDTO) throws URISyntaxException {
        log.debug("REST request to save ProviderReviewLog : {}", providerReviewLogDTO);
        if (providerReviewLogDTO.getId() != null) {
            throw new BadRequestAlertException("A new providerReviewLog cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProviderReviewLogDTO result = providerReviewLogService.save(providerReviewLogDTO);
        return ResponseEntity.created(new URI("/api/provider-review-logs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /provider-review-logs : Updates an existing providerReviewLog.
     *
     * @param providerReviewLogDTO the providerReviewLogDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated providerReviewLogDTO,
     * or with status 400 (Bad Request) if the providerReviewLogDTO is not valid,
     * or with status 500 (Internal Server Error) if the providerReviewLogDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/provider-review-logs")
    @Timed
    public ResponseEntity<ProviderReviewLogDTO> updateProviderReviewLog(@RequestBody ProviderReviewLogDTO providerReviewLogDTO) throws URISyntaxException {
        log.debug("REST request to update ProviderReviewLog : {}", providerReviewLogDTO);
        if (providerReviewLogDTO.getId() == null) {
            return createProviderReviewLog(providerReviewLogDTO);
        }
        ProviderReviewLogDTO result = providerReviewLogService.save(providerReviewLogDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, providerReviewLogDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /provider-review-logs : get all the providerReviewLogs.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of providerReviewLogs in body
     */
    @GetMapping("/provider-review-logs")
    @Timed
    public ResponseEntity<List<ProviderReviewLogDTO>> getAllProviderReviewLogs(Pageable pageable) {
        log.debug("REST request to get a page of ProviderReviewLogs");
        Page<ProviderReviewLogDTO> page = providerReviewLogService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/provider-review-logs");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /provider-review-logs/:id : get the "id" providerReviewLog.
     *
     * @param id the id of the providerReviewLogDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the providerReviewLogDTO, or with status 404 (Not Found)
     */
    @GetMapping("/provider-review-logs/{id}")
    @Timed
    public ResponseEntity<ProviderReviewLogDTO> getProviderReviewLog(@PathVariable Long id) {
        log.debug("REST request to get ProviderReviewLog : {}", id);
        ProviderReviewLogDTO providerReviewLogDTO = providerReviewLogService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(providerReviewLogDTO));
    }

    /**
     * DELETE  /provider-review-logs/:id : delete the "id" providerReviewLog.
     *
     * @param id the id of the providerReviewLogDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/provider-review-logs/{id}")
    @Timed
    public ResponseEntity<Void> deleteProviderReviewLog(@PathVariable Long id) {
        log.debug("REST request to delete ProviderReviewLog : {}", id);
        providerReviewLogService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
