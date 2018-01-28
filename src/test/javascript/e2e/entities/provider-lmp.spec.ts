import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Provider e2e test', () => {

    let navBarPage: NavBarPage;
    let providerDialogPage: ProviderDialogPage;
    let providerComponentsPage: ProviderComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Providers', () => {
        navBarPage.goToEntity('provider-lmp');
        providerComponentsPage = new ProviderComponentsPage();
        expect(providerComponentsPage.getTitle())
            .toMatch(/localmarketplaceApp.provider.home.title/);

    });

    it('should load create Provider dialog', () => {
        providerComponentsPage.clickOnCreateButton();
        providerDialogPage = new ProviderDialogPage();
        expect(providerDialogPage.getModalTitle())
            .toMatch(/localmarketplaceApp.provider.home.createOrEditLabel/);
        providerDialogPage.close();
    });

    it('should create and save Providers', () => {
        providerComponentsPage.clickOnCreateButton();
        providerDialogPage.setFirstNameInput('firstName');
        expect(providerDialogPage.getFirstNameInput()).toMatch('firstName');
        providerDialogPage.setLastNameInput('lastName');
        expect(providerDialogPage.getLastNameInput()).toMatch('lastName');
        providerDialogPage.setEmailInput('email');
        expect(providerDialogPage.getEmailInput()).toMatch('email');
        providerDialogPage.setMobileNumberInput('5');
        expect(providerDialogPage.getMobileNumberInput()).toMatch('5');
        providerDialogPage.getIsIndividualInput().isSelected().then((selected) => {
            if (selected) {
                providerDialogPage.getIsIndividualInput().click();
                expect(providerDialogPage.getIsIndividualInput().isSelected()).toBeFalsy();
            } else {
                providerDialogPage.getIsIndividualInput().click();
                expect(providerDialogPage.getIsIndividualInput().isSelected()).toBeTruthy();
            }
        });
        providerDialogPage.getIsRegisteredOfficeInput().isSelected().then((selected) => {
            if (selected) {
                providerDialogPage.getIsRegisteredOfficeInput().click();
                expect(providerDialogPage.getIsRegisteredOfficeInput().isSelected()).toBeFalsy();
            } else {
                providerDialogPage.getIsRegisteredOfficeInput().click();
                expect(providerDialogPage.getIsRegisteredOfficeInput().isSelected()).toBeTruthy();
            }
        });
        providerDialogPage.setOfficeAddressInput('officeAddress');
        expect(providerDialogPage.getOfficeAddressInput()).toMatch('officeAddress');
        providerDialogPage.setZipInput('5');
        expect(providerDialogPage.getZipInput()).toMatch('5');
        providerDialogPage.setDescriptionInput('description');
        expect(providerDialogPage.getDescriptionInput()).toMatch('description');
        providerDialogPage.save();
        expect(providerDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ProviderComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-provider-lmp div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ProviderDialogPage {
    modalTitle = element(by.css('h4#myProviderLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    firstNameInput = element(by.css('input#field_firstName'));
    lastNameInput = element(by.css('input#field_lastName'));
    emailInput = element(by.css('input#field_email'));
    mobileNumberInput = element(by.css('input#field_mobileNumber'));
    isIndividualInput = element(by.css('input#field_isIndividual'));
    isRegisteredOfficeInput = element(by.css('input#field_isRegisteredOffice'));
    officeAddressInput = element(by.css('input#field_officeAddress'));
    zipInput = element(by.css('input#field_zip'));
    descriptionInput = element(by.css('input#field_description'));

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

    getIsIndividualInput = function() {
        return this.isIndividualInput;
    }
    getIsRegisteredOfficeInput = function() {
        return this.isRegisteredOfficeInput;
    }
    setOfficeAddressInput = function(officeAddress) {
        this.officeAddressInput.sendKeys(officeAddress);
    }

    getOfficeAddressInput = function() {
        return this.officeAddressInput.getAttribute('value');
    }

    setZipInput = function(zip) {
        this.zipInput.sendKeys(zip);
    }

    getZipInput = function() {
        return this.zipInput.getAttribute('value');
    }

    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    }

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
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
