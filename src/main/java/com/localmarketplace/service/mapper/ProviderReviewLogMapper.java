package com.localmarketplace.service.mapper;

import com.localmarketplace.domain.*;
import com.localmarketplace.service.dto.ProviderReviewLogDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ProviderReviewLog and its DTO ProviderReviewLogDTO.
 */
@Mapper(componentModel = "spring", uses = {ServiceAppointmentMapper.class})
public interface ProviderReviewLogMapper extends EntityMapper<ProviderReviewLogDTO, ProviderReviewLog> {

    @Mapping(source = "serviceAppointment.id", target = "serviceAppointmentId")
    ProviderReviewLogDTO toDto(ProviderReviewLog providerReviewLog);

    @Mapping(source = "serviceAppointmentId", target = "serviceAppointment")
    ProviderReviewLog toEntity(ProviderReviewLogDTO providerReviewLogDTO);

    default ProviderReviewLog fromId(Long id) {
        if (id == null) {
            return null;
        }
        ProviderReviewLog providerReviewLog = new ProviderReviewLog();
        providerReviewLog.setId(id);
        return providerReviewLog;
    }
}
