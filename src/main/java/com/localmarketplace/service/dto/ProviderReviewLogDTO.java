package com.localmarketplace.service.dto;


import java.time.Instant;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the ProviderReviewLog entity.
 */
public class ProviderReviewLogDTO implements Serializable {

    private Long id;

    private Long punctualityRating;

    private Long proficiencyRating;

    private Long etiquattesRating;

    private Long communicationRating;

    private Long priceRating;

    private Long overallRating;

    private Long review;

    private Instant reviewDate;

    private Long serviceAppointmentId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPunctualityRating() {
        return punctualityRating;
    }

    public void setPunctualityRating(Long punctualityRating) {
        this.punctualityRating = punctualityRating;
    }

    public Long getProficiencyRating() {
        return proficiencyRating;
    }

    public void setProficiencyRating(Long proficiencyRating) {
        this.proficiencyRating = proficiencyRating;
    }

    public Long getEtiquattesRating() {
        return etiquattesRating;
    }

    public void setEtiquattesRating(Long etiquattesRating) {
        this.etiquattesRating = etiquattesRating;
    }

    public Long getCommunicationRating() {
        return communicationRating;
    }

    public void setCommunicationRating(Long communicationRating) {
        this.communicationRating = communicationRating;
    }

    public Long getPriceRating() {
        return priceRating;
    }

    public void setPriceRating(Long priceRating) {
        this.priceRating = priceRating;
    }

    public Long getOverallRating() {
        return overallRating;
    }

    public void setOverallRating(Long overallRating) {
        this.overallRating = overallRating;
    }

    public Long getReview() {
        return review;
    }

    public void setReview(Long review) {
        this.review = review;
    }

    public Instant getReviewDate() {
        return reviewDate;
    }

    public void setReviewDate(Instant reviewDate) {
        this.reviewDate = reviewDate;
    }

    public Long getServiceAppointmentId() {
        return serviceAppointmentId;
    }

    public void setServiceAppointmentId(Long serviceAppointmentId) {
        this.serviceAppointmentId = serviceAppointmentId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ProviderReviewLogDTO providerReviewLogDTO = (ProviderReviewLogDTO) o;
        if(providerReviewLogDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), providerReviewLogDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProviderReviewLogDTO{" +
            "id=" + getId() +
            ", punctualityRating=" + getPunctualityRating() +
            ", proficiencyRating=" + getProficiencyRating() +
            ", etiquattesRating=" + getEtiquattesRating() +
            ", communicationRating=" + getCommunicationRating() +
            ", priceRating=" + getPriceRating() +
            ", overallRating=" + getOverallRating() +
            ", review=" + getReview() +
            ", reviewDate='" + getReviewDate() + "'" +
            "}";
    }
}
