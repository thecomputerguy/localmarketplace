package com.localmarketplace.web.rest;

import com.localmarketplace.LocalmarketplaceApp;

import com.localmarketplace.domain.ServiceCategory;
import com.localmarketplace.repository.ServiceCategoryRepository;
import com.localmarketplace.service.ServiceCategoryService;
import com.localmarketplace.service.dto.ServiceCategoryDTO;
import com.localmarketplace.service.mapper.ServiceCategoryMapper;
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
 * Test class for the ServiceCategoryResource REST controller.
 *
 * @see ServiceCategoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LocalmarketplaceApp.class)
public class ServiceCategoryResourceIntTest {

    private static final String DEFAULT_CATEGORY_NAME = "AAAAAAAAAA";
    private static final String UPDATED_CATEGORY_NAME = "BBBBBBBBBB";

    @Autowired
    private ServiceCategoryRepository serviceCategoryRepository;

    @Autowired
    private ServiceCategoryMapper serviceCategoryMapper;

    @Autowired
    private ServiceCategoryService serviceCategoryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restServiceCategoryMockMvc;

    private ServiceCategory serviceCategory;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ServiceCategoryResource serviceCategoryResource = new ServiceCategoryResource(serviceCategoryService);
        this.restServiceCategoryMockMvc = MockMvcBuilders.standaloneSetup(serviceCategoryResource)
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
    public static ServiceCategory createEntity(EntityManager em) {
        ServiceCategory serviceCategory = new ServiceCategory()
            .categoryName(DEFAULT_CATEGORY_NAME);
        return serviceCategory;
    }

    @Before
    public void initTest() {
        serviceCategory = createEntity(em);
    }

    @Test
    @Transactional
    public void createServiceCategory() throws Exception {
        int databaseSizeBeforeCreate = serviceCategoryRepository.findAll().size();

        // Create the ServiceCategory
        ServiceCategoryDTO serviceCategoryDTO = serviceCategoryMapper.toDto(serviceCategory);
        restServiceCategoryMockMvc.perform(post("/api/service-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(serviceCategoryDTO)))
            .andExpect(status().isCreated());

        // Validate the ServiceCategory in the database
        List<ServiceCategory> serviceCategoryList = serviceCategoryRepository.findAll();
        assertThat(serviceCategoryList).hasSize(databaseSizeBeforeCreate + 1);
        ServiceCategory testServiceCategory = serviceCategoryList.get(serviceCategoryList.size() - 1);
        assertThat(testServiceCategory.getCategoryName()).isEqualTo(DEFAULT_CATEGORY_NAME);
    }

    @Test
    @Transactional
    public void createServiceCategoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = serviceCategoryRepository.findAll().size();

        // Create the ServiceCategory with an existing ID
        serviceCategory.setId(1L);
        ServiceCategoryDTO serviceCategoryDTO = serviceCategoryMapper.toDto(serviceCategory);

        // An entity with an existing ID cannot be created, so this API call must fail
        restServiceCategoryMockMvc.perform(post("/api/service-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(serviceCategoryDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ServiceCategory in the database
        List<ServiceCategory> serviceCategoryList = serviceCategoryRepository.findAll();
        assertThat(serviceCategoryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllServiceCategories() throws Exception {
        // Initialize the database
        serviceCategoryRepository.saveAndFlush(serviceCategory);

        // Get all the serviceCategoryList
        restServiceCategoryMockMvc.perform(get("/api/service-categories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(serviceCategory.getId().intValue())))
            .andExpect(jsonPath("$.[*].categoryName").value(hasItem(DEFAULT_CATEGORY_NAME.toString())));
    }

    @Test
    @Transactional
    public void getServiceCategory() throws Exception {
        // Initialize the database
        serviceCategoryRepository.saveAndFlush(serviceCategory);

        // Get the serviceCategory
        restServiceCategoryMockMvc.perform(get("/api/service-categories/{id}", serviceCategory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(serviceCategory.getId().intValue()))
            .andExpect(jsonPath("$.categoryName").value(DEFAULT_CATEGORY_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingServiceCategory() throws Exception {
        // Get the serviceCategory
        restServiceCategoryMockMvc.perform(get("/api/service-categories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateServiceCategory() throws Exception {
        // Initialize the database
        serviceCategoryRepository.saveAndFlush(serviceCategory);
        int databaseSizeBeforeUpdate = serviceCategoryRepository.findAll().size();

        // Update the serviceCategory
        ServiceCategory updatedServiceCategory = serviceCategoryRepository.findOne(serviceCategory.getId());
        // Disconnect from session so that the updates on updatedServiceCategory are not directly saved in db
        em.detach(updatedServiceCategory);
        updatedServiceCategory
            .categoryName(UPDATED_CATEGORY_NAME);
        ServiceCategoryDTO serviceCategoryDTO = serviceCategoryMapper.toDto(updatedServiceCategory);

        restServiceCategoryMockMvc.perform(put("/api/service-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(serviceCategoryDTO)))
            .andExpect(status().isOk());

        // Validate the ServiceCategory in the database
        List<ServiceCategory> serviceCategoryList = serviceCategoryRepository.findAll();
        assertThat(serviceCategoryList).hasSize(databaseSizeBeforeUpdate);
        ServiceCategory testServiceCategory = serviceCategoryList.get(serviceCategoryList.size() - 1);
        assertThat(testServiceCategory.getCategoryName()).isEqualTo(UPDATED_CATEGORY_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingServiceCategory() throws Exception {
        int databaseSizeBeforeUpdate = serviceCategoryRepository.findAll().size();

        // Create the ServiceCategory
        ServiceCategoryDTO serviceCategoryDTO = serviceCategoryMapper.toDto(serviceCategory);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restServiceCategoryMockMvc.perform(put("/api/service-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(serviceCategoryDTO)))
            .andExpect(status().isCreated());

        // Validate the ServiceCategory in the database
        List<ServiceCategory> serviceCategoryList = serviceCategoryRepository.findAll();
        assertThat(serviceCategoryList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteServiceCategory() throws Exception {
        // Initialize the database
        serviceCategoryRepository.saveAndFlush(serviceCategory);
        int databaseSizeBeforeDelete = serviceCategoryRepository.findAll().size();

        // Get the serviceCategory
        restServiceCategoryMockMvc.perform(delete("/api/service-categories/{id}", serviceCategory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ServiceCategory> serviceCategoryList = serviceCategoryRepository.findAll();
        assertThat(serviceCategoryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ServiceCategory.class);
        ServiceCategory serviceCategory1 = new ServiceCategory();
        serviceCategory1.setId(1L);
        ServiceCategory serviceCategory2 = new ServiceCategory();
        serviceCategory2.setId(serviceCategory1.getId());
        assertThat(serviceCategory1).isEqualTo(serviceCategory2);
        serviceCategory2.setId(2L);
        assertThat(serviceCategory1).isNotEqualTo(serviceCategory2);
        serviceCategory1.setId(null);
        assertThat(serviceCategory1).isNotEqualTo(serviceCategory2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ServiceCategoryDTO.class);
        ServiceCategoryDTO serviceCategoryDTO1 = new ServiceCategoryDTO();
        serviceCategoryDTO1.setId(1L);
        ServiceCategoryDTO serviceCategoryDTO2 = new ServiceCategoryDTO();
        assertThat(serviceCategoryDTO1).isNotEqualTo(serviceCategoryDTO2);
        serviceCategoryDTO2.setId(serviceCategoryDTO1.getId());
        assertThat(serviceCategoryDTO1).isEqualTo(serviceCategoryDTO2);
        serviceCategoryDTO2.setId(2L);
        assertThat(serviceCategoryDTO1).isNotEqualTo(serviceCategoryDTO2);
        serviceCategoryDTO1.setId(null);
        assertThat(serviceCategoryDTO1).isNotEqualTo(serviceCategoryDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(serviceCategoryMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(serviceCategoryMapper.fromId(null)).isNull();
    }
}
