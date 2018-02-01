package com.localmarketplace.config;

import java.util.concurrent.TimeUnit;

import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.github.jhipster.config.JHipsterProperties;

@Configuration
@EnableCaching
@AutoConfigureAfter(value = { MetricsConfiguration.class })
@AutoConfigureBefore(value = { WebConfigurer.class, DatabaseConfiguration.class })
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.localmarketplace.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.localmarketplace.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.localmarketplace.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.localmarketplace.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.localmarketplace.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.localmarketplace.domain.PersistentToken.class.getName(), jcacheConfiguration);
            cm.createCache(com.localmarketplace.domain.User.class.getName() + ".persistentTokens", jcacheConfiguration);
            cm.createCache(com.localmarketplace.domain.SocialUserConnection.class.getName(), jcacheConfiguration);
           /* cm.createCache(com.localmarketplace.domain.Provider.class.getName(), jcacheConfiguration);
            cm.createCache(com.localmarketplace.domain.Provider.class.getName() + ".ratings", jcacheConfiguration);
            cm.createCache(com.localmarketplace.domain.Provider.class.getName() + ".serviceProviderMaps", jcacheConfiguration);*/
            cm.createCache(com.localmarketplace.domain.ProviderRating.class.getName(), jcacheConfiguration);
            cm.createCache(com.localmarketplace.domain.ProviderReviewLog.class.getName(), jcacheConfiguration);
            cm.createCache(com.localmarketplace.domain.ServiceCategory.class.getName(), jcacheConfiguration);
            cm.createCache(com.localmarketplace.domain.ServiceCategory.class.getName() + ".services", jcacheConfiguration);
            cm.createCache(com.localmarketplace.domain.Service.class.getName(), jcacheConfiguration);
            cm.createCache(com.localmarketplace.domain.Service.class.getName() + ".serviceProviderMaps", jcacheConfiguration);
            cm.createCache(com.localmarketplace.domain.ServiceProviderMap.class.getName(), jcacheConfiguration);
            cm.createCache(com.localmarketplace.domain.ServiceProviderMap.class.getName() + ".serviceDeliveryOffers", jcacheConfiguration);
            /*cm.createCache(com.localmarketplace.domain.Customer.class.getName(), jcacheConfiguration);
            cm.createCache(com.localmarketplace.domain.Customer.class.getName() + ".addresses", jcacheConfiguration);
            cm.createCache(com.localmarketplace.domain.Customer.class.getName() + ".serviceRequests", jcacheConfiguration);*/
            cm.createCache(com.localmarketplace.domain.Address.class.getName(), jcacheConfiguration);
            cm.createCache(com.localmarketplace.domain.ServiceDeliveryOffer.class.getName(), jcacheConfiguration);
            cm.createCache(com.localmarketplace.domain.ServiceDeliveryOffer.class.getName() + ".serviceAppointments", jcacheConfiguration);
            cm.createCache(com.localmarketplace.domain.ServiceRequest.class.getName(), jcacheConfiguration);
            cm.createCache(com.localmarketplace.domain.ServiceRequest.class.getName() + ".serviceDeliveryOffers", jcacheConfiguration);
            cm.createCache(com.localmarketplace.domain.ServiceAppointment.class.getName(), jcacheConfiguration);
            cm.createCache(com.localmarketplace.domain.ServiceAppointment.class.getName() + ".providerReviewLogs", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
