import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Service e2e test', () => {

    let navBarPage: NavBarPage;
    let serviceDialogPage: ServiceDialogPage;
    let serviceComponentsPage: ServiceComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Services', () => {
        navBarPage.goToEntity('service-lmp');
        serviceComponentsPage = new ServiceComponentsPage();
        expect(serviceComponentsPage.getTitle())
            .toMatch(/localmarketplaceApp.service.home.title/);

    });

    it('should load create Service dialog', () => {
        serviceComponentsPage.clickOnCreateButton();
        serviceDialogPage = new ServiceDialogPage();
        expect(serviceDialogPage.getModalTitle())
            .toMatch(/localmarketplaceApp.service.home.createOrEditLabel/);
        serviceDialogPage.close();
    });

    it('should create and save Services', () => {
        serviceComponentsPage.clickOnCreateButton();
        serviceDialogPage.setServiceNameInput('serviceName');
        expect(serviceDialogPage.getServiceNameInput()).toMatch('serviceName');
        serviceDialogPage.serviceCategorySelectLastOption();
        serviceDialogPage.save();
        expect(serviceDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ServiceComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-service-lmp div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ServiceDialogPage {
    modalTitle = element(by.css('h4#myServiceLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    serviceNameInput = element(by.css('input#field_serviceName'));
    serviceCategorySelect = element(by.css('select#field_serviceCategory'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setServiceNameInput = function(serviceName) {
        this.serviceNameInput.sendKeys(serviceName);
    }

    getServiceNameInput = function() {
        return this.serviceNameInput.getAttribute('value');
    }

    serviceCategorySelectLastOption = function() {
        this.serviceCategorySelect.all(by.tagName('option')).last().click();
    }

    serviceCategorySelectOption = function(option) {
        this.serviceCategorySelect.sendKeys(option);
    }

    getServiceCategorySelect = function() {
        return this.serviceCategorySelect;
    }

    getServiceCategorySelectedOption = function() {
        return this.serviceCategorySelect.element(by.css('option:checked')).getText();
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
