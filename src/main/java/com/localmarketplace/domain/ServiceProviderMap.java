package com.localmarketplace.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * The ServiceProviderMap entity.
 */
@ApiModel(description = "The ServiceProviderMap entity.")
@Entity
@Table(name = "service_provider_map")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ServiceProviderMap implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "billing_rate_per_hour")
    private Long billingRatePerHour;

    @Column(name = "experience_in_months")
    private Long experienceInMonths;

    @Column(name = "service_offering_description")
    private String serviceOfferingDescription;

    @ManyToOne
    private Provider provider;

    @ManyToOne
    private Service service;

    @OneToMany(mappedBy = "serviceProviderMap")
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

    public Long getBillingRatePerHour() {
        return billingRatePerHour;
    }

    public ServiceProviderMap billingRatePerHour(Long billingRatePerHour) {
        this.billingRatePerHour = billingRatePerHour;
        return this;
    }

    public void setBillingRatePerHour(Long billingRatePerHour) {
        this.billingRatePerHour = billingRatePerHour;
    }

    public Long getExperienceInMonths() {
        return experienceInMonths;
    }

    public ServiceProviderMap experienceInMonths(Long experienceInMonths) {
        this.experienceInMonths = experienceInMonths;
        return this;
    }

    public void setExperienceInMonths(Long experienceInMonths) {
        this.experienceInMonths = experienceInMonths;
    }

    public String getServiceOfferingDescription() {
        return serviceOfferingDescription;
    }

    public ServiceProviderMap serviceOfferingDescription(String serviceOfferingDescription) {
        this.serviceOfferingDescription = serviceOfferingDescription;
        return this;
    }

    public void setServiceOfferingDescription(String serviceOfferingDescription) {
        this.serviceOfferingDescription = serviceOfferingDescription;
    }

    public Provider getProvider() {
        return provider;
    }

    public ServiceProviderMap provider(Provider provider) {
        this.provider = provider;
        return this;
    }

    public void setProvider(Provider provider) {
        this.provider = provider;
    }

    public Service getService() {
        return service;
    }

    public ServiceProviderMap service(Service service) {
        this.service = service;
        return this;
    }

    public void setService(Service service) {
        this.service = service;
    }

    public Set<ServiceDeliveryOffer> getServiceDeliveryOffers() {
        return serviceDeliveryOffers;
    }

    public ServiceProviderMap serviceDeliveryOffers(Set<ServiceDeliveryOffer> serviceDeliveryOffers) {
        this.serviceDeliveryOffers = serviceDeliveryOffers;
        return this;
    }

    public ServiceProviderMap addServiceDeliveryOffers(ServiceDeliveryOffer serviceDeliveryOffer) {
        this.serviceDeliveryOffers.add(serviceDeliveryOffer);
        serviceDeliveryOffer.setServiceProviderMap(this);
        return this;
    }

    public ServiceProviderMap removeServiceDeliveryOffers(ServiceDeliveryOffer serviceDeliveryOffer) {
        this.serviceDeliveryOffers.remove(serviceDeliveryOffer);
        serviceDeliveryOffer.setServiceProviderMap(null);
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
        ServiceProviderMap serviceProviderMap = (ServiceProviderMap) o;
        if (serviceProviderMap.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), serviceProviderMap.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ServiceProviderMap{" +
            "id=" + getId() +
            ", billingRatePerHour=" + getBillingRatePerHour() +
            ", experienceInMonths=" + getExperienceInMonths() +
            ", serviceOfferingDescription='" + getServiceOfferingDescription() + "'" +
            "}";
    }
}
