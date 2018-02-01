package com.localmarketplace.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Provider.
 */
@Entity
@Table(name = "provider")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Provider implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

 /*   @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "mobile_number")
    private Long mobileNumber;

    @Column(name = "is_individual")
    private Boolean isIndividual;

    @Column(name = "is_registered_office")
    private Boolean isRegisteredOffice;

    @Column(name = "office_address")
    private String officeAddress;

    @Column(name = "zip")
    private Long zip;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "provider")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ProviderRating> ratings = new HashSet<>();

    @OneToMany(mappedBy = "provider")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ServiceProviderMap> serviceProviderMaps = new HashSet<>();
*/
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

   /* public String getFirstName() {
        return firstName;
    }

    public Provider firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Provider lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public Provider email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getMobileNumber() {
        return mobileNumber;
    }

    public Provider mobileNumber(Long mobileNumber) {
        this.mobileNumber = mobileNumber;
        return this;
    }

    public void setMobileNumber(Long mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public Boolean isIsIndividual() {
        return isIndividual;
    }

    public Provider isIndividual(Boolean isIndividual) {
        this.isIndividual = isIndividual;
        return this;
    }

    public void setIsIndividual(Boolean isIndividual) {
        this.isIndividual = isIndividual;
    }

    public Boolean isIsRegisteredOffice() {
        return isRegisteredOffice;
    }

    public Provider isRegisteredOffice(Boolean isRegisteredOffice) {
        this.isRegisteredOffice = isRegisteredOffice;
        return this;
    }

    public void setIsRegisteredOffice(Boolean isRegisteredOffice) {
        this.isRegisteredOffice = isRegisteredOffice;
    }

    public String getOfficeAddress() {
        return officeAddress;
    }

    public Provider officeAddress(String officeAddress) {
        this.officeAddress = officeAddress;
        return this;
    }

    public void setOfficeAddress(String officeAddress) {
        this.officeAddress = officeAddress;
    }

    public Long getZip() {
        return zip;
    }

    public Provider zip(Long zip) {
        this.zip = zip;
        return this;
    }

    public void setZip(Long zip) {
        this.zip = zip;
    }

    public String getDescription() {
        return description;
    }

    public Provider description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<ProviderRating> getRatings() {
        return ratings;
    }

    public Provider ratings(Set<ProviderRating> providerRatings) {
        this.ratings = providerRatings;
        return this;
    }

    public Provider addRatings(ProviderRating providerRating) {
        this.ratings.add(providerRating);
        providerRating.setProvider(this);
        return this;
    }

    public Provider removeRatings(ProviderRating providerRating) {
        this.ratings.remove(providerRating);
        providerRating.setProvider(null);
        return this;
    }

    public void setRatings(Set<ProviderRating> providerRatings) {
        this.ratings = providerRatings;
    }

    public Set<ServiceProviderMap> getServiceProviderMaps() {
        return serviceProviderMaps;
    }

    public Provider serviceProviderMaps(Set<ServiceProviderMap> serviceProviderMaps) {
        this.serviceProviderMaps = serviceProviderMaps;
        return this;
    }

    public Provider addServiceProviderMap(ServiceProviderMap serviceProviderMap) {
        this.serviceProviderMaps.add(serviceProviderMap);
        serviceProviderMap.setProvider(this);
        return this;
    }

    public Provider removeServiceProviderMap(ServiceProviderMap serviceProviderMap) {
        this.serviceProviderMaps.remove(serviceProviderMap);
        serviceProviderMap.setProvider(null);
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
        Provider provider = (Provider) o;
        if (provider.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), provider.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Provider{" +
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
    }*/
}
