import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Customer e2e test', () => {

    let navBarPage: NavBarPage;
    let customerDialogPage: CustomerDialogPage;
    let customerComponentsPage: CustomerComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Customers', () => {
        navBarPage.goToEntity('customer-lmp');
        customerComponentsPage = new CustomerComponentsPage();
        expect(customerComponentsPage.getTitle())
            .toMatch(/localmarketplaceApp.customer.home.title/);

    });

    it('should load create Customer dialog', () => {
        customerComponentsPage.clickOnCreateButton();
        customerDialogPage = new CustomerDialogPage();
        expect(customerDialogPage.getModalTitle())
            .toMatch(/localmarketplaceApp.customer.home.createOrEditLabel/);
        customerDialogPage.close();
    });

    it('should create and save Customers', () => {
        customerComponentsPage.clickOnCreateButton();
        customerDialogPage.setFirstNameInput('firstName');
        expect(customerDialogPage.getFirstNameInput()).toMatch('firstName');
        customerDialogPage.setLastNameInput('lastName');
        expect(customerDialogPage.getLastNameInput()).toMatch('lastName');
        customerDialogPage.setEmailInput('email');
        expect(customerDialogPage.getEmailInput()).toMatch('email');
        customerDialogPage.setMobileNumberInput('5');
        expect(customerDialogPage.getMobileNumberInput()).toMatch('5');
        customerDialogPage.save();
        expect(customerDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CustomerComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-customer-lmp div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CustomerDialogPage {
    modalTitle = element(by.css('h4#myCustomerLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    firstNameInput = element(by.css('input#field_firstName'));
    lastNameInput = element(by.css('input#field_lastName'));
    emailInput = element(by.css('input#field_email'));
    mobileNumberInput = element(by.css('input#field_mobileNumber'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setFirstNameInput = function(firstName) {
        this.firstNameInput.sendKeys(firstName);
    }

    getFirstNameInput = function() {
        return this.firstNameInput.getAttribute('value');
    }

    setLastNameInput = function(lastName) {
        this.lastNameInput.sendKeys(lastName);
    }

    getLastNameInput = function() {
        return this.lastNameInput.getAttribute('value');
    }

    setEmailInput = function(email) {
        this.emailInput.sendKeys(email);
    }

    getEmailInput = function() {
        return this.emailInput.getAttribute('value');
    }

    setMobileNumberInput = function(mobileNumber) {
        this.mobileNumberInput.sendKeys(mobileNumber);
    }

    getMobileNumberInput = function() {
        return this.mobileNumberInput.getAttribute('value');
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
