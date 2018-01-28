package com.localmarketplace.web.rest;

import com.localmarketplace.LocalmarketplaceApp;

import com.localmarketplace.domain.ProviderReviewLog;
import com.localmarketplace.repository.ProviderReviewLogRepository;
import com.localmarketplace.service.ProviderReviewLogService;
import com.localmarketplace.service.dto.ProviderReviewLogDTO;
import com.localmarketplace.service.mapper.ProviderReviewLogMapper;
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
 * Test class for the ProviderReviewLogResource REST controller.
 *
 * @see ProviderReviewLogResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LocalmarketplaceApp.class)
public class ProviderReviewLogResourceIntTest {

    private static final Long DEFAULT_PUNCTUALITY_RATING = 1L;
    private static final Long UPDATED_PUNCTUALITY_RATING = 2L;

    private static final Long DEFAULT_PROFICIENCY_RATING = 1L;
    private static final Long UPDATED_PROFICIENCY_RATING = 2L;

    private static final Long DEFAULT_ETIQUATTES_RATING = 1L;
    private static final Long UPDATED_ETIQUATTES_RATING = 2L;

    private static final Long DEFAULT_COMMUNICATION_RATING = 1L;
    private static final Long UPDATED_COMMUNICATION_RATING = 2L;

    private static final Long DEFAULT_PRICE_RATING = 1L;
    private static final Long UPDATED_PRICE_RATING = 2L;

    private static final Long DEFAULT_OVERALL_RATING = 1L;
    private static final Long UPDATED_OVERALL_RATING = 2L;

    private static final Long DEFAULT_REVIEW = 1L;
    private static final Long UPDATED_REVIEW = 2L;

    private static final Instant DEFAULT_REVIEW_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_REVIEW_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private ProviderReviewLogRepository providerReviewLogRepository;

    @Autowired
    private ProviderReviewLogMapper providerReviewLogMapper;

    @Autowired
    private ProviderReviewLogService providerReviewLogService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restProviderReviewLogMockMvc;

    private ProviderReviewLog providerReviewLog;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProviderReviewLogResource providerReviewLogResource = new ProviderReviewLogResource(providerReviewLogService);
        this.restProviderReviewLogMockMvc = MockMvcBuilders.standaloneSetup(providerReviewLogResource)
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
    public static ProviderReviewLog createEntity(EntityManager em) {
        ProviderReviewLog providerReviewLog = new ProviderReviewLog()
            .punctualityRating(DEFAULT_PUNCTUALITY_RATING)
            .proficiencyRating(DEFAULT_PROFICIENCY_RATING)
            .etiquattesRating(DEFAULT_ETIQUATTES_RATING)
            .communicationRating(DEFAULT_COMMUNICATION_RATING)
            .priceRating(DEFAULT_PRICE_RATING)
            .overallRating(DEFAULT_OVERALL_RATING)
            .review(DEFAULT_REVIEW)
            .reviewDate(DEFAULT_REVIEW_DATE);
        return providerReviewLog;
    }

    @Before
    public void initTest() {
        providerReviewLog = createEntity(em);
    }

    @Test
    @Transactional
    public void createProviderReviewLog() throws Exception {
        int databaseSizeBeforeCreate = providerReviewLogRepository.findAll().size();

        // Create the ProviderReviewLog
        ProviderReviewLogDTO providerReviewLogDTO = providerReviewLogMapper.toDto(providerReviewLog);
        restProviderReviewLogMockMvc.perform(post("/api/provider-review-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(providerReviewLogDTO)))
            .andExpect(status().isCreated());

        // Validate the ProviderReviewLog in the database
        List<ProviderReviewLog> providerReviewLogList = providerReviewLogRepository.findAll();
        assertThat(providerReviewLogList).hasSize(databaseSizeBeforeCreate + 1);
        ProviderReviewLog testProviderReviewLog = providerReviewLogList.get(providerReviewLogList.size() - 1);
        assertThat(testProviderReviewLog.getPunctualityRating()).isEqualTo(DEFAULT_PUNCTUALITY_RATING);
        assertThat(testProviderReviewLog.getProficiencyRating()).isEqualTo(DEFAULT_PROFICIENCY_RATING);
        assertThat(testProviderReviewLog.getEtiquattesRating()).isEqualTo(DEFAULT_ETIQUATTES_RATING);
        assertThat(testProviderReviewLog.getCommunicationRating()).isEqualTo(DEFAULT_COMMUNICATION_RATING);
        assertThat(testProviderReviewLog.getPriceRating()).isEqualTo(DEFAULT_PRICE_RATING);
        assertThat(testProviderReviewLog.getOverallRating()).isEqualTo(DEFAULT_OVERALL_RATING);
        assertThat(testProviderReviewLog.getReview()).isEqualTo(DEFAULT_REVIEW);
        assertThat(testProviderReviewLog.getReviewDate()).isEqualTo(DEFAULT_REVIEW_DATE);
    }

    @Test
    @Transactional
    public void createProviderReviewLogWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = providerReviewLogRepository.findAll().size();

        // Create the ProviderReviewLog with an existing ID
        providerReviewLog.setId(1L);
        ProviderReviewLogDTO providerReviewLogDTO = providerReviewLogMapper.toDto(providerReviewLog);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProviderReviewLogMockMvc.perform(post("/api/provider-review-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(providerReviewLogDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ProviderReviewLog in the database
        List<ProviderReviewLog> providerReviewLogList = providerReviewLogRepository.findAll();
        assertThat(providerReviewLogList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllProviderReviewLogs() throws Exception {
        // Initialize the database
        providerReviewLogRepository.saveAndFlush(providerReviewLog);

        // Get all the providerReviewLogList
        restProviderReviewLogMockMvc.perform(get("/api/provider-review-logs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(providerReviewLog.getId().intValue())))
            .andExpect(jsonPath("$.[*].punctualityRating").value(hasItem(DEFAULT_PUNCTUALITY_RATING.intValue())))
            .andExpect(jsonPath("$.[*].proficiencyRating").value(hasItem(DEFAULT_PROFICIENCY_RATING.intValue())))
            .andExpect(jsonPath("$.[*].etiquattesRating").value(hasItem(DEFAULT_ETIQUATTES_RATING.intValue())))
            .andExpect(jsonPath("$.[*].communicationRating").value(hasItem(DEFAULT_COMMUNICATION_RATING.intValue())))
            .andExpect(jsonPath("$.[*].priceRating").value(hasItem(DEFAULT_PRICE_RATING.intValue())))
            .andExpect(jsonPath("$.[*].overallRating").value(hasItem(DEFAULT_OVERALL_RATING.intValue())))
            .andExpect(jsonPath("$.[*].review").value(hasItem(DEFAULT_REVIEW.intValue())))
            .andExpect(jsonPath("$.[*].reviewDate").value(hasItem(DEFAULT_REVIEW_DATE.toString())));
    }

    @Test
    @Transactional
    public void getProviderReviewLog() throws Exception {
        // Initialize the database
        providerReviewLogRepository.saveAndFlush(providerReviewLog);

        // Get the providerReviewLog
        restProviderReviewLogMockMvc.perform(get("/api/provider-review-logs/{id}", providerReviewLog.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(providerReviewLog.getId().intValue()))
            .andExpect(jsonPath("$.punctualityRating").value(DEFAULT_PUNCTUALITY_RATING.intValue()))
            .andExpect(jsonPath("$.proficiencyRating").value(DEFAULT_PROFICIENCY_RATING.intValue()))
            .andExpect(jsonPath("$.etiquattesRating").value(DEFAULT_ETIQUATTES_RATING.intValue()))
            .andExpect(jsonPath("$.communicationRating").value(DEFAULT_COMMUNICATION_RATING.intValue()))
            .andExpect(jsonPath("$.priceRating").value(DEFAULT_PRICE_RATING.intValue()))
            .andExpect(jsonPath("$.overallRating").value(DEFAULT_OVERALL_RATING.intValue()))
            .andExpect(jsonPath("$.review").value(DEFAULT_REVIEW.intValue()))
            .andExpect(jsonPath("$.reviewDate").value(DEFAULT_REVIEW_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingProviderReviewLog() throws Exception {
        // Get the providerReviewLog
        restProviderReviewLogMockMvc.perform(get("/api/provider-review-logs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProviderReviewLog() throws Exception {
        // Initialize the database
        providerReviewLogRepository.saveAndFlush(providerReviewLog);
        int databaseSizeBeforeUpdate = providerReviewLogRepository.findAll().size();

        // Update the providerReviewLog
        ProviderReviewLog updatedProviderReviewLog = providerReviewLogRepository.findOne(providerReviewLog.getId());
        // Disconnect from session so that the updates on updatedProviderReviewLog are not directly saved in db
        em.detach(updatedProviderReviewLog);
        updatedProviderReviewLog
            .punctualityRating(UPDATED_PUNCTUALITY_RATING)
            .proficiencyRating(UPDATED_PROFICIENCY_RATING)
            .etiquattesRating(UPDATED_ETIQUATTES_RATING)
            .communicationRating(UPDATED_COMMUNICATION_RATING)
            .priceRating(UPDATED_PRICE_RATING)
            .overallRating(UPDATED_OVERALL_RATING)
            .review(UPDATED_REVIEW)
            .reviewDate(UPDATED_REVIEW_DATE);
        ProviderReviewLogDTO providerReviewLogDTO = providerReviewLogMapper.toDto(updatedProviderReviewLog);

        restProviderReviewLogMockMvc.perform(put("/api/provider-review-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(providerReviewLogDTO)))
            .andExpect(status().isOk());

        // Validate the ProviderReviewLog in the database
        List<ProviderReviewLog> providerReviewLogList = providerReviewLogRepository.findAll();
        assertThat(providerReviewLogList).hasSize(databaseSizeBeforeUpdate);
        ProviderReviewLog testProviderReviewLog = providerReviewLogList.get(providerReviewLogList.size() - 1);
        assertThat(testProviderReviewLog.getPunctualityRating()).isEqualTo(UPDATED_PUNCTUALITY_RATING);
        assertThat(testProviderReviewLog.getProficiencyRating()).isEqualTo(UPDATED_PROFICIENCY_RATING);
        assertThat(testProviderReviewLog.getEtiquattesRating()).isEqualTo(UPDATED_ETIQUATTES_RATING);
        assertThat(testProviderReviewLog.getCommunicationRating()).isEqualTo(UPDATED_COMMUNICATION_RATING);
        assertThat(testProviderReviewLog.getPriceRating()).isEqualTo(UPDATED_PRICE_RATING);
        assertThat(testProviderReviewLog.getOverallRating()).isEqualTo(UPDATED_OVERALL_RATING);
        assertThat(testProviderReviewLog.getReview()).isEqualTo(UPDATED_REVIEW);
        assertThat(testProviderReviewLog.getReviewDate()).isEqualTo(UPDATED_REVIEW_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingProviderReviewLog() throws Exception {
        int databaseSizeBeforeUpdate = providerReviewLogRepository.findAll().size();

        // Create the ProviderReviewLog
        ProviderReviewLogDTO providerReviewLogDTO = providerReviewLogMapper.toDto(providerReviewLog);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restProviderReviewLogMockMvc.perform(put("/api/provider-review-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(providerReviewLogDTO)))
            .andExpect(status().isCreated());

        // Validate the ProviderReviewLog in the database
        List<ProviderReviewLog> providerReviewLogList = providerReviewLogRepository.findAll();
        assertThat(providerReviewLogList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteProviderReviewLog() throws Exception {
        // Initialize the database
        providerReviewLogRepository.saveAndFlush(providerReviewLog);
        int databaseSizeBeforeDelete = providerReviewLogRepository.findAll().size();

        // Get the providerReviewLog
        restProviderReviewLogMockMvc.perform(delete("/api/provider-review-logs/{id}", providerReviewLog.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ProviderReviewLog> providerReviewLogList = providerReviewLogRepository.findAll();
        assertThat(providerReviewLogList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProviderReviewLog.class);
        ProviderReviewLog providerReviewLog1 = new ProviderReviewLog();
        providerReviewLog1.setId(1L);
        ProviderReviewLog providerReviewLog2 = new ProviderReviewLog();
        providerReviewLog2.setId(providerReviewLog1.getId());
        assertThat(providerReviewLog1).isEqualTo(providerReviewLog2);
        providerReviewLog2.setId(2L);
        assertThat(providerReviewLog1).isNotEqualTo(providerReviewLog2);
        providerReviewLog1.setId(null);
        assertThat(providerReviewLog1).isNotEqualTo(providerReviewLog2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProviderReviewLogDTO.class);
        ProviderReviewLogDTO providerReviewLogDTO1 = new ProviderReviewLogDTO();
        providerReviewLogDTO1.setId(1L);
        ProviderReviewLogDTO providerReviewLogDTO2 = new ProviderReviewLogDTO();
        assertThat(providerReviewLogDTO1).isNotEqualTo(providerReviewLogDTO2);
        providerReviewLogDTO2.setId(providerReviewLogDTO1.getId());
        assertThat(providerReviewLogDTO1).isEqualTo(providerReviewLogDTO2);
        providerReviewLogDTO2.setId(2L);
        assertThat(providerReviewLogDTO1).isNotEqualTo(providerReviewLogDTO2);
        providerReviewLogDTO1.setId(null);
        assertThat(providerReviewLogDTO1).isNotEqualTo(providerReviewLogDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(providerReviewLogMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(providerReviewLogMapper.fromId(null)).isNull();
    }
}
