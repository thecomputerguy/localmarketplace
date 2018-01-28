package com.localmarketplace.web.rest;

import com.localmarketplace.LocalmarketplaceApp;

import com.localmarketplace.domain.ProviderRating;
import com.localmarketplace.repository.ProviderRatingRepository;
import com.localmarketplace.service.ProviderRatingService;
import com.localmarketplace.service.dto.ProviderRatingDTO;
import com.localmarketplace.service.mapper.ProviderRatingMapper;
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
 * Test class for the ProviderRatingResource REST controller.
 *
 * @see ProviderRatingResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LocalmarketplaceApp.class)
public class ProviderRatingResourceIntTest {

    private static final Long DEFAULT_AVG_PUNCTUALITY_RATING = 1L;
    private static final Long UPDATED_AVG_PUNCTUALITY_RATING = 2L;

    private static final Long DEFAULT_AVG_PROF_RATING = 1L;
    private static final Long UPDATED_AVG_PROF_RATING = 2L;

    private static final Long DEFAULT_AVG_ETI_RATING = 1L;
    private static final Long UPDATED_AVG_ETI_RATING = 2L;

    private static final Long DEFAULT_AVG_COMM_RATING = 1L;
    private static final Long UPDATED_AVG_COMM_RATING = 2L;

    private static final Long DEFAULT_AVG_PRICE_RATING = 1L;
    private static final Long UPDATED_AVG_PRICE_RATING = 2L;

    private static final Long DEFAULT_AVG_OVERALL_RATING = 1L;
    private static final Long UPDATED_AVG_OVERALL_RATING = 2L;

    private static final Long DEFAULT_LAST_UPDATED_ON = 1L;
    private static final Long UPDATED_LAST_UPDATED_ON = 2L;

    @Autowired
    private ProviderRatingRepository providerRatingRepository;

    @Autowired
    private ProviderRatingMapper providerRatingMapper;

    @Autowired
    private ProviderRatingService providerRatingService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restProviderRatingMockMvc;

    private ProviderRating providerRating;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProviderRatingResource providerRatingResource = new ProviderRatingResource(providerRatingService);
        this.restProviderRatingMockMvc = MockMvcBuilders.standaloneSetup(providerRatingResource)
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
    public static ProviderRating createEntity(EntityManager em) {
        ProviderRating providerRating = new ProviderRating()
            .avgPunctualityRating(DEFAULT_AVG_PUNCTUALITY_RATING)
            .avgProfRating(DEFAULT_AVG_PROF_RATING)
            .avgEtiRating(DEFAULT_AVG_ETI_RATING)
            .avgCommRating(DEFAULT_AVG_COMM_RATING)
            .avgPriceRating(DEFAULT_AVG_PRICE_RATING)
            .avgOverallRating(DEFAULT_AVG_OVERALL_RATING)
            .lastUpdatedOn(DEFAULT_LAST_UPDATED_ON);
        return providerRating;
    }

    @Before
    public void initTest() {
        providerRating = createEntity(em);
    }

    @Test
    @Transactional
    public void createProviderRating() throws Exception {
        int databaseSizeBeforeCreate = providerRatingRepository.findAll().size();

        // Create the ProviderRating
        ProviderRatingDTO providerRatingDTO = providerRatingMapper.toDto(providerRating);
        restProviderRatingMockMvc.perform(post("/api/provider-ratings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(providerRatingDTO)))
            .andExpect(status().isCreated());

        // Validate the ProviderRating in the database
        List<ProviderRating> providerRatingList = providerRatingRepository.findAll();
        assertThat(providerRatingList).hasSize(databaseSizeBeforeCreate + 1);
        ProviderRating testProviderRating = providerRatingList.get(providerRatingList.size() - 1);
        assertThat(testProviderRating.getAvgPunctualityRating()).isEqualTo(DEFAULT_AVG_PUNCTUALITY_RATING);
        assertThat(testProviderRating.getAvgProfRating()).isEqualTo(DEFAULT_AVG_PROF_RATING);
        assertThat(testProviderRating.getAvgEtiRating()).isEqualTo(DEFAULT_AVG_ETI_RATING);
        assertThat(testProviderRating.getAvgCommRating()).isEqualTo(DEFAULT_AVG_COMM_RATING);
        assertThat(testProviderRating.getAvgPriceRating()).isEqualTo(DEFAULT_AVG_PRICE_RATING);
        assertThat(testProviderRating.getAvgOverallRating()).isEqualTo(DEFAULT_AVG_OVERALL_RATING);
        assertThat(testProviderRating.getLastUpdatedOn()).isEqualTo(DEFAULT_LAST_UPDATED_ON);
    }

    @Test
    @Transactional
    public void createProviderRatingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = providerRatingRepository.findAll().size();

        // Create the ProviderRating with an existing ID
        providerRating.setId(1L);
        ProviderRatingDTO providerRatingDTO = providerRatingMapper.toDto(providerRating);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProviderRatingMockMvc.perform(post("/api/provider-ratings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(providerRatingDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ProviderRating in the database
        List<ProviderRating> providerRatingList = providerRatingRepository.findAll();
        assertThat(providerRatingList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllProviderRatings() throws Exception {
        // Initialize the database
        providerRatingRepository.saveAndFlush(providerRating);

        // Get all the providerRatingList
        restProviderRatingMockMvc.perform(get("/api/provider-ratings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(providerRating.getId().intValue())))
            .andExpect(jsonPath("$.[*].avgPunctualityRating").value(hasItem(DEFAULT_AVG_PUNCTUALITY_RATING.intValue())))
            .andExpect(jsonPath("$.[*].avgProfRating").value(hasItem(DEFAULT_AVG_PROF_RATING.intValue())))
            .andExpect(jsonPath("$.[*].avgEtiRating").value(hasItem(DEFAULT_AVG_ETI_RATING.intValue())))
            .andExpect(jsonPath("$.[*].avgCommRating").value(hasItem(DEFAULT_AVG_COMM_RATING.intValue())))
            .andExpect(jsonPath("$.[*].avgPriceRating").value(hasItem(DEFAULT_AVG_PRICE_RATING.intValue())))
            .andExpect(jsonPath("$.[*].avgOverallRating").value(hasItem(DEFAULT_AVG_OVERALL_RATING.intValue())))
            .andExpect(jsonPath("$.[*].lastUpdatedOn").value(hasItem(DEFAULT_LAST_UPDATED_ON.intValue())));
    }

    @Test
    @Transactional
    public void getProviderRating() throws Exception {
        // Initialize the database
        providerRatingRepository.saveAndFlush(providerRating);

        // Get the providerRating
        restProviderRatingMockMvc.perform(get("/api/provider-ratings/{id}", providerRating.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(providerRating.getId().intValue()))
            .andExpect(jsonPath("$.avgPunctualityRating").value(DEFAULT_AVG_PUNCTUALITY_RATING.intValue()))
            .andExpect(jsonPath("$.avgProfRating").value(DEFAULT_AVG_PROF_RATING.intValue()))
            .andExpect(jsonPath("$.avgEtiRating").value(DEFAULT_AVG_ETI_RATING.intValue()))
            .andExpect(jsonPath("$.avgCommRating").value(DEFAULT_AVG_COMM_RATING.intValue()))
            .andExpect(jsonPath("$.avgPriceRating").value(DEFAULT_AVG_PRICE_RATING.intValue()))
            .andExpect(jsonPath("$.avgOverallRating").value(DEFAULT_AVG_OVERALL_RATING.intValue()))
            .andExpect(jsonPath("$.lastUpdatedOn").value(DEFAULT_LAST_UPDATED_ON.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingProviderRating() throws Exception {
        // Get the providerRating
        restProviderRatingMockMvc.perform(get("/api/provider-ratings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProviderRating() throws Exception {
        // Initialize the database
        providerRatingRepository.saveAndFlush(providerRating);
        int databaseSizeBeforeUpdate = providerRatingRepository.findAll().size();

        // Update the providerRating
        ProviderRating updatedProviderRating = providerRatingRepository.findOne(providerRating.getId());
        // Disconnect from session so that the updates on updatedProviderRating are not directly saved in db
        em.detach(updatedProviderRating);
        updatedProviderRating
            .avgPunctualityRating(UPDATED_AVG_PUNCTUALITY_RATING)
            .avgProfRating(UPDATED_AVG_PROF_RATING)
            .avgEtiRating(UPDATED_AVG_ETI_RATING)
            .avgCommRating(UPDATED_AVG_COMM_RATING)
            .avgPriceRating(UPDATED_AVG_PRICE_RATING)
            .avgOverallRating(UPDATED_AVG_OVERALL_RATING)
            .lastUpdatedOn(UPDATED_LAST_UPDATED_ON);
        ProviderRatingDTO providerRatingDTO = providerRatingMapper.toDto(updatedProviderRating);

        restProviderRatingMockMvc.perform(put("/api/provider-ratings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(providerRatingDTO)))
            .andExpect(status().isOk());

        // Validate the ProviderRating in the database
        List<ProviderRating> providerRatingList = providerRatingRepository.findAll();
        assertThat(providerRatingList).hasSize(databaseSizeBeforeUpdate);
        ProviderRating testProviderRating = providerRatingList.get(providerRatingList.size() - 1);
        assertThat(testProviderRating.getAvgPunctualityRating()).isEqualTo(UPDATED_AVG_PUNCTUALITY_RATING);
        assertThat(testProviderRating.getAvgProfRating()).isEqualTo(UPDATED_AVG_PROF_RATING);
        assertThat(testProviderRating.getAvgEtiRating()).isEqualTo(UPDATED_AVG_ETI_RATING);
        assertThat(testProviderRating.getAvgCommRating()).isEqualTo(UPDATED_AVG_COMM_RATING);
        assertThat(testProviderRating.getAvgPriceRating()).isEqualTo(UPDATED_AVG_PRICE_RATING);
        assertThat(testProviderRating.getAvgOverallRating()).isEqualTo(UPDATED_AVG_OVERALL_RATING);
        assertThat(testProviderRating.getLastUpdatedOn()).isEqualTo(UPDATED_LAST_UPDATED_ON);
    }

    @Test
    @Transactional
    public void updateNonExistingProviderRating() throws Exception {
        int databaseSizeBeforeUpdate = providerRatingRepository.findAll().size();

        // Create the ProviderRating
        ProviderRatingDTO providerRatingDTO = providerRatingMapper.toDto(providerRating);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restProviderRatingMockMvc.perform(put("/api/provider-ratings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(providerRatingDTO)))
            .andExpect(status().isCreated());

        // Validate the ProviderRating in the database
        List<ProviderRating> providerRatingList = providerRatingRepository.findAll();
        assertThat(providerRatingList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteProviderRating() throws Exception {
        // Initialize the database
        providerRatingRepository.saveAndFlush(providerRating);
        int databaseSizeBeforeDelete = providerRatingRepository.findAll().size();

        // Get the providerRating
        restProviderRatingMockMvc.perform(delete("/api/provider-ratings/{id}", providerRating.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ProviderRating> providerRatingList = providerRatingRepository.findAll();
        assertThat(providerRatingList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProviderRating.class);
        ProviderRating providerRating1 = new ProviderRating();
        providerRating1.setId(1L);
        ProviderRating providerRating2 = new ProviderRating();
        providerRating2.setId(providerRating1.getId());
        assertThat(providerRating1).isEqualTo(providerRating2);
        providerRating2.setId(2L);
        assertThat(providerRating1).isNotEqualTo(providerRating2);
        providerRating1.setId(null);
        assertThat(providerRating1).isNotEqualTo(providerRating2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProviderRatingDTO.class);
        ProviderRatingDTO providerRatingDTO1 = new ProviderRatingDTO();
        providerRatingDTO1.setId(1L);
        ProviderRatingDTO providerRatingDTO2 = new ProviderRatingDTO();
        assertThat(providerRatingDTO1).isNotEqualTo(providerRatingDTO2);
        providerRatingDTO2.setId(providerRatingDTO1.getId());
        assertThat(providerRatingDTO1).isEqualTo(providerRatingDTO2);
        providerRatingDTO2.setId(2L);
        assertThat(providerRatingDTO1).isNotEqualTo(providerRatingDTO2);
        providerRatingDTO1.setId(null);
        assertThat(providerRatingDTO1).isNotEqualTo(providerRatingDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(providerRatingMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(providerRatingMapper.fromId(null)).isNull();
    }
}
