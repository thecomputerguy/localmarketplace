package com.localmarketplace.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the ProviderRating entity.
 */
public class ProviderRatingDTO implements Serializable {

    private Long id;

    private Long avgPunctualityRating;

    private Long avgProfRating;

    private Long avgEtiRating;

    private Long avgCommRating;

    private Long avgPriceRating;

    private Long avgOverallRating;

    private Long lastUpdatedOn;

    private Long providerId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAvgPunctualityRating() {
        return avgPunctualityRating;
    }

    public void setAvgPunctualityRating(Long avgPunctualityRating) {
        this.avgPunctualityRating = avgPunctualityRating;
    }

    public Long getAvgProfRating() {
        return avgProfRating;
    }

    public void setAvgProfRating(Long avgProfRating) {
        this.avgProfRating = avgProfRating;
    }

    public Long getAvgEtiRating() {
        return avgEtiRating;
    }

    public void setAvgEtiRating(Long avgEtiRating) {
        this.avgEtiRating = avgEtiRating;
    }

    public Long getAvgCommRating() {
        return avgCommRating;
    }

    public void setAvgCommRating(Long avgCommRating) {
        this.avgCommRating = avgCommRating;
    }

    public Long getAvgPriceRating() {
        return avgPriceRating;
    }

    public void setAvgPriceRating(Long avgPriceRating) {
        this.avgPriceRating = avgPriceRating;
    }

    public Long getAvgOverallRating() {
        return avgOverallRating;
    }

    public void setAvgOverallRating(Long avgOverallRating) {
        this.avgOverallRating = avgOverallRating;
    }

    public Long getLastUpdatedOn() {
        return lastUpdatedOn;
    }

    public void setLastUpdatedOn(Long lastUpdatedOn) {
        this.lastUpdatedOn = lastUpdatedOn;
    }

    public Long getProviderId() {
        return providerId;
    }

    public void setProviderId(Long providerId) {
        this.providerId = providerId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ProviderRatingDTO providerRatingDTO = (ProviderRatingDTO) o;
        if(providerRatingDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), providerRatingDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProviderRatingDTO{" +
            "id=" + getId() +
            ", avgPunctualityRating=" + getAvgPunctualityRating() +
            ", avgProfRating=" + getAvgProfRating() +
            ", avgEtiRating=" + getAvgEtiRating() +
            ", avgCommRating=" + getAvgCommRating() +
            ", avgPriceRating=" + getAvgPriceRating() +
            ", avgOverallRating=" + getAvgOverallRating() +
            ", lastUpdatedOn=" + getLastUpdatedOn() +
            "}";
    }
}
