package com.localmarketplace.service.mapper;

import com.localmarketplace.domain.*;
import com.localmarketplace.service.dto.ServiceDeliveryOfferDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ServiceDeliveryOffer and its DTO ServiceDeliveryOfferDTO.
 */
@Mapper(componentModel = "spring", uses = {ServiceProviderMapMapper.class, ServiceRequestMapper.class})
public interface ServiceDeliveryOfferMapper extends EntityMapper<ServiceDeliveryOfferDTO, ServiceDeliveryOffer> {

    @Mapping(source = "serviceProviderMap.id", target = "serviceProviderMapId")
    @Mapping(source = "serviceRequest.id", target = "serviceRequestId")
    ServiceDeliveryOfferDTO toDto(ServiceDeliveryOffer serviceDeliveryOffer);

    @Mapping(source = "serviceProviderMapId", target = "serviceProviderMap")
    @Mapping(target = "serviceAppointments", ignore = true)
    @Mapping(source = "serviceRequestId", target = "serviceRequest")
    ServiceDeliveryOffer toEntity(ServiceDeliveryOfferDTO serviceDeliveryOfferDTO);

    default ServiceDeliveryOffer fromId(Long id) {
        if (id == null) {
            return null;
        }
        ServiceDeliveryOffer serviceDeliveryOffer = new ServiceDeliveryOffer();
        serviceDeliveryOffer.setId(id);
        return serviceDeliveryOffer;
    }
}
