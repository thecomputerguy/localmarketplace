import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('ServiceProviderMap e2e test', () => {

    let navBarPage: NavBarPage;
    let serviceProviderMapDialogPage: ServiceProviderMapDialogPage;
    let serviceProviderMapComponentsPage: ServiceProviderMapComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ServiceProviderMaps', () => {
        navBarPage.goToEntity('service-provider-map-lmp');
        serviceProviderMapComponentsPage = new ServiceProviderMapComponentsPage();
        expect(serviceProviderMapComponentsPage.getTitle())
            .toMatch(/localmarketplaceApp.serviceProviderMap.home.title/);

    });

    it('should load create ServiceProviderMap dialog', () => {
        serviceProviderMapComponentsPage.clickOnCreateButton();
        serviceProviderMapDialogPage = new ServiceProviderMapDialogPage();
        expect(serviceProviderMapDialogPage.getModalTitle())
            .toMatch(/localmarketplaceApp.serviceProviderMap.home.createOrEditLabel/);
        serviceProviderMapDialogPage.close();
    });

    it('should create and save ServiceProviderMaps', () => {
        serviceProviderMapComponentsPage.clickOnCreateButton();
        serviceProviderMapDialogPage.setBillingRatePerHourInput('5');
        expect(serviceProviderMapDialogPage.getBillingRatePerHourInput()).toMatch('5');
        serviceProviderMapDialogPage.setExperienceInMonthsInput('5');
        expect(serviceProviderMapDialogPage.getExperienceInMonthsInput()).toMatch('5');
        serviceProviderMapDialogPage.setServiceOfferingDescriptionInput('serviceOfferingDescription');
        expect(serviceProviderMapDialogPage.getServiceOfferingDescriptionInput()).toMatch('serviceOfferingDescription');
        serviceProviderMapDialogPage.providerSelectLastOption();
        serviceProviderMapDialogPage.serviceSelectLastOption();
        serviceProviderMapDialogPage.save();
        expect(serviceProviderMapDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ServiceProviderMapComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-service-provider-map-lmp div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ServiceProviderMapDialogPage {
    modalTitle = element(by.css('h4#myServiceProviderMapLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    billingRatePerHourInput = element(by.css('input#field_billingRatePerHour'));
    experienceInMonthsInput = element(by.css('input#field_experienceInMonths'));
    serviceOfferingDescriptionInput = element(by.css('input#field_serviceOfferingDescription'));
    providerSelect = element(by.css('select#field_provider'));
    serviceSelect = element(by.css('select#field_service'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setBillingRatePerHourInput = function(billingRatePerHour) {
        this.billingRatePerHourInput.sendKeys(billingRatePerHour);
    }

    getBillingRatePerHourInput = function() {
        return this.billingRatePerHourInput.getAttribute('value');
    }

    setExperienceInMonthsInput = function(experienceInMonths) {
        this.experienceInMonthsInput.sendKeys(experienceInMonths);
    }

    getExperienceInMonthsInput = function() {
        return this.experienceInMonthsInput.getAttribute('value');
    }

    setServiceOfferingDescriptionInput = function(serviceOfferingDescription) {
        this.serviceOfferingDescriptionInput.sendKeys(serviceOfferingDescription);
    }

    getServiceOfferingDescriptionInput = function() {
        return this.serviceOfferingDescriptionInput.getAttribute('value');
    }

    providerSelectLastOption = function() {
        this.providerSelect.all(by.tagName('option')).last().click();
    }

    providerSelectOption = function(option) {
        this.providerSelect.sendKeys(option);
    }

    getProviderSelect = function() {
        return this.providerSelect;
    }

    getProviderSelectedOption = function() {
        return this.providerSelect.element(by.css('option:checked')).getText();
    }

    serviceSelectLastOption = function() {
        this.serviceSelect.all(by.tagName('option')).last().click();
    }

    serviceSelectOption = function(option) {
        this.serviceSelect.sendKeys(option);
    }

    getServiceSelect = function() {
        return this.serviceSelect;
    }

    getServiceSelectedOption = function() {
        return this.serviceSelect.element(by.css('option:checked')).getText();
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
