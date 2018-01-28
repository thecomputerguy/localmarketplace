package com.localmarketplace.service.dto;


import java.time.Instant;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the ServiceAppointment entity.
 */
public class ServiceAppointmentDTO implements Serializable {

    private Long id;

    private Instant serviceDeliverOn;

    private Instant serviceStartTime;

    private Instant serviceEndTime;

    private Long serviceDeliveryOfferId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getServiceDeliverOn() {
        return serviceDeliverOn;
    }

    public void setServiceDeliverOn(Instant serviceDeliverOn) {
        this.serviceDeliverOn = serviceDeliverOn;
    }

    public Instant getServiceStartTime() {
        return serviceStartTime;
    }

    public void setServiceStartTime(Instant serviceStartTime) {
        this.serviceStartTime = serviceStartTime;
    }

    public Instant getServiceEndTime() {
        return serviceEndTime;
    }

    public void setServiceEndTime(Instant serviceEndTime) {
        this.serviceEndTime = serviceEndTime;
    }

    public Long getServiceDeliveryOfferId() {
        return serviceDeliveryOfferId;
    }

    public void setServiceDeliveryOfferId(Long serviceDeliveryOfferId) {
        this.serviceDeliveryOfferId = serviceDeliveryOfferId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ServiceAppointmentDTO serviceAppointmentDTO = (ServiceAppointmentDTO) o;
        if(serviceAppointmentDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), serviceAppointmentDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ServiceAppointmentDTO{" +
            "id=" + getId() +
            ", serviceDeliverOn='" + getServiceDeliverOn() + "'" +
            ", serviceStartTime='" + getServiceStartTime() + "'" +
            ", serviceEndTime='" + getServiceEndTime() + "'" +
            "}";
    }
}
