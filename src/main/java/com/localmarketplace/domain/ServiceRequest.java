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
 * A ServiceRequest.
 */
@Entity
@Table(name = "service_request")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ServiceRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "requirement_description")
    private String requirementDescription;

    @Column(name = "service_required_on")
    private Instant serviceRequiredOn;

    @Column(name = "expected_start_time")
    private Instant expectedStartTime;

    @Column(name = "tentative_efforts_required_in_hours")
    private Long tentativeEffortsRequiredInHours;

    @ManyToOne
    private Customer customer;

    @OneToMany(mappedBy = "serviceRequest")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ServiceDeliveryOffer> serviceDeliveryOffers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRequirementDescription() {
        return requirementDescription;
    }

    public ServiceRequest requirementDescription(String requirementDescription) {
        this.requirementDescription = requirementDescription;
        return this;
    }

    public void setRequirementDescription(String requirementDescription) {
        this.requirementDescription = requirementDescription;
    }

    public Instant getServiceRequiredOn() {
        return serviceRequiredOn;
    }

    public ServiceRequest serviceRequiredOn(Instant serviceRequiredOn) {
        this.serviceRequiredOn = serviceRequiredOn;
        return this;
    }

    public void setServiceRequiredOn(Instant serviceRequiredOn) {
        this.serviceRequiredOn = serviceRequiredOn;
    }

    public Instant getExpectedStartTime() {
        return expectedStartTime;
    }

    public ServiceRequest expectedStartTime(Instant expectedStartTime) {
        this.expectedStartTime = expectedStartTime;
        return this;
    }

    public void setExpectedStartTime(Instant expectedStartTime) {
        this.expectedStartTime = expectedStartTime;
    }

    public Long getTentativeEffortsRequiredInHours() {
        return tentativeEffortsRequiredInHours;
    }

    public ServiceRequest tentativeEffortsRequiredInHours(Long tentativeEffortsRequiredInHours) {
        this.tentativeEffortsRequiredInHours = tentativeEffortsRequiredInHours;
        return this;
    }

    public void setTentativeEffortsRequiredInHours(Long tentativeEffortsRequiredInHours) {
        this.tentativeEffortsRequiredInHours = tentativeEffortsRequiredInHours;
    }

    public Customer getCustomer() {
        return customer;
    }

    public ServiceRequest customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Set<ServiceDeliveryOffer> getServiceDeliveryOffers() {
        return serviceDeliveryOffers;
    }

    public ServiceRequest serviceDeliveryOffers(Set<ServiceDeliveryOffer> serviceDeliveryOffers) {
        this.serviceDeliveryOffers = serviceDeliveryOffers;
        return this;
    }

    public ServiceRequest addServiceDeliveryOffers(ServiceDeliveryOffer serviceDeliveryOffer) {
        this.serviceDeliveryOffers.add(serviceDeliveryOffer);
        serviceDeliveryOffer.setServiceRequest(this);
        return this;
    }

    public ServiceRequest removeServiceDeliveryOffers(ServiceDeliveryOffer serviceDeliveryOffer) {
        this.serviceDeliveryOffers.remove(serviceDeliveryOffer);
        serviceDeliveryOffer.setServiceRequest(null);
        return this;
    }

    public void setServiceDeliveryOffers(Set<ServiceDeliveryOffer> serviceDeliveryOffers) {
        this.serviceDeliveryOffers = serviceDeliveryOffers;
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
        ServiceRequest serviceRequest = (ServiceRequest) o;
        if (serviceRequest.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), serviceRequest.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ServiceRequest{" +
            "id=" + getId() +
            ", requirementDescription='" + getRequirementDescription() + "'" +
            ", serviceRequiredOn='" + getServiceRequiredOn() + "'" +
            ", expectedStartTime='" + getExpectedStartTime() + "'" +
            ", tentativeEffortsRequiredInHours=" + getTentativeEffortsRequiredInHours() +
            "}";
    }
}
