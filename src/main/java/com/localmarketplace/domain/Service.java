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
 * Service entity.
 * @author Varun Sharma.
 */
@ApiModel(description = "Service entity. @author Varun Sharma.")
@Entity
@Table(name = "service")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Service implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "service_name")
    private String serviceName;

    @ManyToOne
    private ServiceCategory serviceCategory;

    @OneToMany(mappedBy = "service")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ServiceProviderMap> serviceProviderMaps = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getServiceName() {
        return serviceName;
    }

    public Service serviceName(String serviceName) {
        this.serviceName = serviceName;
        return this;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public ServiceCategory getServiceCategory() {
        return serviceCategory;
    }

    public Service serviceCategory(ServiceCategory serviceCategory) {
        this.serviceCategory = serviceCategory;
        return this;
    }

    public void setServiceCategory(ServiceCategory serviceCategory) {
        this.serviceCategory = serviceCategory;
    }

    public Set<ServiceProviderMap> getServiceProviderMaps() {
        return serviceProviderMaps;
    }

    public Service serviceProviderMaps(Set<ServiceProviderMap> serviceProviderMaps) {
        this.serviceProviderMaps = serviceProviderMaps;
        return this;
    }

    public Service addServiceProviderMap(ServiceProviderMap serviceProviderMap) {
        this.serviceProviderMaps.add(serviceProviderMap);
        serviceProviderMap.setService(this);
        return this;
    }

    public Service removeServiceProviderMap(ServiceProviderMap serviceProviderMap) {
        this.serviceProviderMaps.remove(serviceProviderMap);
        serviceProviderMap.setService(null);
        return this;
    }

    public void setServiceProviderMaps(Set<ServiceProviderMap> serviceProviderMaps) {
        this.serviceProviderMaps = serviceProviderMaps;
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
        Service service = (Service) o;
        if (service.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), service.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Service{" +
            "id=" + getId() +
            ", serviceName='" + getServiceName() + "'" +
            "}";
    }
}
