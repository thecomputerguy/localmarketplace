package com.localmarketplace.web.rest;

import com.localmarketplace.LocalmarketplaceApp;

import com.localmarketplace.domain.ServiceAppointment;
import com.localmarketplace.repository.ServiceAppointmentRepository;
import com.localmarketplace.service.ServiceAppointmentService;
import com.localmarketplace.service.dto.ServiceAppointmentDTO;
import com.localmarketplace.service.mapper.ServiceAppointmentMapper;
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
 * Test class for the ServiceAppointmentResource REST controller.
 *
 * @see ServiceAppointmentResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LocalmarketplaceApp.class)
public class ServiceAppointmentResourceIntTest {

    private static final Instant DEFAULT_SERVICE_DELIVER_ON = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_SERVICE_DELIVER_ON = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_SERVICE_START_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_SERVICE_START_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_SERVICE_END_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_SERVICE_END_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private ServiceAppointmentRepository serviceAppointmentRepository;

    @Autowired
    private ServiceAppointmentMapper serviceAppointmentMapper;

    @Autowired
    private ServiceAppointmentService serviceAppointmentService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restServiceAppointmentMockMvc;

    private ServiceAppointment serviceAppointment;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ServiceAppointmentResource serviceAppointmentResource = new ServiceAppointmentResource(serviceAppointmentService);
        this.restServiceAppointmentMockMvc = MockMvcBuilders.standaloneSetup(serviceAppointmentResource)
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
    public static ServiceAppointment createEntity(EntityManager em) {
        ServiceAppointment serviceAppointment = new ServiceAppointment()
            .serviceDeliverOn(DEFAULT_SERVICE_DELIVER_ON)
            .serviceStartTime(DEFAULT_SERVICE_START_TIME)
            .serviceEndTime(DEFAULT_SERVICE_END_TIME);
        return serviceAppointment;
    }

    @Before
    public void initTest() {
        serviceAppointment = createEntity(em);
    }

    @Test
    @Transactional
    public void createServiceAppointment() throws Exception {
        int databaseSizeBeforeCreate = serviceAppointmentRepository.findAll().size();

        // Create the ServiceAppointment
        ServiceAppointmentDTO serviceAppointmentDTO = serviceAppointmentMapper.toDto(serviceAppointment);
        restServiceAppointmentMockMvc.perform(post("/api/service-appointments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(serviceAppointmentDTO)))
            .andExpect(status().isCreated());

        // Validate the ServiceAppointment in the database
        List<ServiceAppointment> serviceAppointmentList = serviceAppointmentRepository.findAll();
        assertThat(serviceAppointmentList).hasSize(databaseSizeBeforeCreate + 1);
        ServiceAppointment testServiceAppointment = serviceAppointmentList.get(serviceAppointmentList.size() - 1);
        assertThat(testServiceAppointment.getServiceDeliverOn()).isEqualTo(DEFAULT_SERVICE_DELIVER_ON);
        assertThat(testServiceAppointment.getServiceStartTime()).isEqualTo(DEFAULT_SERVICE_START_TIME);
        assertThat(testServiceAppointment.getServiceEndTime()).isEqualTo(DEFAULT_SERVICE_END_TIME);
    }

    @Test
    @Transactional
    public void createServiceAppointmentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = serviceAppointmentRepository.findAll().size();

        // Create the ServiceAppointment with an existing ID
        serviceAppointment.setId(1L);
        ServiceAppointmentDTO serviceAppointmentDTO = serviceAppointmentMapper.toDto(serviceAppointment);

        // An entity with an existing ID cannot be created, so this API call must fail
        restServiceAppointmentMockMvc.perform(post("/api/service-appointments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(serviceAppointmentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ServiceAppointment in the database
        List<ServiceAppointment> serviceAppointmentList = serviceAppointmentRepository.findAll();
        assertThat(serviceAppointmentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllServiceAppointments() throws Exception {
        // Initialize the database
        serviceAppointmentRepository.saveAndFlush(serviceAppointment);

        // Get all the serviceAppointmentList
        restServiceAppointmentMockMvc.perform(get("/api/service-appointments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(serviceAppointment.getId().intValue())))
            .andExpect(jsonPath("$.[*].serviceDeliverOn").value(hasItem(DEFAULT_SERVICE_DELIVER_ON.toString())))
            .andExpect(jsonPath("$.[*].serviceStartTime").value(hasItem(DEFAULT_SERVICE_START_TIME.toString())))
            .andExpect(jsonPath("$.[*].serviceEndTime").value(hasItem(DEFAULT_SERVICE_END_TIME.toString())));
    }

    @Test
    @Transactional
    public void getServiceAppointment() throws Exception {
        // Initialize the database
        serviceAppointmentRepository.saveAndFlush(serviceAppointment);

        // Get the serviceAppointment
        restServiceAppointmentMockMvc.perform(get("/api/service-appointments/{id}", serviceAppointment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(serviceAppointment.getId().intValue()))
            .andExpect(jsonPath("$.serviceDeliverOn").value(DEFAULT_SERVICE_DELIVER_ON.toString()))
            .andExpect(jsonPath("$.serviceStartTime").value(DEFAULT_SERVICE_START_TIME.toString()))
            .andExpect(jsonPath("$.serviceEndTime").value(DEFAULT_SERVICE_END_TIME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingServiceAppointment() throws Exception {
        // Get the serviceAppointment
        restServiceAppointmentMockMvc.perform(get("/api/service-appointments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateServiceAppointment() throws Exception {
        // Initialize the database
        serviceAppointmentRepository.saveAndFlush(serviceAppointment);
        int databaseSizeBeforeUpdate = serviceAppointmentRepository.findAll().size();

        // Update the serviceAppointment
        ServiceAppointment updatedServiceAppointment = serviceAppointmentRepository.findOne(serviceAppointment.getId());
        // Disconnect from session so that the updates on updatedServiceAppointment are not directly saved in db
        em.detach(updatedServiceAppointment);
        updatedServiceAppointment
            .serviceDeliverOn(UPDATED_SERVICE_DELIVER_ON)
            .serviceStartTime(UPDATED_SERVICE_START_TIME)
            .serviceEndTime(UPDATED_SERVICE_END_TIME);
        ServiceAppointmentDTO serviceAppointmentDTO = serviceAppointmentMapper.toDto(updatedServiceAppointment);

        restServiceAppointmentMockMvc.perform(put("/api/service-appointments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(serviceAppointmentDTO)))
            .andExpect(status().isOk());

        // Validate the ServiceAppointment in the database
        List<ServiceAppointment> serviceAppointmentList = serviceAppointmentRepository.findAll();
        assertThat(serviceAppointmentList).hasSize(databaseSizeBeforeUpdate);
        ServiceAppointment testServiceAppointment = serviceAppointmentList.get(serviceAppointmentList.size() - 1);
        assertThat(testServiceAppointment.getServiceDeliverOn()).isEqualTo(UPDATED_SERVICE_DELIVER_ON);
        assertThat(testServiceAppointment.getServiceStartTime()).isEqualTo(UPDATED_SERVICE_START_TIME);
        assertThat(testServiceAppointment.getServiceEndTime()).isEqualTo(UPDATED_SERVICE_END_TIME);
    }

    @Test
    @Transactional
    public void updateNonExistingServiceAppointment() throws Exception {
        int databaseSizeBeforeUpdate = serviceAppointmentRepository.findAll().size();

        // Create the ServiceAppointment
        ServiceAppointmentDTO serviceAppointmentDTO = serviceAppointmentMapper.toDto(serviceAppointment);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restServiceAppointmentMockMvc.perform(put("/api/service-appointments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(serviceAppointmentDTO)))
            .andExpect(status().isCreated());

        // Validate the ServiceAppointment in the database
        List<ServiceAppointment> serviceAppointmentList = serviceAppointmentRepository.findAll();
        assertThat(serviceAppointmentList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteServiceAppointment() throws Exception {
        // Initialize the database
        serviceAppointmentRepository.saveAndFlush(serviceAppointment);
        int databaseSizeBeforeDelete = serviceAppointmentRepository.findAll().size();

        // Get the serviceAppointment
        restServiceAppointmentMockMvc.perform(delete("/api/service-appointments/{id}", serviceAppointment.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ServiceAppointment> serviceAppointmentList = serviceAppointmentRepository.findAll();
        assertThat(serviceAppointmentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ServiceAppointment.class);
        ServiceAppointment serviceAppointment1 = new ServiceAppointment();
        serviceAppointment1.setId(1L);
        ServiceAppointment serviceAppointment2 = new ServiceAppointment();
        serviceAppointment2.setId(serviceAppointment1.getId());
        assertThat(serviceAppointment1).isEqualTo(serviceAppointment2);
        serviceAppointment2.setId(2L);
        assertThat(serviceAppointment1).isNotEqualTo(serviceAppointment2);
        serviceAppointment1.setId(null);
        assertThat(serviceAppointment1).isNotEqualTo(serviceAppointment2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ServiceAppointmentDTO.class);
        ServiceAppointmentDTO serviceAppointmentDTO1 = new ServiceAppointmentDTO();
        serviceAppointmentDTO1.setId(1L);
        ServiceAppointmentDTO serviceAppointmentDTO2 = new ServiceAppointmentDTO();
        assertThat(serviceAppointmentDTO1).isNotEqualTo(serviceAppointmentDTO2);
        serviceAppointmentDTO2.setId(serviceAppointmentDTO1.getId());
        assertThat(serviceAppointmentDTO1).isEqualTo(serviceAppointmentDTO2);
        serviceAppointmentDTO2.setId(2L);
        assertThat(serviceAppointmentDTO1).isNotEqualTo(serviceAppointmentDTO2);
        serviceAppointmentDTO1.setId(null);
        assertThat(serviceAppointmentDTO1).isNotEqualTo(serviceAppointmentDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(serviceAppointmentMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(serviceAppointmentMapper.fromId(null)).isNull();
    }
}
