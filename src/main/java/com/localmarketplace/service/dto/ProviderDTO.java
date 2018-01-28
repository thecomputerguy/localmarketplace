package com.localmarketplace.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Provider entity.
 */
public class ProviderDTO implements Serializable {

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private Long mobileNumber;

    private Boolean isIndividual;

    private Boolean isRegisteredOffice;

    private String officeAddress;

    private Long zip;

    private String description;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(Long mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public Boolean isIsIndividual() {
        return isIndividual;
    }

    public void setIsIndividual(Boolean isIndividual) {
        this.isIndividual = isIndividual;
    }

    public Boolean isIsRegisteredOffice() {
        return isRegisteredOffice;
    }

    public void setIsRegisteredOffice(Boolean isRegisteredOffice) {
        this.isRegisteredOffice = isRegisteredOffice;
    }

    public String getOfficeAddress() {
        return officeAddress;
    }

    public void setOfficeAddress(String officeAddress) {
        this.officeAddress = officeAddress;
    }

    public Long getZip() {
        return zip;
    }

    public void setZip(Long zip) {
        this.zip = zip;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ProviderDTO providerDTO = (ProviderDTO) o;
        if(providerDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), providerDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProviderDTO{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", email='" + getEmail() + "'" +
            ", mobileNumber=" + getMobileNumber() +
            ", isIndividual='" + isIsIndividual() + "'" +
            ", isRegisteredOffice='" + isIsRegisteredOffice() + "'" +
            ", officeAddress='" + getOfficeAddress() + "'" +
            ", zip=" + getZip() +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
