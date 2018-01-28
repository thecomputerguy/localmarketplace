package com.localmarketplace.service.mapper;

import com.localmarketplace.domain.*;
import com.localmarketplace.service.dto.ServiceDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Service and its DTO ServiceDTO.
 */
@Mapper(componentModel = "spring", uses = {ServiceCategoryMapper.class})
public interface ServiceMapper extends EntityMapper<ServiceDTO, Service> {

    @Mapping(source = "serviceCategory.id", target = "serviceCategoryId")
    ServiceDTO toDto(Service service);

    @Mapping(source = "serviceCategoryId", target = "serviceCategory")
    @Mapping(target = "serviceProviderMaps", ignore = true)
    Service toEntity(ServiceDTO serviceDTO);

    default Service fromId(Long id) {
        if (id == null) {
            return null;
        }
        Service service = new Service();
        service.setId(id);
        return service;
    }
}
