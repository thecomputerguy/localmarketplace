package com.localmarketplace.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ProviderRating.
 */
@Entity
@Table(name = "provider_rating")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ProviderRating implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "avg_punctuality_rating")
    private Long avgPunctualityRating;

    @Column(name = "avg_prof_rating")
    private Long avgProfRating;

    @Column(name = "avg_eti_rating")
    private Long avgEtiRating;

    @Column(name = "avg_comm_rating")
    private Long avgCommRating;

    @Column(name = "avg_price_rating")
    private Long avgPriceRating;

    @Column(name = "avg_overall_rating")
    private Long avgOverallRating;

    @Column(name = "last_updated_on")
    private Long lastUpdatedOn;

    @ManyToOne
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAvgPunctualityRating() {
        return avgPunctualityRating;
    }

    public ProviderRating avgPunctualityRating(Long avgPunctualityRating) {
        this.avgPunctualityRating = avgPunctualityRating;
        return this;
    }

    public void setAvgPunctualityRating(Long avgPunctualityRating) {
        this.avgPunctualityRating = avgPunctualityRating;
    }

    public Long getAvgProfRating() {
        return avgProfRating;
    }

    public ProviderRating avgProfRating(Long avgProfRating) {
        this.avgProfRating = avgProfRating;
        return this;
    }

    public void setAvgProfRating(Long avgProfRating) {
        this.avgProfRating = avgProfRating;
    }

    public Long getAvgEtiRating() {
        return avgEtiRating;
    }

    public ProviderRating avgEtiRating(Long avgEtiRating) {
        this.avgEtiRating = avgEtiRating;
        return this;
    }

    public void setAvgEtiRating(Long avgEtiRating) {
        this.avgEtiRating = avgEtiRating;
    }

    public Long getAvgCommRating() {
        return avgCommRating;
    }

    public ProviderRating avgCommRating(Long avgCommRating) {
        this.avgCommRating = avgCommRating;
        return this;
    }

    public void setAvgCommRating(Long avgCommRating) {
        this.avgCommRating = avgCommRating;
    }

    public Long getAvgPriceRating() {
        return avgPriceRating;
    }

    public ProviderRating avgPriceRating(Long avgPriceRating) {
        this.avgPriceRating = avgPriceRating;
        return this;
    }

    public void setAvgPriceRating(Long avgPriceRating) {
        this.avgPriceRating = avgPriceRating;
    }

    public Long getAvgOverallRating() {
        return avgOverallRating;
    }

    public ProviderRating avgOverallRating(Long avgOverallRating) {
        this.avgOverallRating = avgOverallRating;
        return this;
    }

    public void setAvgOverallRating(Long avgOverallRating) {
        this.avgOverallRating = avgOverallRating;
    }

    public Long getLastUpdatedOn() {
        return lastUpdatedOn;
    }

    public ProviderRating lastUpdatedOn(Long lastUpdatedOn) {
        this.lastUpdatedOn = lastUpdatedOn;
        return this;
    }

    public void setLastUpdatedOn(Long lastUpdatedOn) {
        this.lastUpdatedOn = lastUpdatedOn;
    }

    public User getUser() {
        return user;
    }

    public ProviderRating User(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
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
        ProviderRating providerRating = (ProviderRating) o;
        if (providerRating.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), providerRating.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProviderRating{" +
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
