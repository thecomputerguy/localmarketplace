package com.localmarketplace.domain;

import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * not an ignored comment
 */
@ApiModel(description = "not an ignored comment")
@Entity
@Table(name = "provider_review_log")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ProviderReviewLog implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "punctuality_rating")
    private Long punctualityRating;

    @Column(name = "proficiency_rating")
    private Long proficiencyRating;

    @Column(name = "etiquattes_rating")
    private Long etiquattesRating;

    @Column(name = "communication_rating")
    private Long communicationRating;

    @Column(name = "price_rating")
    private Long priceRating;

    @Column(name = "overall_rating")
    private Long overallRating;

    @Column(name = "review")
    private Long review;

    @Column(name = "review_date")
    private Instant reviewDate;

    @ManyToOne
    private ServiceAppointment serviceAppointment;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPunctualityRating() {
        return punctualityRating;
    }

    public ProviderReviewLog punctualityRating(Long punctualityRating) {
        this.punctualityRating = punctualityRating;
        return this;
    }

    public void setPunctualityRating(Long punctualityRating) {
        this.punctualityRating = punctualityRating;
    }

    public Long getProficiencyRating() {
        return proficiencyRating;
    }

    public ProviderReviewLog proficiencyRating(Long proficiencyRating) {
        this.proficiencyRating = proficiencyRating;
        return this;
    }

    public void setProficiencyRating(Long proficiencyRating) {
        this.proficiencyRating = proficiencyRating;
    }

    public Long getEtiquattesRating() {
        return etiquattesRating;
    }

    public ProviderReviewLog etiquattesRating(Long etiquattesRating) {
        this.etiquattesRating = etiquattesRating;
        return this;
    }

    public void setEtiquattesRating(Long etiquattesRating) {
        this.etiquattesRating = etiquattesRating;
    }

    public Long getCommunicationRating() {
        return communicationRating;
    }

    public ProviderReviewLog communicationRating(Long communicationRating) {
        this.communicationRating = communicationRating;
        return this;
    }

    public void setCommunicationRating(Long communicationRating) {
        this.communicationRating = communicationRating;
    }

    public Long getPriceRating() {
        return priceRating;
    }

    public ProviderReviewLog priceRating(Long priceRating) {
        this.priceRating = priceRating;
        return this;
    }

    public void setPriceRating(Long priceRating) {
        this.priceRating = priceRating;
    }

    public Long getOverallRating() {
        return overallRating;
    }

    public ProviderReviewLog overallRating(Long overallRating) {
        this.overallRating = overallRating;
        return this;
    }

    public void setOverallRating(Long overallRating) {
        this.overallRating = overallRating;
    }

    public Long getReview() {
        return review;
    }

    public ProviderReviewLog review(Long review) {
        this.review = review;
        return this;
    }

    public void setReview(Long review) {
        this.review = review;
    }

    public Instant getReviewDate() {
        return reviewDate;
    }

    public ProviderReviewLog reviewDate(Instant reviewDate) {
        this.reviewDate = reviewDate;
        return this;
    }

    public void setReviewDate(Instant reviewDate) {
        this.reviewDate = reviewDate;
    }

    public ServiceAppointment getServiceAppointment() {
        return serviceAppointment;
    }

    public ProviderReviewLog serviceAppointment(ServiceAppointment serviceAppointment) {
        this.serviceAppointment = serviceAppointment;
        return this;
    }

    public void setServiceAppointment(ServiceAppointment serviceAppointment) {
        this.serviceAppointment = serviceAppointment;
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
        ProviderReviewLog providerReviewLog = (ProviderReviewLog) o;
        if (providerReviewLog.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), providerReviewLog.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProviderReviewLog{" +
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
