package com.localmarketplace.web.rest;

import com.localmarketplace.LocalmarketplaceApp;

import com.localmarketplace.domain.ServiceProviderMap;
import com.localmarketplace.repository.ServiceProviderMapRepository;
import com.localmarketplace.service.ServiceProviderMapService;
import com.localmarketplace.service.dto.ServiceProviderMapDTO;
import com.localmarketplace.service.mapper.ServiceProviderMapMapper;
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
import java.util.List;

import static com.localmarketplace.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ServiceProviderMapResource REST controller.
 *
 * @see ServiceProviderMapResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LocalmarketplaceApp.class)
public class ServiceProviderMapResourceIntTest {

    private static final Long DEFAULT_BILLING_RATE_PER_HOUR = 1L;
    private static final Long UPDATED_BILLING_RATE_PER_HOUR = 2L;

    private static final Long DEFAULT_EXPERIENCE_IN_MONTHS = 1L;
    private static final Long UPDATED_EXPERIENCE_IN_MONTHS = 2L;

    private static final String DEFAULT_SERVICE_OFFERING_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_SERVICE_OFFERING_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private ServiceProviderMapRepository serviceProviderMapRepository;

    @Autowired
    private ServiceProviderMapMapper serviceProviderMapMapper;

    @Autowired
    private ServiceProviderMapService serviceProviderMapService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restServiceProviderMapMockMvc;

    private ServiceProviderMap serviceProviderMap;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ServiceProviderMapResource serviceProviderMapResource = new ServiceProviderMapResource(serviceProviderMapService);
        this.restServiceProviderMapMockMvc = MockMvcBuilders.standaloneSetup(serviceProviderMapResource)
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
    public static ServiceProviderMap createEntity(EntityManager em) {
        ServiceProviderMap serviceProviderMap = new ServiceProviderMap()
            .billingRatePerHour(DEFAULT_BILLING_RATE_PER_HOUR)
            .experienceInMonths(DEFAULT_EXPERIENCE_IN_MONTHS)
            .serviceOfferingDescription(DEFAULT_SERVICE_OFFERING_DESCRIPTION);
        return serviceProviderMap;
    }

    @Before
    public void initTest() {
        serviceProviderMap = createEntity(em);
    }

    @Test
    @Transactional
    public void createServiceProviderMap() throws Exception {
        int databaseSizeBeforeCreate = serviceProviderMapRepository.findAll().size();

        // Create the ServiceProviderMap
        ServiceProviderMapDTO serviceProviderMapDTO = serviceProviderMapMapper.toDto(serviceProviderMap);
        restServiceProviderMapMockMvc.perform(post("/api/service-provider-maps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(serviceProviderMapDTO)))
            .andExpect(status().isCreated());

        // Validate the ServiceProviderMap in the database
        List<ServiceProviderMap> serviceProviderMapList = serviceProviderMapRepository.findAll();
        assertThat(serviceProviderMapList).hasSize(databaseSizeBeforeCreate + 1);
        ServiceProviderMap testServiceProviderMap = serviceProviderMapList.get(serviceProviderMapList.size() - 1);
        assertThat(testServiceProviderMap.getBillingRatePerHour()).isEqualTo(DEFAULT_BILLING_RATE_PER_HOUR);
        assertThat(testServiceProviderMap.getExperienceInMonths()).isEqualTo(DEFAULT_EXPERIENCE_IN_MONTHS);
        assertThat(testServiceProviderMap.getServiceOfferingDescription()).isEqualTo(DEFAULT_SERVICE_OFFERING_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createServiceProviderMapWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = serviceProviderMapRepository.findAll().size();

        // Create the ServiceProviderMap with an existing ID
        serviceProviderMap.setId(1L);
        ServiceProviderMapDTO serviceProviderMapDTO = serviceProviderMapMapper.toDto(serviceProviderMap);

        // An entity with an existing ID cannot be created, so this API call must fail
        restServiceProviderMapMockMvc.perform(post("/api/service-provider-maps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(serviceProviderMapDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ServiceProviderMap in the database
        List<ServiceProviderMap> serviceProviderMapList = serviceProviderMapRepository.findAll();
        assertThat(serviceProviderMapList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllServiceProviderMaps() throws Exception {
        // Initialize the database
        serviceProviderMapRepository.saveAndFlush(serviceProviderMap);

        // Get all the serviceProviderMapList
        restServiceProviderMapMockMvc.perform(get("/api/service-provider-maps?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(serviceProviderMap.getId().intValue())))
            .andExpect(jsonPath("$.[*].billingRatePerHour").value(hasItem(DEFAULT_BILLING_RATE_PER_HOUR.intValue())))
            .andExpect(jsonPath("$.[*].experienceInMonths").value(hasItem(DEFAULT_EXPERIENCE_IN_MONTHS.intValue())))
            .andExpect(jsonPath("$.[*].serviceOfferingDescription").value(hasItem(DEFAULT_SERVICE_OFFERING_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getServiceProviderMap() throws Exception {
        // Initialize the database
        serviceProviderMapRepository.saveAndFlush(serviceProviderMap);

        // Get the serviceProviderMap
        restServiceProviderMapMockMvc.perform(get("/api/service-provider-maps/{id}", serviceProviderMap.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(serviceProviderMap.getId().intValue()))
            .andExpect(jsonPath("$.billingRatePerHour").value(DEFAULT_BILLING_RATE_PER_HOUR.intValue()))
            .andExpect(jsonPath("$.experienceInMonths").value(DEFAULT_EXPERIENCE_IN_MONTHS.intValue()))
            .andExpect(jsonPath("$.serviceOfferingDescription").value(DEFAULT_SERVICE_OFFERING_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingServiceProviderMap() throws Exception {
        // Get the serviceProviderMap
        restServiceProviderMapMockMvc.perform(get("/api/service-provider-maps/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateServiceProviderMap() throws Exception {
        // Initialize the database
        serviceProviderMapRepository.saveAndFlush(serviceProviderMap);
        int databaseSizeBeforeUpdate = serviceProviderMapRepository.findAll().size();

        // Update the serviceProviderMap
        ServiceProviderMap updatedServiceProviderMap = serviceProviderMapRepository.findOne(serviceProviderMap.getId());
        // Disconnect from session so that the updates on updatedServiceProviderMap are not directly saved in db
        em.detach(updatedServiceProviderMap);
        updatedServiceProviderMap
            .billingRatePerHour(UPDATED_BILLING_RATE_PER_HOUR)
            .experienceInMonths(UPDATED_EXPERIENCE_IN_MONTHS)
            .serviceOfferingDescription(UPDATED_SERVICE_OFFERING_DESCRIPTION);
        ServiceProviderMapDTO serviceProviderMapDTO = serviceProviderMapMapper.toDto(updatedServiceProviderMap);

        restServiceProviderMapMockMvc.perform(put("/api/service-provider-maps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(serviceProviderMapDTO)))
            .andExpect(status().isOk());

        // Validate the ServiceProviderMap in the database
        List<ServiceProviderMap> serviceProviderMapList = serviceProviderMapRepository.findAll();
        assertThat(serviceProviderMapList).hasSize(databaseSizeBeforeUpdate);
        ServiceProviderMap testServiceProviderMap = serviceProviderMapList.get(serviceProviderMapList.size() - 1);
        assertThat(testServiceProviderMap.getBillingRatePerHour()).isEqualTo(UPDATED_BILLING_RATE_PER_HOUR);
        assertThat(testServiceProviderMap.getExperienceInMonths()).isEqualTo(UPDATED_EXPERIENCE_IN_MONTHS);
        assertThat(testServiceProviderMap.getServiceOfferingDescription()).isEqualTo(UPDATED_SERVICE_OFFERING_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingServiceProviderMap() throws Exception {
        int databaseSizeBeforeUpdate = serviceProviderMapRepository.findAll().size();

        // Create the ServiceProviderMap
        ServiceProviderMapDTO serviceProviderMapDTO = serviceProviderMapMapper.toDto(serviceProviderMap);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restServiceProviderMapMockMvc.perform(put("/api/service-provider-maps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(serviceProviderMapDTO)))
            .andExpect(status().isCreated());

        // Validate the ServiceProviderMap in the database
        List<ServiceProviderMap> serviceProviderMapList = serviceProviderMapRepository.findAll();
        assertThat(serviceProviderMapList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteServiceProviderMap() throws Exception {
        // Initialize the database
        serviceProviderMapRepository.saveAndFlush(serviceProviderMap);
        int databaseSizeBeforeDelete = serviceProviderMapRepository.findAll().size();

        // Get the serviceProviderMap
        restServiceProviderMapMockMvc.perform(delete("/api/service-provider-maps/{id}", serviceProviderMap.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ServiceProviderMap> serviceProviderMapList = serviceProviderMapRepository.findAll();
        assertThat(serviceProviderMapList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ServiceProviderMap.class);
        ServiceProviderMap serviceProviderMap1 = new ServiceProviderMap();
        serviceProviderMap1.setId(1L);
        ServiceProviderMap serviceProviderMap2 = new ServiceProviderMap();
        serviceProviderMap2.setId(serviceProviderMap1.getId());
        assertThat(serviceProviderMap1).isEqualTo(serviceProviderMap2);
        serviceProviderMap2.setId(2L);
        assertThat(serviceProviderMap1).isNotEqualTo(serviceProviderMap2);
        serviceProviderMap1.setId(null);
        assertThat(serviceProviderMap1).isNotEqualTo(serviceProviderMap2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ServiceProviderMapDTO.class);
        ServiceProviderMapDTO serviceProviderMapDTO1 = new ServiceProviderMapDTO();
        serviceProviderMapDTO1.setId(1L);
        ServiceProviderMapDTO serviceProviderMapDTO2 = new ServiceProviderMapDTO();
        assertThat(serviceProviderMapDTO1).isNotEqualTo(serviceProviderMapDTO2);
        serviceProviderMapDTO2.setId(serviceProviderMapDTO1.getId());
        assertThat(serviceProviderMapDTO1).isEqualTo(serviceProviderMapDTO2);
        serviceProviderMapDTO2.setId(2L);
        assertThat(serviceProviderMapDTO1).isNotEqualTo(serviceProviderMapDTO2);
        serviceProviderMapDTO1.setId(null);
        assertThat(serviceProviderMapDTO1).isNotEqualTo(serviceProviderMapDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(serviceProviderMapMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(serviceProviderMapMapper.fromId(null)).isNull();
    }
}
