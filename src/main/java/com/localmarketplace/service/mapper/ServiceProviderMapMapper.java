package com.localmarketplace.service.mapper;

import com.localmarketplace.domain.*;
import com.localmarketplace.service.dto.ServiceProviderMapDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ServiceProviderMap and its DTO ServiceProviderMapDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapperOther.class, ServiceMapper.class})
public interface ServiceProviderMapMapper extends EntityMapper<ServiceProviderMapDTO, ServiceProviderMap> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "service.id", target = "serviceId")
    ServiceProviderMapDTO toDto(ServiceProviderMap serviceProviderMap);

    @Mapping(source = "userId", target = "user")
    @Mapping(source = "serviceId", target = "service")
    @Mapping(target = "serviceDeliveryOffers", ignore = true)
    ServiceProviderMap toEntity(ServiceProviderMapDTO serviceProviderMapDTO);

    default ServiceProviderMap fromId(Long id) {
        if (id == null) {
            return null;
        }
        ServiceProviderMap serviceProviderMap = new ServiceProviderMap();
        serviceProviderMap.setId(id);
        return serviceProviderMap;
    }
}
