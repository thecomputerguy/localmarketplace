package com.localmarketplace.web.rest;

import com.localmarketplace.LocalmarketplaceApp;

import com.localmarketplace.domain.ServiceDeliveryOffer;
import com.localmarketplace.repository.ServiceDeliveryOfferRepository;
import com.localmarketplace.service.ServiceDeliveryOfferService;
import com.localmarketplace.service.dto.ServiceDeliveryOfferDTO;
import com.localmarketplace.service.mapper.ServiceDeliveryOfferMapper;
import com.localmarketplace.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.localmarketplace.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ServiceDeliveryOfferResource REST controller.
 *
 * @see ServiceDeliveryOfferResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LocalmarketplaceApp.class)
public class ServiceDeliveryOfferResourceIntTest {

    private static final Double DEFAULT_DISCOUNT_IN_PERCENTAGE = 1D;
    private static final Double UPDATED_DISCOUNT_IN_PERCENTAGE = 2D;

    private static final Double DEFAULT_ESTIMATED_COST = 1D;
    private static final Double UPDATED_ESTIMATED_COST = 2D;

    private static final Instant DEFAULT_OFFER_SUBMIT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_OFFER_SUBMIT_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Boolean DEFAULT_IS_OFFER_ACCEPTED = false;
    private static final Boolean UPDATED_IS_OFFER_ACCEPTED = true;

    @Autowired
    private ServiceDeliveryOfferRepository serviceDeliveryOfferRepository;

    @Autowired
    private ServiceDeliveryOfferMapper serviceDeliveryOfferMapper;

    @Autowired
    private ServiceDeliveryOfferService serviceDeliveryOfferService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restServiceDeliveryOfferMockMvc;

    private ServiceDeliveryOffer serviceDeliveryOffer;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ServiceDeliveryOfferResource serviceDeliveryOfferResource = new ServiceDeliveryOfferResource(serviceDeliveryOfferService);
        this.restServiceDeliveryOfferMockMvc = MockMvcBuilders.standaloneSetup(serviceDeliveryOfferResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ServiceDeliveryOffer createEntity(EntityManager em) {
        ServiceDeliveryOffer serviceDeliveryOffer = new ServiceDeliveryOffer()
            .discountInPercentage(DEFAULT_DISCOUNT_IN_PERCENTAGE)
            .estimatedCost(DEFAULT_ESTIMATED_COST)
            .offerSubmitDate(DEFAULT_OFFER_SUBMIT_DATE)
            .isOfferAccepted(DEFAULT_IS_OFFER_ACCEPTED);
        return serviceDeliveryOffer;
    }

    @Before
    public void initTest() {
        serviceDeliveryOffer = createEntity(em);
    }

    @Test
    @Transactional
    public void createServiceDeliveryOffer() throws Exception {
        int databaseSizeBeforeCreate = serviceDeliveryOfferRepository.findAll().size();

        // Create the ServiceDeliveryOffer
        ServiceDeliveryOfferDTO serviceDeliveryOfferDTO = serviceDeliveryOfferMapper.toDto(serviceDeliveryOffer);
        restServiceDeliveryOfferMockMvc.perform(post("/api/service-delivery-offers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(serviceDeliveryOfferDTO)))
            .andExpect(status().isCreated());

        // Validate the ServiceDeliveryOffer in the database
        List<ServiceDeliveryOffer> serviceDeliveryOfferList = serviceDeliveryOfferRepository.findAll();
        assertThat(serviceDeliveryOfferList).hasSize(databaseSizeBeforeCreate + 1);
        ServiceDeliveryOffer testServiceDeliveryOffer = serviceDeliveryOfferList.get(serviceDeliveryOfferList.size() - 1);
        assertThat(testServiceDeliveryOffer.getDiscountInPercentage()).isEqualTo(DEFAULT_DISCOUNT_IN_PERCENTAGE);
        assertThat(testServiceDeliveryOffer.getEstimatedCost()).isEqualTo(DEFAULT_ESTIMATED_COST);
        assertThat(testServiceDeliveryOffer.getOfferSubmitDate()).isEqualTo(DEFAULT_OFFER_SUBMIT_DATE);
        assertThat(testServiceDeliveryOffer.isIsOfferAccepted()).isEqualTo(DEFAULT_IS_OFFER_ACCEPTED);
    }

    @Test
    @Transactional
    public void createServiceDeliveryOfferWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = serviceDeliveryOfferRepository.findAll().size();

        // Create the ServiceDeliveryOffer with an existing ID
        serviceDeliveryOffer.setId(1L);
        ServiceDeliveryOfferDTO serviceDeliveryOfferDTO = serviceDeliveryOfferMapper.toDto(serviceDeliveryOffer);

        // An entity with an existing ID cannot be created, so this API call must fail
        restServiceDeliveryOfferMockMvc.perform(post("/api/service-delivery-offers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(serviceDeliveryOfferDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ServiceDeliveryOffer in the database
        List<ServiceDeliveryOffer> serviceDeliveryOfferList = serviceDeliveryOfferRepository.findAll();
        assertThat(serviceDeliveryOfferList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllServiceDeliveryOffers() throws Exception {
        // Initialize the database
        serviceDeliveryOfferRepository.saveAndFlush(serviceDeliveryOffer);

        // Get all the serviceDeliveryOfferList
        restServiceDeliveryOfferMockMvc.perform(get("/api/service-delivery-offers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(serviceDeliveryOffer.getId().intValue())))
            .andExpect(jsonPath("$.[*].discountInPercentage").value(hasItem(DEFAULT_DISCOUNT_IN_PERCENTAGE.doubleValue())))
            .andExpect(jsonPath("$.[*].estimatedCost").value(hasItem(DEFAULT_ESTIMATED_COST.doubleValue())))
            .andExpect(jsonPath("$.[*].offerSubmitDate").value(hasItem(DEFAULT_OFFER_SUBMIT_DATE.toString())))
            .andExpect(jsonPath("$.[*].isOfferAccepted").value(hasItem(DEFAULT_IS_OFFER_ACCEPTED.booleanValue())));
    }

    @Test
    @Transactional
    public void getServiceDeliveryOffer() throws Exception {
        // Initialize the database
        serviceDeliveryOfferRepository.saveAndFlush(serviceDeliveryOffer);

        // Get the serviceDeliveryOffer
        restServiceDeliveryOfferMockMvc.perform(get("/api/service-delivery-offers/{id}", serviceDeliveryOffer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(serviceDeliveryOffer.getId().intValue()))
            .andExpect(jsonPath("$.discountInPercentage").value(DEFAULT_DISCOUNT_IN_PERCENTAGE.doubleValue()))
            .andExpect(jsonPath("$.estimatedCost").value(DEFAULT_ESTIMATED_COST.doubleValue()))
            .andExpect(jsonPath("$.offerSubmitDate").value(DEFAULT_OFFER_SUBMIT_DATE.toString()))
            .andExpect(jsonPath("$.isOfferAccepted").value(DEFAULT_IS_OFFER_ACCEPTED.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingServiceDeliveryOffer() throws Exception {
        // Get the serviceDeliveryOffer
        restServiceDeliveryOfferMockMvc.perform(get("/api/service-delivery-offers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateServiceDeliveryOffer() throws Exception {
        // Initialize the database
        serviceDeliveryOfferRepository.saveAndFlush(serviceDeliveryOffer);
        int databaseSizeBeforeUpdate = serviceDeliveryOfferRepository.findAll().size();

        // Update the serviceDeliveryOffer
        ServiceDeliveryOffer updatedServiceDeliveryOffer = serviceDeliveryOfferRepository.findOne(serviceDeliveryOffer.getId());
        // Disconnect from session so that the updates on updatedServiceDeliveryOffer are not directly saved in db
        em.detach(updatedServiceDeliveryOffer);
        updatedServiceDeliveryOffer
            .discountInPercentage(UPDATED_DISCOUNT_IN_PERCENTAGE)
            .estimatedCost(UPDATED_ESTIMATED_COST)
            .offerSubmitDate(UPDATED_OFFER_SUBMIT_DATE)
            .isOfferAccepted(UPDATED_IS_OFFER_ACCEPTED);
        ServiceDeliveryOfferDTO serviceDeliveryOfferDTO = serviceDeliveryOfferMapper.toDto(updatedServiceDeliveryOffer);

        restServiceDeliveryOfferMockMvc.perform(put("/api/service-delivery-offers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(serviceDeliveryOfferDTO)))
            .andExpect(status().isOk());

        // Validate the ServiceDeliveryOffer in the database
        List<ServiceDeliveryOffer> serviceDeliveryOfferList = serviceDeliveryOfferRepository.findAll();
        assertThat(serviceDeliveryOfferList).hasSize(databaseSizeBeforeUpdate);
        ServiceDeliveryOffer testServiceDeliveryOffer = serviceDeliveryOfferList.get(serviceDeliveryOfferList.size() - 1);
        assertThat(testServiceDeliveryOffer.getDiscountInPercentage()).isEqualTo(UPDATED_DISCOUNT_IN_PERCENTAGE);
        assertThat(testServiceDeliveryOffer.getEstimatedCost()).isEqualTo(UPDATED_ESTIMATED_COST);
        assertThat(testServiceDeliveryOffer.getOfferSubmitDate()).isEqualTo(UPDATED_OFFER_SUBMIT_DATE);
        assertThat(testServiceDeliveryOffer.isIsOfferAccepted()).isEqualTo(UPDATED_IS_OFFER_ACCEPTED);
    }

    @Test
    @Transactional
    public void updateNonExistingServiceDeliveryOffer() throws Exception {
        int databaseSizeBeforeUpdate = serviceDeliveryOfferRepository.findAll().size();

        // Create the ServiceDeliveryOffer
        ServiceDeliveryOfferDTO serviceDeliveryOfferDTO = serviceDeliveryOfferMapper.toDto(serviceDeliveryOffer);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restServiceDeliveryOfferMockMvc.perform(put("/api/service-delivery-offers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(serviceDeliveryOfferDTO)))
            .andExpect(status().isCreated());

        // Validate the ServiceDeliveryOffer in the database
        List<ServiceDeliveryOffer> serviceDeliveryOfferList = serviceDeliveryOfferRepository.findAll();
        assertThat(serviceDeliveryOfferList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteServiceDeliveryOffer() throws Exception {
        // Initialize the database
        serviceDeliveryOfferRepository.saveAndFlush(serviceDeliveryOffer);
        int databaseSizeBeforeDelete = serviceDeliveryOfferRepository.findAll().size();

        // Get the serviceDeliveryOffer
        restServiceDeliveryOfferMockMvc.perform(delete("/api/service-delivery-offers/{id}", serviceDeliveryOffer.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ServiceDeliveryOffer> serviceDeliveryOfferList = serviceDeliveryOfferRepository.findAll();
        assertThat(serviceDeliveryOfferList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ServiceDeliveryOffer.class);
        ServiceDeliveryOffer serviceDeliveryOffer1 = new ServiceDeliveryOffer();
        serviceDeliveryOffer1.setId(1L);
        ServiceDeliveryOffer serviceDeliveryOffer2 = new ServiceDeliveryOffer();
        serviceDeliveryOffer2.setId(serviceDeliveryOffer1.getId());
        assertThat(serviceDeliveryOffer1).isEqualTo(serviceDeliveryOffer2);
        serviceDeliveryOffer2.setId(2L);
        assertThat(serviceDeliveryOffer1).isNotEqualTo(serviceDeliveryOffer2);
        serviceDeliveryOffer1.setId(null);
        assertThat(serviceDeliveryOffer1).isNotEqualTo(serviceDeliveryOffer2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ServiceDeliveryOfferDTO.class);
        ServiceDeliveryOfferDTO serviceDeliveryOfferDTO1 = new ServiceDeliveryOfferDTO();
        serviceDeliveryOfferDTO1.setId(1L);
        ServiceDeliveryOfferDTO serviceDeliveryOfferDTO2 = new ServiceDeliveryOfferDTO();
        assertThat(serviceDeliveryOfferDTO1).isNotEqualTo(serviceDeliveryOfferDTO2);
        serviceDeliveryOfferDTO2.setId(serviceDeliveryOfferDTO1.getId());
        assertThat(serviceDeliveryOfferDTO1).isEqualTo(serviceDeliveryOfferDTO2);
        serviceDeliveryOfferDTO2.setId(2L);
        assertThat(serviceDeliveryOfferDTO1).isNotEqualTo(serviceDeliveryOfferDTO2);
        serviceDeliveryOfferDTO1.setId(null);
        assertThat(serviceDeliveryOfferDTO1).isNotEqualTo(serviceDeliveryOfferDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(serviceDeliveryOfferMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(serviceDeliveryOfferMapper.fromId(null)).isNull();
    }
}
