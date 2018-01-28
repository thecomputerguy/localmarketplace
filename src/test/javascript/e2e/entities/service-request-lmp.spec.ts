import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('ServiceRequest e2e test', () => {

    let navBarPage: NavBarPage;
    let serviceRequestDialogPage: ServiceRequestDialogPage;
    let serviceRequestComponentsPage: ServiceRequestComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ServiceRequests', () => {
        navBarPage.goToEntity('service-request-lmp');
        serviceRequestComponentsPage = new ServiceRequestComponentsPage();
        expect(serviceRequestComponentsPage.getTitle())
            .toMatch(/localmarketplaceApp.serviceRequest.home.title/);

    });

    it('should load create ServiceRequest dialog', () => {
        serviceRequestComponentsPage.clickOnCreateButton();
        serviceRequestDialogPage = new ServiceRequestDialogPage();
        expect(serviceRequestDialogPage.getModalTitle())
            .toMatch(/localmarketplaceApp.serviceRequest.home.createOrEditLabel/);
        serviceRequestDialogPage.close();
    });

    it('should create and save ServiceRequests', () => {
        serviceRequestComponentsPage.clickOnCreateButton();
        serviceRequestDialogPage.setRequirementDescriptionInput('requirementDescription');
        expect(serviceRequestDialogPage.getRequirementDescriptionInput()).toMatch('requirementDescription');
        serviceRequestDialogPage.setServiceRequiredOnInput(12310020012301);
        expect(serviceRequestDialogPage.getServiceRequiredOnInput()).toMatch('2001-12-31T02:30');
        serviceRequestDialogPage.setExpectedStartTimeInput(12310020012301);
        expect(serviceRequestDialogPage.getExpectedStartTimeInput()).toMatch('2001-12-31T02:30');
        serviceRequestDialogPage.setTentativeEffortsRequiredInHoursInput('5');
        expect(serviceRequestDialogPage.getTentativeEffortsRequiredInHoursInput()).toMatch('5');
        serviceRequestDialogPage.customerSelectLastOption();
        serviceRequestDialogPage.save();
        expect(serviceRequestDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ServiceRequestComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-service-request-lmp div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ServiceRequestDialogPage {
    modalTitle = element(by.css('h4#myServiceRequestLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    requirementDescriptionInput = element(by.css('input#field_requirementDescription'));
    serviceRequiredOnInput = element(by.css('input#field_serviceRequiredOn'));
    expectedStartTimeInput = element(by.css('input#field_expectedStartTime'));
    tentativeEffortsRequiredInHoursInput = element(by.css('input#field_tentativeEffortsRequiredInHours'));
    customerSelect = element(by.css('select#field_customer'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setRequirementDescriptionInput = function(requirementDescription) {
        this.requirementDescriptionInput.sendKeys(requirementDescription);
    }

    getRequirementDescriptionInput = function() {
        return this.requirementDescriptionInput.getAttribute('value');
    }

    setServiceRequiredOnInput = function(serviceRequiredOn) {
        this.serviceRequiredOnInput.sendKeys(serviceRequiredOn);
    }

    getServiceRequiredOnInput = function() {
        return this.serviceRequiredOnInput.getAttribute('value');
    }

    setExpectedStartTimeInput = function(expectedStartTime) {
        this.expectedStartTimeInput.sendKeys(expectedStartTime);
    }

    getExpectedStartTimeInput = function() {
        return this.expectedStartTimeInput.getAttribute('value');
    }

    setTentativeEffortsRequiredInHoursInput = function(tentativeEffortsRequiredInHours) {
        this.tentativeEffortsRequiredInHoursInput.sendKeys(tentativeEffortsRequiredInHours);
    }

    getTentativeEffortsRequiredInHoursInput = function() {
        return this.tentativeEffortsRequiredInHoursInput.getAttribute('value');
    }

    customerSelectLastOption = function() {
        this.customerSelect.all(by.tagName('option')).last().click();
    }

    customerSelectOption = function(option) {
        this.customerSelect.sendKeys(option);
    }

    getCustomerSelect = function() {
        return this.customerSelect;
    }

    getCustomerSelectedOption = function() {
        return this.customerSelect.element(by.css('option:checked')).getText();
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
