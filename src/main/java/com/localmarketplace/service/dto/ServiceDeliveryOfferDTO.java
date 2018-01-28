package com.localmarketplace.service.dto;


import java.time.Instant;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the ServiceDeliveryOffer entity.
 */
public class ServiceDeliveryOfferDTO implements Serializable {

    private Long id;

    private Double discountInPercentage;

    private Double estimatedCost;

    private Instant offerSubmitDate;

    private Boolean isOfferAccepted;

    private Long serviceProviderMapId;

    private Long serviceRequestId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getDiscountInPercentage() {
        return discountInPercentage;
    }

    public void setDiscountInPercentage(Double discountInPercentage) {
        this.discountInPercentage = discountInPercentage;
    }

    public Double getEstimatedCost() {
        return estimatedCost;
    }

    public void setEstimatedCost(Double estimatedCost) {
        this.estimatedCost = estimatedCost;
    }

    public Instant getOfferSubmitDate() {
        return offerSubmitDate;
    }

    public void setOfferSubmitDate(Instant offerSubmitDate) {
        this.offerSubmitDate = offerSubmitDate;
    }

    public Boolean isIsOfferAccepted() {
        return isOfferAccepted;
    }

    public void setIsOfferAccepted(Boolean isOfferAccepted) {
        this.isOfferAccepted = isOfferAccepted;
    }

    public Long getServiceProviderMapId() {
        return serviceProviderMapId;
    }

    public void setServiceProviderMapId(Long serviceProviderMapId) {
        this.serviceProviderMapId = serviceProviderMapId;
    }

    public Long getServiceRequestId() {
        return serviceRequestId;
    }

    public void setServiceRequestId(Long serviceRequestId) {
        this.serviceRequestId = serviceRequestId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ServiceDeliveryOfferDTO serviceDeliveryOfferDTO = (ServiceDeliveryOfferDTO) o;
        if(serviceDeliveryOfferDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), serviceDeliveryOfferDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ServiceDeliveryOfferDTO{" +
            "id=" + getId() +
            ", discountInPercentage=" + getDiscountInPercentage() +
            ", estimatedCost=" + getEstimatedCost() +
            ", offerSubmitDate='" + getOfferSubmitDate() + "'" +
            ", isOfferAccepted='" + isIsOfferAccepted() + "'" +
            "}";
    }
}
