package com.localmarketplace.service.impl;

import com.localmarketplace.service.ProviderRatingService;
import com.localmarketplace.domain.ProviderRating;
import com.localmarketplace.repository.ProviderRatingRepository;
import com.localmarketplace.service.dto.ProviderRatingDTO;
import com.localmarketplace.service.mapper.ProviderRatingMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing ProviderRating.
 */
@Service
@Transactional
public class ProviderRatingServiceImpl implements ProviderRatingService {

    private final Logger log = LoggerFactory.getLogger(ProviderRatingServiceImpl.class);

    private final ProviderRatingRepository providerRatingRepository;

    private final ProviderRatingMapper providerRatingMapper;

    public ProviderRatingServiceImpl(ProviderRatingRepository providerRatingRepository, ProviderRatingMapper providerRatingMapper) {
        this.providerRatingRepository = providerRatingRepository;
        this.providerRatingMapper = providerRatingMapper;
    }

    /**
     * Save a providerRating.
     *
     * @param providerRatingDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ProviderRatingDTO save(ProviderRatingDTO providerRatingDTO) {
        log.debug("Request to save ProviderRating : {}", providerRatingDTO);
        ProviderRating providerRating = providerRatingMapper.toEntity(providerRatingDTO);
        providerRating = providerRatingRepository.save(providerRating);
        return providerRatingMapper.toDto(providerRating);
    }

    /**
     * Get all the providerRatings.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ProviderRatingDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ProviderRatings");
        return providerRatingRepository.findAll(pageable)
            .map(providerRatingMapper::toDto);
    }

    /**
     * Get one providerRating by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ProviderRatingDTO findOne(Long id) {
        log.debug("Request to get ProviderRating : {}", id);
        ProviderRating providerRating = providerRatingRepository.findOne(id);
        return providerRatingMapper.toDto(providerRating);
    }

    /**
     * Delete the providerRating by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ProviderRating : {}", id);
        providerRatingRepository.delete(id);
    }
}
