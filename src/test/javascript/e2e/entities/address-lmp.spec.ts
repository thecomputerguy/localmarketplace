import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Address e2e test', () => {

    let navBarPage: NavBarPage;
    let addressDialogPage: AddressDialogPage;
    let addressComponentsPage: AddressComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Addresses', () => {
        navBarPage.goToEntity('address-lmp');
        addressComponentsPage = new AddressComponentsPage();
        expect(addressComponentsPage.getTitle())
            .toMatch(/localmarketplaceApp.address.home.title/);

    });

    it('should load create Address dialog', () => {
        addressComponentsPage.clickOnCreateButton();
        addressDialogPage = new AddressDialogPage();
        expect(addressDialogPage.getModalTitle())
            .toMatch(/localmarketplaceApp.address.home.createOrEditLabel/);
        addressDialogPage.close();
    });

    it('should create and save Addresses', () => {
        addressComponentsPage.clickOnCreateButton();
        addressDialogPage.setStreetAddressInput('streetAddress');
        expect(addressDialogPage.getStreetAddressInput()).toMatch('streetAddress');
        addressDialogPage.setCityInput('city');
        expect(addressDialogPage.getCityInput()).toMatch('city');
        addressDialogPage.setStateInput('state');
        expect(addressDialogPage.getStateInput()).toMatch('state');
        addressDialogPage.setCountryInput('country');
        expect(addressDialogPage.getCountryInput()).toMatch('country');
        addressDialogPage.setZipInput('5');
        expect(addressDialogPage.getZipInput()).toMatch('5');
        addressDialogPage.customerSelectLastOption();
        addressDialogPage.save();
        expect(addressDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class AddressComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-address-lmp div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class AddressDialogPage {
    modalTitle = element(by.css('h4#myAddressLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    streetAddressInput = element(by.css('input#field_streetAddress'));
    cityInput = element(by.css('input#field_city'));
    stateInput = element(by.css('input#field_state'));
    countryInput = element(by.css('input#field_country'));
    zipInput = element(by.css('input#field_zip'));
    customerSelect = element(by.css('select#field_customer'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setStreetAddressInput = function(streetAddress) {
        this.streetAddressInput.sendKeys(streetAddress);
    }

    getStreetAddressInput = function() {
        return this.streetAddressInput.getAttribute('value');
    }

    setCityInput = function(city) {
        this.cityInput.sendKeys(city);
    }

    getCityInput = function() {
        return this.cityInput.getAttribute('value');
    }

    setStateInput = function(state) {
        this.stateInput.sendKeys(state);
    }

    getStateInput = function() {
        return this.stateInput.getAttribute('value');
    }

    setCountryInput = function(country) {
        this.countryInput.sendKeys(country);
    }

    getCountryInput = function() {
        return this.countryInput.getAttribute('value');
    }

    setZipInput = function(zip) {
        this.zipInput.sendKeys(zip);
    }

    getZipInput = function() {
        return this.zipInput.getAttribute('value');
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
