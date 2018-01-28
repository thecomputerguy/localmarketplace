package com.localmarketplace.service.mapper;

import com.localmarketplace.domain.*;
import com.localmarketplace.service.dto.ProviderRatingDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ProviderRating and its DTO ProviderRatingDTO.
 */
@Mapper(componentModel = "spring", uses = {ProviderMapper.class})
public interface ProviderRatingMapper extends EntityMapper<ProviderRatingDTO, ProviderRating> {

    @Mapping(source = "provider.id", target = "providerId")
    ProviderRatingDTO toDto(ProviderRating providerRating);

    @Mapping(source = "providerId", target = "provider")
    ProviderRating toEntity(ProviderRatingDTO providerRatingDTO);

    default ProviderRating fromId(Long id) {
        if (id == null) {
            return null;
        }
        ProviderRating providerRating = new ProviderRating();
        providerRating.setId(id);
        return providerRating;
    }
}
