package com.localmarketplace.service.impl;

import com.localmarketplace.service.ProviderReviewLogService;
import com.localmarketplace.domain.ProviderReviewLog;
import com.localmarketplace.repository.ProviderReviewLogRepository;
import com.localmarketplace.service.dto.ProviderReviewLogDTO;
import com.localmarketplace.service.mapper.ProviderReviewLogMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing ProviderReviewLog.
 */
@Service
@Transactional
public class ProviderReviewLogServiceImpl implements ProviderReviewLogService {

    private final Logger log = LoggerFactory.getLogger(ProviderReviewLogServiceImpl.class);

    private final ProviderReviewLogRepository providerReviewLogRepository;

    private final ProviderReviewLogMapper providerReviewLogMapper;

    public ProviderReviewLogServiceImpl(ProviderReviewLogRepository providerReviewLogRepository, ProviderReviewLogMapper providerReviewLogMapper) {
        this.providerReviewLogRepository = providerReviewLogRepository;
        this.providerReviewLogMapper = providerReviewLogMapper;
    }

    /**
     * Save a providerReviewLog.
     *
     * @param providerReviewLogDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ProviderReviewLogDTO save(ProviderReviewLogDTO providerReviewLogDTO) {
        log.debug("Request to save ProviderReviewLog : {}", providerReviewLogDTO);
        ProviderReviewLog providerReviewLog = providerReviewLogMapper.toEntity(providerReviewLogDTO);
        providerReviewLog = providerReviewLogRepository.save(providerReviewLog);
        return providerReviewLogMapper.toDto(providerReviewLog);
    }

    /**
     * Get all the providerReviewLogs.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ProviderReviewLogDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ProviderReviewLogs");
        return providerReviewLogRepository.findAll(pageable)
            .map(providerReviewLogMapper::toDto);
    }

    /**
     * Get one providerReviewLog by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ProviderReviewLogDTO findOne(Long id) {
        log.debug("Request to get ProviderReviewLog : {}", id);
        ProviderReviewLog providerReviewLog = providerReviewLogRepository.findOne(id);
        return providerReviewLogMapper.toDto(providerReviewLog);
    }

    /**
     * Delete the providerReviewLog by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ProviderReviewLog : {}", id);
        providerReviewLogRepository.delete(id);
    }
}
