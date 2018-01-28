package com.localmarketplace.service.mapper;

import com.localmarketplace.domain.*;
import com.localmarketplace.service.dto.ServiceAppointmentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ServiceAppointment and its DTO ServiceAppointmentDTO.
 */
@Mapper(componentModel = "spring", uses = {ServiceDeliveryOfferMapper.class})
public interface ServiceAppointmentMapper extends EntityMapper<ServiceAppointmentDTO, ServiceAppointment> {

    @Mapping(source = "serviceDeliveryOffer.id", target = "serviceDeliveryOfferId")
    ServiceAppointmentDTO toDto(ServiceAppointment serviceAppointment);

    @Mapping(source = "serviceDeliveryOfferId", target = "serviceDeliveryOffer")
    @Mapping(target = "providerReviewLogs", ignore = true)
    ServiceAppointment toEntity(ServiceAppointmentDTO serviceAppointmentDTO);

    default ServiceAppointment fromId(Long id) {
        if (id == null) {
            return null;
        }
        ServiceAppointment serviceAppointment = new ServiceAppointment();
        serviceAppointment.setId(id);
        return serviceAppointment;
    }
}
