package com.localmarketplace.web.rest;

import com.localmarketplace.LocalmarketplaceApp;

import com.localmarketplace.domain.ServiceRequest;
import com.localmarketplace.repository.ServiceRequestRepository;
import com.localmarketplace.service.ServiceRequestService;
import com.localmarketplace.service.dto.ServiceRequestDTO;
import com.localmarketplace.service.mapper.ServiceRequestMapper;
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
 * Test class for the ServiceRequestResource REST controller.
 *
 * @see ServiceRequestResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LocalmarketplaceApp.class)
public class ServiceRequestResourceIntTest {

    private static final String DEFAULT_REQUIREMENT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_REQUIREMENT_DESCRIPTION = "BBBBBBBBBB";

    private static final Instant DEFAULT_SERVICE_REQUIRED_ON = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_SERVICE_REQUIRED_ON = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_EXPECTED_START_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_EXPECTED_START_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Long DEFAULT_TENTATIVE_EFFORTS_REQUIRED_IN_HOURS = 1L;
    private static final Long UPDATED_TENTATIVE_EFFORTS_REQUIRED_IN_HOURS = 2L;

    @Autowired
    private ServiceRequestRepository serviceRequestRepository;

    @Autowired
    private ServiceRequestMapper serviceRequestMapper;

    @Autowired
    private ServiceRequestService serviceRequestService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restServiceRequestMockMvc;

    private ServiceRequest serviceRequest;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ServiceRequestResource serviceRequestResource = new ServiceRequestResource(serviceRequestService);
        this.restServiceRequestMockMvc = MockMvcBuilders.standaloneSetup(serviceRequestResource)
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
    public static ServiceRequest createEntity(EntityManager em) {
        ServiceRequest serviceRequest = new ServiceRequest()
            .requirementDescription(DEFAULT_REQUIREMENT_DESCRIPTION)
            .serviceRequiredOn(DEFAULT_SERVICE_REQUIRED_ON)
            .expectedStartTime(DEFAULT_EXPECTED_START_TIME)
            .tentativeEffortsRequiredInHours(DEFAULT_TENTATIVE_EFFORTS_REQUIRED_IN_HOURS);
        return serviceRequest;
    }

    @Before
    public void initTest() {
        serviceRequest = createEntity(em);
    }

    @Test
    @Transactional
    public void createServiceRequest() throws Exception {
        int databaseSizeBeforeCreate = serviceRequestRepository.findAll().size();

        // Create the ServiceRequest
        ServiceRequestDTO serviceRequestDTO = serviceRequestMapper.toDto(serviceRequest);
        restServiceRequestMockMvc.perform(post("/api/service-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(serviceRequestDTO)))
            .andExpect(status().isCreated());

        // Validate the ServiceRequest in the database
        List<ServiceRequest> serviceRequestList = serviceRequestRepository.findAll();
        assertThat(serviceRequestList).hasSize(databaseSizeBeforeCreate + 1);
        ServiceRequest testServiceRequest = serviceRequestList.get(serviceRequestList.size() - 1);
        assertThat(testServiceRequest.getRequirementDescription()).isEqualTo(DEFAULT_REQUIREMENT_DESCRIPTION);
        assertThat(testServiceRequest.getServiceRequiredOn()).isEqualTo(DEFAULT_SERVICE_REQUIRED_ON);
        assertThat(testServiceRequest.getExpectedStartTime()).isEqualTo(DEFAULT_EXPECTED_START_TIME);
        assertThat(testServiceRequest.getTentativeEffortsRequiredInHours()).isEqualTo(DEFAULT_TENTATIVE_EFFORTS_REQUIRED_IN_HOURS);
    }

    @Test
    @Transactional
    public void createServiceRequestWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = serviceRequestRepository.findAll().size();

        // Create the ServiceRequest with an existing ID
        serviceRequest.setId(1L);
        ServiceRequestDTO serviceRequestDTO = serviceRequestMapper.toDto(serviceRequest);

        // An entity with an existing ID cannot be created, so this API call must fail
        restServiceRequestMockMvc.perform(post("/api/service-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(serviceRequestDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ServiceRequest in the database
        List<ServiceRequest> serviceRequestList = serviceRequestRepository.findAll();
        assertThat(serviceRequestList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllServiceRequests() throws Exception {
        // Initialize the database
        serviceRequestRepository.saveAndFlush(serviceRequest);

        // Get all the serviceRequestList
        restServiceRequestMockMvc.perform(get("/api/service-requests?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(serviceRequest.getId().intValue())))
            .andExpect(jsonPath("$.[*].requirementDescription").value(hasItem(DEFAULT_REQUIREMENT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].serviceRequiredOn").value(hasItem(DEFAULT_SERVICE_REQUIRED_ON.toString())))
            .andExpect(jsonPath("$.[*].expectedStartTime").value(hasItem(DEFAULT_EXPECTED_START_TIME.toString())))
            .andExpect(jsonPath("$.[*].tentativeEffortsRequiredInHours").value(hasItem(DEFAULT_TENTATIVE_EFFORTS_REQUIRED_IN_HOURS.intValue())));
    }

    @Test
    @Transactional
    public void getServiceRequest() throws Exception {
        // Initialize the database
        serviceRequestRepository.saveAndFlush(serviceRequest);

        // Get the serviceRequest
        restServiceRequestMockMvc.perform(get("/api/service-requests/{id}", serviceRequest.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(serviceRequest.getId().intValue()))
            .andExpect(jsonPath("$.requirementDescription").value(DEFAULT_REQUIREMENT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.serviceRequiredOn").value(DEFAULT_SERVICE_REQUIRED_ON.toString()))
            .andExpect(jsonPath("$.expectedStartTime").value(DEFAULT_EXPECTED_START_TIME.toString()))
            .andExpect(jsonPath("$.tentativeEffortsRequiredInHours").value(DEFAULT_TENTATIVE_EFFORTS_REQUIRED_IN_HOURS.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingServiceRequest() throws Exception {
        // Get the serviceRequest
        restServiceRequestMockMvc.perform(get("/api/service-requests/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateServiceRequest() throws Exception {
        // Initialize the database
        serviceRequestRepository.saveAndFlush(serviceRequest);
        int databaseSizeBeforeUpdate = serviceRequestRepository.findAll().size();

        // Update the serviceRequest
        ServiceRequest updatedServiceRequest = serviceRequestRepository.findOne(serviceRequest.getId());
        // Disconnect from session so that the updates on updatedServiceRequest are not directly saved in db
        em.detach(updatedServiceRequest);
        updatedServiceRequest
            .requirementDescription(UPDATED_REQUIREMENT_DESCRIPTION)
            .serviceRequiredOn(UPDATED_SERVICE_REQUIRED_ON)
            .expectedStartTime(UPDATED_EXPECTED_START_TIME)
            .tentativeEffortsRequiredInHours(UPDATED_TENTATIVE_EFFORTS_REQUIRED_IN_HOURS);
        ServiceRequestDTO serviceRequestDTO = serviceRequestMapper.toDto(updatedServiceRequest);

        restServiceRequestMockMvc.perform(put("/api/service-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(serviceRequestDTO)))
            .andExpect(status().isOk());

        // Validate the ServiceRequest in the database
        List<ServiceRequest> serviceRequestList = serviceRequestRepository.findAll();
        assertThat(serviceRequestList).hasSize(databaseSizeBeforeUpdate);
        ServiceRequest testServiceRequest = serviceRequestList.get(serviceRequestList.size() - 1);
        assertThat(testServiceRequest.getRequirementDescription()).isEqualTo(UPDATED_REQUIREMENT_DESCRIPTION);
        assertThat(testServiceRequest.getServiceRequiredOn()).isEqualTo(UPDATED_SERVICE_REQUIRED_ON);
        assertThat(testServiceRequest.getExpectedStartTime()).isEqualTo(UPDATED_EXPECTED_START_TIME);
        assertThat(testServiceRequest.getTentativeEffortsRequiredInHours()).isEqualTo(UPDATED_TENTATIVE_EFFORTS_REQUIRED_IN_HOURS);
    }

    @Test
    @Transactional
    public void updateNonExistingServiceRequest() throws Exception {
        int databaseSizeBeforeUpdate = serviceRequestRepository.findAll().size();

        // Create the ServiceRequest
        ServiceRequestDTO serviceRequestDTO = serviceRequestMapper.toDto(serviceRequest);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restServiceRequestMockMvc.perform(put("/api/service-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(serviceRequestDTO)))
            .andExpect(status().isCreated());

        // Validate the ServiceRequest in the database
        List<ServiceRequest> serviceRequestList = serviceRequestRepository.findAll();
        assertThat(serviceRequestList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteServiceRequest() throws Exception {
        // Initialize the database
        serviceRequestRepository.saveAndFlush(serviceRequest);
        int databaseSizeBeforeDelete = serviceRequestRepository.findAll().size();

        // Get the serviceRequest
        restServiceRequestMockMvc.perform(delete("/api/service-requests/{id}", serviceRequest.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ServiceRequest> serviceRequestList = serviceRequestRepository.findAll();
        assertThat(serviceRequestList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ServiceRequest.class);
        ServiceRequest serviceRequest1 = new ServiceRequest();
        serviceRequest1.setId(1L);
        ServiceRequest serviceRequest2 = new ServiceRequest();
        serviceRequest2.setId(serviceRequest1.getId());
        assertThat(serviceRequest1).isEqualTo(serviceRequest2);
        serviceRequest2.setId(2L);
        assertThat(serviceRequest1).isNotEqualTo(serviceRequest2);
        serviceRequest1.setId(null);
        assertThat(serviceRequest1).isNotEqualTo(serviceRequest2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ServiceRequestDTO.class);
        ServiceRequestDTO serviceRequestDTO1 = new ServiceRequestDTO();
        serviceRequestDTO1.setId(1L);
        ServiceRequestDTO serviceRequestDTO2 = new ServiceRequestDTO();
        assertThat(serviceRequestDTO1).isNotEqualTo(serviceRequestDTO2);
        serviceRequestDTO2.setId(serviceRequestDTO1.getId());
        assertThat(serviceRequestDTO1).isEqualTo(serviceRequestDTO2);
        serviceRequestDTO2.setId(2L);
        assertThat(serviceRequestDTO1).isNotEqualTo(serviceRequestDTO2);
        serviceRequestDTO1.setId(null);
        assertThat(serviceRequestDTO1).isNotEqualTo(serviceRequestDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(serviceRequestMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(serviceRequestMapper.fromId(null)).isNull();
    }
}
