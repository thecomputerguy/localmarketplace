package com.localmarketplace.service.impl;

import com.localmarketplace.service.ServiceDeliveryOfferService;
import com.localmarketplace.domain.ServiceDeliveryOffer;
import com.localmarketplace.repository.ServiceDeliveryOfferRepository;
import com.localmarketplace.service.dto.ServiceDeliveryOfferDTO;
import com.localmarketplace.service.mapper.ServiceDeliveryOfferMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing ServiceDeliveryOffer.
 */
@Service
@Transactional
public class ServiceDeliveryOfferServiceImpl implements ServiceDeliveryOfferService {

    private final Logger log = LoggerFactory.getLogger(ServiceDeliveryOfferServiceImpl.class);

    private final ServiceDeliveryOfferRepository serviceDeliveryOfferRepository;

    private final ServiceDeliveryOfferMapper serviceDeliveryOfferMapper;

    public ServiceDeliveryOfferServiceImpl(ServiceDeliveryOfferRepository serviceDeliveryOfferRepository, ServiceDeliveryOfferMapper serviceDeliveryOfferMapper) {
        this.serviceDeliveryOfferRepository = serviceDeliveryOfferRepository;
        this.serviceDeliveryOfferMapper = serviceDeliveryOfferMapper;
    }

    /**
     * Save a serviceDeliveryOffer.
     *
     * @param serviceDeliveryOfferDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ServiceDeliveryOfferDTO save(ServiceDeliveryOfferDTO serviceDeliveryOfferDTO) {
        log.debug("Request to save ServiceDeliveryOffer : {}", serviceDeliveryOfferDTO);
        ServiceDeliveryOffer serviceDeliveryOffer = serviceDeliveryOfferMapper.toEntity(serviceDeliveryOfferDTO);
        serviceDeliveryOffer = serviceDeliveryOfferRepository.save(serviceDeliveryOffer);
        return serviceDeliveryOfferMapper.toDto(serviceDeliveryOffer);
    }

    /**
     * Get all the serviceDeliveryOffers.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ServiceDeliveryOfferDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ServiceDeliveryOffers");
        return serviceDeliveryOfferRepository.findAll(pageable)
            .map(serviceDeliveryOfferMapper::toDto);
    }

    /**
     * Get one serviceDeliveryOffer by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ServiceDeliveryOfferDTO findOne(Long id) {
        log.debug("Request to get ServiceDeliveryOffer : {}", id);
        ServiceDeliveryOffer serviceDeliveryOffer = serviceDeliveryOfferRepository.findOne(id);
        return serviceDeliveryOfferMapper.toDto(serviceDeliveryOffer);
    }

    /**
     * Delete the serviceDeliveryOffer by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ServiceDeliveryOffer : {}", id);
        serviceDeliveryOfferRepository.delete(id);
    }
}
