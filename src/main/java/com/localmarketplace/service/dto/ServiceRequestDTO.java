package com.localmarketplace.service.dto;


import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the ServiceRequest entity.
 */
public class ServiceRequestDTO implements Serializable {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Long id;

    private String requirementDescription;

    private Instant serviceRequiredOn;

    private Instant expectedStartTime;

    private Long tentativeEffortsRequiredInHours;

    private Long userId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRequirementDescription() {
        return requirementDescription;
    }

    public void setRequirementDescription(String requirementDescription) {
        this.requirementDescription = requirementDescription;
    }

    public Instant getServiceRequiredOn() {
        return serviceRequiredOn;
    }

    public void setServiceRequiredOn(Instant serviceRequiredOn) {
        this.serviceRequiredOn = serviceRequiredOn;
    }

    public Instant getExpectedStartTime() {
        return expectedStartTime;
    }

    public void setExpectedStartTime(Instant expectedStartTime) {
        this.expectedStartTime = expectedStartTime;
    }

    public Long getTentativeEffortsRequiredInHours() {
        return tentativeEffortsRequiredInHours;
    }

    public void setTentativeEffortsRequiredInHours(Long tentativeEffortsRequiredInHours) {
        this.tentativeEffortsRequiredInHours = tentativeEffortsRequiredInHours;
    }

    public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	@Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ServiceRequestDTO serviceRequestDTO = (ServiceRequestDTO) o;
        if(serviceRequestDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), serviceRequestDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ServiceRequestDTO{" +
            "id=" + getId() +
            ", requirementDescription='" + getRequirementDescription() + "'" +
            ", serviceRequiredOn='" + getServiceRequiredOn() + "'" +
            ", expectedStartTime='" + getExpectedStartTime() + "'" +
            ", tentativeEffortsRequiredInHours=" + getTentativeEffortsRequiredInHours() +
            "}";
    }
}
