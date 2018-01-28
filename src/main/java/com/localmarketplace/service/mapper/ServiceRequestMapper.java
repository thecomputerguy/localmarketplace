package com.localmarketplace.service.mapper;

import com.localmarketplace.domain.*;
import com.localmarketplace.service.dto.ServiceRequestDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ServiceRequest and its DTO ServiceRequestDTO.
 */
@Mapper(componentModel = "spring", uses = {CustomerMapper.class})
public interface ServiceRequestMapper extends EntityMapper<ServiceRequestDTO, ServiceRequest> {

    @Mapping(source = "customer.id", target = "customerId")
    ServiceRequestDTO toDto(ServiceRequest serviceRequest);

    @Mapping(source = "customerId", target = "customer")
    @Mapping(target = "serviceDeliveryOffers", ignore = true)
    ServiceRequest toEntity(ServiceRequestDTO serviceRequestDTO);

    default ServiceRequest fromId(Long id) {
        if (id == null) {
            return null;
        }
        ServiceRequest serviceRequest = new ServiceRequest();
        serviceRequest.setId(id);
        return serviceRequest;
    }
}
