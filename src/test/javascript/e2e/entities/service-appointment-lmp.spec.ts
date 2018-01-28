import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('ServiceAppointment e2e test', () => {

    let navBarPage: NavBarPage;
    let serviceAppointmentDialogPage: ServiceAppointmentDialogPage;
    let serviceAppointmentComponentsPage: ServiceAppointmentComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ServiceAppointments', () => {
        navBarPage.goToEntity('service-appointment-lmp');
        serviceAppointmentComponentsPage = new ServiceAppointmentComponentsPage();
        expect(serviceAppointmentComponentsPage.getTitle())
            .toMatch(/localmarketplaceApp.serviceAppointment.home.title/);

    });

    it('should load create ServiceAppointment dialog', () => {
        serviceAppointmentComponentsPage.clickOnCreateButton();
        serviceAppointmentDialogPage = new ServiceAppointmentDialogPage();
        expect(serviceAppointmentDialogPage.getModalTitle())
            .toMatch(/localmarketplaceApp.serviceAppointment.home.createOrEditLabel/);
        serviceAppointmentDialogPage.close();
    });

    it('should create and save ServiceAppointments', () => {
        serviceAppointmentComponentsPage.clickOnCreateButton();
        serviceAppointmentDialogPage.setServiceDeliverOnInput(12310020012301);
        expect(serviceAppointmentDialogPage.getServiceDeliverOnInput()).toMatch('2001-12-31T02:30');
        serviceAppointmentDialogPage.setServiceStartTimeInput(12310020012301);
        expect(serviceAppointmentDialogPage.getServiceStartTimeInput()).toMatch('2001-12-31T02:30');
        serviceAppointmentDialogPage.setServiceEndTimeInput(12310020012301);
        expect(serviceAppointmentDialogPage.getServiceEndTimeInput()).toMatch('2001-12-31T02:30');
        serviceAppointmentDialogPage.serviceDeliveryOfferSelectLastOption();
        serviceAppointmentDialogPage.save();
        expect(serviceAppointmentDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ServiceAppointmentComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-service-appointment-lmp div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ServiceAppointmentDialogPage {
    modalTitle = element(by.css('h4#myServiceAppointmentLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    serviceDeliverOnInput = element(by.css('input#field_serviceDeliverOn'));
    serviceStartTimeInput = element(by.css('input#field_serviceStartTime'));
    serviceEndTimeInput = element(by.css('input#field_serviceEndTime'));
    serviceDeliveryOfferSelect = element(by.css('select#field_serviceDeliveryOffer'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setServiceDeliverOnInput = function(serviceDeliverOn) {
        this.serviceDeliverOnInput.sendKeys(serviceDeliverOn);
    }

    getServiceDeliverOnInput = function() {
        return this.serviceDeliverOnInput.getAttribute('value');
    }

    setServiceStartTimeInput = function(serviceStartTime) {
        this.serviceStartTimeInput.sendKeys(serviceStartTime);
    }

    getServiceStartTimeInput = function() {
        return this.serviceStartTimeInput.getAttribute('value');
    }

    setServiceEndTimeInput = function(serviceEndTime) {
        this.serviceEndTimeInput.sendKeys(serviceEndTime);
    }

    getServiceEndTimeInput = function() {
        return this.serviceEndTimeInput.getAttribute('value');
    }

    serviceDeliveryOfferSelectLastOption = function() {
        this.serviceDeliveryOfferSelect.all(by.tagName('option')).last().click();
    }

    serviceDeliveryOfferSelectOption = function(option) {
        this.serviceDeliveryOfferSelect.sendKeys(option);
    }

    getServiceDeliveryOfferSelect = function() {
        return this.serviceDeliveryOfferSelect;
    }

    getServiceDeliveryOfferSelectedOption = function() {
        return this.serviceDeliveryOfferSelect.element(by.css('option:checked')).getText();
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
