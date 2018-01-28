package com.localmarketplace.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A ServiceDeliveryOffer.
 */
@Entity
@Table(name = "service_delivery_offer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ServiceDeliveryOffer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "discount_in_percentage")
    private Double discountInPercentage;

    @Column(name = "estimated_cost")
    private Double estimatedCost;

    @Column(name = "offer_submit_date")
    private Instant offerSubmitDate;

    @Column(name = "is_offer_accepted")
    private Boolean isOfferAccepted;

    @ManyToOne
    private ServiceProviderMap serviceProviderMap;

    @OneToMany(mappedBy = "serviceDeliveryOffer")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ServiceAppointment> serviceAppointments = new HashSet<>();

    @ManyToOne
    private ServiceRequest serviceRequest;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getDiscountInPercentage() {
        return discountInPercentage;
    }

    public ServiceDeliveryOffer discountInPercentage(Double discountInPercentage) {
        this.discountInPercentage = discountInPercentage;
        return this;
    }

    public void setDiscountInPercentage(Double discountInPercentage) {
        this.discountInPercentage = discountInPercentage;
    }

    public Double getEstimatedCost() {
        return estimatedCost;
    }

    public ServiceDeliveryOffer estimatedCost(Double estimatedCost) {
        this.estimatedCost = estimatedCost;
        return this;
    }

    public void setEstimatedCost(Double estimatedCost) {
        this.estimatedCost = estimatedCost;
    }

    public Instant getOfferSubmitDate() {
        return offerSubmitDate;
    }

    public ServiceDeliveryOffer offerSubmitDate(Instant offerSubmitDate) {
        this.offerSubmitDate = offerSubmitDate;
        return this;
    }

    public void setOfferSubmitDate(Instant offerSubmitDate) {
        this.offerSubmitDate = offerSubmitDate;
    }

    public Boolean isIsOfferAccepted() {
        return isOfferAccepted;
    }

    public ServiceDeliveryOffer isOfferAccepted(Boolean isOfferAccepted) {
        this.isOfferAccepted = isOfferAccepted;
        return this;
    }

    public void setIsOfferAccepted(Boolean isOfferAccepted) {
        this.isOfferAccepted = isOfferAccepted;
    }

    public ServiceProviderMap getServiceProviderMap() {
        return serviceProviderMap;
    }

    public ServiceDeliveryOffer serviceProviderMap(ServiceProviderMap serviceProviderMap) {
        this.serviceProviderMap = serviceProviderMap;
        return this;
    }

    public void setServiceProviderMap(ServiceProviderMap serviceProviderMap) {
        this.serviceProviderMap = serviceProviderMap;
    }

    public Set<ServiceAppointment> getServiceAppointments() {
        return serviceAppointments;
    }

    public ServiceDeliveryOffer serviceAppointments(Set<ServiceAppointment> serviceAppointments) {
        this.serviceAppointments = serviceAppointments;
        return this;
    }

    public ServiceDeliveryOffer addServiceAppointments(ServiceAppointment serviceAppointment) {
        this.serviceAppointments.add(serviceAppointment);
        serviceAppointment.setServiceDeliveryOffer(this);
        return this;
    }

    public ServiceDeliveryOffer removeServiceAppointments(ServiceAppointment serviceAppointment) {
        this.serviceAppointments.remove(serviceAppointment);
        serviceAppointment.setServiceDeliveryOffer(null);
        return this;
    }

    public void setServiceAppointments(Set<ServiceAppointment> serviceAppointments) {
        this.serviceAppointments = serviceAppointments;
    }

    public ServiceRequest getServiceRequest() {
        return serviceRequest;
    }

    public ServiceDeliveryOffer serviceRequest(ServiceRequest serviceRequest) {
        this.serviceRequest = serviceRequest;
        return this;
    }

    public void setServiceRequest(ServiceRequest serviceRequest) {
        this.serviceRequest = serviceRequest;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ServiceDeliveryOffer serviceDeliveryOffer = (ServiceDeliveryOffer) o;
        if (serviceDeliveryOffer.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), serviceDeliveryOffer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ServiceDeliveryOffer{" +
            "id=" + getId() +
            ", discountInPercentage=" + getDiscountInPercentage() +
            ", estimatedCost=" + getEstimatedCost() +
            ", offerSubmitDate='" + getOfferSubmitDate() + "'" +
            ", isOfferAccepted='" + isIsOfferAccepted() + "'" +
            "}";
    }
}
