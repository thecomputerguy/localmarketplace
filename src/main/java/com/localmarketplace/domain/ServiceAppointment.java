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
 * A ServiceAppointment.
 */
@Entity
@Table(name = "service_appointment")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ServiceAppointment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "service_deliver_on")
    private Instant serviceDeliverOn;

    @Column(name = "service_start_time")
    private Instant serviceStartTime;

    @Column(name = "service_end_time")
    private Instant serviceEndTime;

    @ManyToOne
    private ServiceDeliveryOffer serviceDeliveryOffer;

    @OneToMany(mappedBy = "serviceAppointment")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ProviderReviewLog> providerReviewLogs = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getServiceDeliverOn() {
        return serviceDeliverOn;
    }

    public ServiceAppointment serviceDeliverOn(Instant serviceDeliverOn) {
        this.serviceDeliverOn = serviceDeliverOn;
        return this;
    }

    public void setServiceDeliverOn(Instant serviceDeliverOn) {
        this.serviceDeliverOn = serviceDeliverOn;
    }

    public Instant getServiceStartTime() {
        return serviceStartTime;
    }

    public ServiceAppointment serviceStartTime(Instant serviceStartTime) {
        this.serviceStartTime = serviceStartTime;
        return this;
    }

    public void setServiceStartTime(Instant serviceStartTime) {
        this.serviceStartTime = serviceStartTime;
    }

    public Instant getServiceEndTime() {
        return serviceEndTime;
    }

    public ServiceAppointment serviceEndTime(Instant serviceEndTime) {
        this.serviceEndTime = serviceEndTime;
        return this;
    }

    public void setServiceEndTime(Instant serviceEndTime) {
        this.serviceEndTime = serviceEndTime;
    }

    public ServiceDeliveryOffer getServiceDeliveryOffer() {
        return serviceDeliveryOffer;
    }

    public ServiceAppointment serviceDeliveryOffer(ServiceDeliveryOffer serviceDeliveryOffer) {
        this.serviceDeliveryOffer = serviceDeliveryOffer;
        return this;
    }

    public void setServiceDeliveryOffer(ServiceDeliveryOffer serviceDeliveryOffer) {
        this.serviceDeliveryOffer = serviceDeliveryOffer;
    }

    public Set<ProviderReviewLog> getProviderReviewLogs() {
        return providerReviewLogs;
    }

    public ServiceAppointment providerReviewLogs(Set<ProviderReviewLog> providerReviewLogs) {
        this.providerReviewLogs = providerReviewLogs;
        return this;
    }

    public ServiceAppointment addProviderReviewLogs(ProviderReviewLog providerReviewLog) {
        this.providerReviewLogs.add(providerReviewLog);
        providerReviewLog.setServiceAppointment(this);
        return this;
    }

    public ServiceAppointment removeProviderReviewLogs(ProviderReviewLog providerReviewLog) {
        this.providerReviewLogs.remove(providerReviewLog);
        providerReviewLog.setServiceAppointment(null);
        return this;
    }

    public void setProviderReviewLogs(Set<ProviderReviewLog> providerReviewLogs) {
        this.providerReviewLogs = providerReviewLogs;
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
        ServiceAppointment serviceAppointment = (ServiceAppointment) o;
        if (serviceAppointment.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), serviceAppointment.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ServiceAppointment{" +
            "id=" + getId() +
            ", serviceDeliverOn='" + getServiceDeliverOn() + "'" +
            ", serviceStartTime='" + getServiceStartTime() + "'" +
            ", serviceEndTime='" + getServiceEndTime() + "'" +
            "}";
    }
}
