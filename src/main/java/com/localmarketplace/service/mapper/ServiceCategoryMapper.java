package com.localmarketplace.service.mapper;

import com.localmarketplace.domain.*;
import com.localmarketplace.service.dto.ServiceCategoryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ServiceCategory and its DTO ServiceCategoryDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ServiceCategoryMapper extends EntityMapper<ServiceCategoryDTO, ServiceCategory> {


    @Mapping(target = "services", ignore = true)
    ServiceCategory toEntity(ServiceCategoryDTO serviceCategoryDTO);

    default ServiceCategory fromId(Long id) {
        if (id == null) {
            return null;
        }
        ServiceCategory serviceCategory = new ServiceCategory();
        serviceCategory.setId(id);
        return serviceCategory;
    }
}
