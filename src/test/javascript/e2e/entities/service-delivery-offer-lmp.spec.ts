import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('ServiceDeliveryOffer e2e test', () => {

    let navBarPage: NavBarPage;
    let serviceDeliveryOfferDialogPage: ServiceDeliveryOfferDialogPage;
    let serviceDeliveryOfferComponentsPage: ServiceDeliveryOfferComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ServiceDeliveryOffers', () => {
        navBarPage.goToEntity('service-delivery-offer-lmp');
        serviceDeliveryOfferComponentsPage = new ServiceDeliveryOfferComponentsPage();
        expect(serviceDeliveryOfferComponentsPage.getTitle())
            .toMatch(/localmarketplaceApp.serviceDeliveryOffer.home.title/);

    });

    it('should load create ServiceDeliveryOffer dialog', () => {
        serviceDeliveryOfferComponentsPage.clickOnCreateButton();
        serviceDeliveryOfferDialogPage = new ServiceDeliveryOfferDialogPage();
        expect(serviceDeliveryOfferDialogPage.getModalTitle())
            .toMatch(/localmarketplaceApp.serviceDeliveryOffer.home.createOrEditLabel/);
        serviceDeliveryOfferDialogPage.close();
    });

    it('should create and save ServiceDeliveryOffers', () => {
        serviceDeliveryOfferComponentsPage.clickOnCreateButton();
        serviceDeliveryOfferDialogPage.setDiscountInPercentageInput('5');
        expect(serviceDeliveryOfferDialogPage.getDiscountInPercentageInput()).toMatch('5');
        serviceDeliveryOfferDialogPage.setEstimatedCostInput('5');
        expect(serviceDeliveryOfferDialogPage.getEstimatedCostInput()).toMatch('5');
        serviceDeliveryOfferDialogPage.setOfferSubmitDateInput(12310020012301);
        expect(serviceDeliveryOfferDialogPage.getOfferSubmitDateInput()).toMatch('2001-12-31T02:30');
        serviceDeliveryOfferDialogPage.getIsOfferAcceptedInput().isSelected().then((selected) => {
            if (selected) {
                serviceDeliveryOfferDialogPage.getIsOfferAcceptedInput().click();
                expect(serviceDeliveryOfferDialogPage.getIsOfferAcceptedInput().isSelected()).toBeFalsy();
            } else {
                serviceDeliveryOfferDialogPage.getIsOfferAcceptedInput().click();
                expect(serviceDeliveryOfferDialogPage.getIsOfferAcceptedInput().isSelected()).toBeTruthy();
            }
        });
        serviceDeliveryOfferDialogPage.serviceProviderMapSelectLastOption();
        serviceDeliveryOfferDialogPage.serviceRequestSelectLastOption();
        serviceDeliveryOfferDialogPage.save();
        expect(serviceDeliveryOfferDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ServiceDeliveryOfferComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-service-delivery-offer-lmp div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ServiceDeliveryOfferDialogPage {
    modalTitle = element(by.css('h4#myServiceDeliveryOfferLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    discountInPercentageInput = element(by.css('input#field_discountInPercentage'));
    estimatedCostInput = element(by.css('input#field_estimatedCost'));
    offerSubmitDateInput = element(by.css('input#field_offerSubmitDate'));
    isOfferAcceptedInput = element(by.css('input#field_isOfferAccepted'));
    serviceProviderMapSelect = element(by.css('select#field_serviceProviderMap'));
    serviceRequestSelect = element(by.css('select#field_serviceRequest'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setDiscountInPercentageInput = function(discountInPercentage) {
        this.discountInPercentageInput.sendKeys(discountInPercentage);
    }

    getDiscountInPercentageInput = function() {
        return this.discountInPercentageInput.getAttribute('value');
    }

    setEstimatedCostInput = function(estimatedCost) {
        this.estimatedCostInput.sendKeys(estimatedCost);
    }

    getEstimatedCostInput = function() {
        return this.estimatedCostInput.getAttribute('value');
    }

    setOfferSubmitDateInput = function(offerSubmitDate) {
        this.offerSubmitDateInput.sendKeys(offerSubmitDate);
    }

    getOfferSubmitDateInput = function() {
        return this.offerSubmitDateInput.getAttribute('value');
    }

    getIsOfferAcceptedInput = function() {
        return this.isOfferAcceptedInput;
    }
    serviceProviderMapSelectLastOption = function() {
        this.serviceProviderMapSelect.all(by.tagName('option')).last().click();
    }

    serviceProviderMapSelectOption = function(option) {
        this.serviceProviderMapSelect.sendKeys(option);
    }

    getServiceProviderMapSelect = function() {
        return this.serviceProviderMapSelect;
    }

    getServiceProviderMapSelectedOption = function() {
        return this.serviceProviderMapSelect.element(by.css('option:checked')).getText();
    }

    serviceRequestSelectLastOption = function() {
        this.serviceRequestSelect.all(by.tagName('option')).last().click();
    }

    serviceRequestSelectOption = function(option) {
        this.serviceRequestSelect.sendKeys(option);
    }

    getServiceRequestSelect = function() {
        return this.serviceRequestSelect;
    }

    getServiceRequestSelectedOption = function() {
        return this.serviceRequestSelect.element(by.css('option:checked')).getText();
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
