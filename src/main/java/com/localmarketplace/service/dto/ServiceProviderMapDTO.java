package com.localmarketplace.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the ServiceProviderMap entity.
 */
public class ServiceProviderMapDTO implements Serializable {

    private Long id;

    private Long billingRatePerHour;

    private Long experienceInMonths;

    private String serviceOfferingDescription;

    private Long userId;

    private Long serviceId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getBillingRatePerHour() {
        return billingRatePerHour;
    }

    public void setBillingRatePerHour(Long billingRatePerHour) {
        this.billingRatePerHour = billingRatePerHour;
    }

    public Long getExperienceInMonths() {
        return experienceInMonths;
    }

    public void setExperienceInMonths(Long experienceInMonths) {
        this.experienceInMonths = experienceInMonths;
    }

    public String getServiceOfferingDescription() {
        return serviceOfferingDescription;
    }

    public void setServiceOfferingDescription(String serviceOfferingDescription) {
        this.serviceOfferingDescription = serviceOfferingDescription;
    }

    public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Long getServiceId() {
        return serviceId;
    }

    public void setServiceId(Long serviceId) {
        this.serviceId = serviceId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ServiceProviderMapDTO serviceProviderMapDTO = (ServiceProviderMapDTO) o;
        if(serviceProviderMapDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), serviceProviderMapDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ServiceProviderMapDTO{" +
            "id=" + getId() +
            ", billingRatePerHour=" + getBillingRatePerHour() +
            ", experienceInMonths=" + getExperienceInMonths() +
            ", serviceOfferingDescription='" + getServiceOfferingDescription() + "'" +
            "}";
    }
}
