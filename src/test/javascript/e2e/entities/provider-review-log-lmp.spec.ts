import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('ProviderReviewLog e2e test', () => {

    let navBarPage: NavBarPage;
    let providerReviewLogDialogPage: ProviderReviewLogDialogPage;
    let providerReviewLogComponentsPage: ProviderReviewLogComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ProviderReviewLogs', () => {
        navBarPage.goToEntity('provider-review-log-lmp');
        providerReviewLogComponentsPage = new ProviderReviewLogComponentsPage();
        expect(providerReviewLogComponentsPage.getTitle())
            .toMatch(/localmarketplaceApp.providerReviewLog.home.title/);

    });

    it('should load create ProviderReviewLog dialog', () => {
        providerReviewLogComponentsPage.clickOnCreateButton();
        providerReviewLogDialogPage = new ProviderReviewLogDialogPage();
        expect(providerReviewLogDialogPage.getModalTitle())
            .toMatch(/localmarketplaceApp.providerReviewLog.home.createOrEditLabel/);
        providerReviewLogDialogPage.close();
    });

    it('should create and save ProviderReviewLogs', () => {
        providerReviewLogComponentsPage.clickOnCreateButton();
        providerReviewLogDialogPage.setPunctualityRatingInput('5');
        expect(providerReviewLogDialogPage.getPunctualityRatingInput()).toMatch('5');
        providerReviewLogDialogPage.setProficiencyRatingInput('5');
        expect(providerReviewLogDialogPage.getProficiencyRatingInput()).toMatch('5');
        providerReviewLogDialogPage.setEtiquattesRatingInput('5');
        expect(providerReviewLogDialogPage.getEtiquattesRatingInput()).toMatch('5');
        providerReviewLogDialogPage.setCommunicationRatingInput('5');
        expect(providerReviewLogDialogPage.getCommunicationRatingInput()).toMatch('5');
        providerReviewLogDialogPage.setPriceRatingInput('5');
        expect(providerReviewLogDialogPage.getPriceRatingInput()).toMatch('5');
        providerReviewLogDialogPage.setOverallRatingInput('5');
        expect(providerReviewLogDialogPage.getOverallRatingInput()).toMatch('5');
        providerReviewLogDialogPage.setReviewInput('5');
        expect(providerReviewLogDialogPage.getReviewInput()).toMatch('5');
        providerReviewLogDialogPage.setReviewDateInput(12310020012301);
        expect(providerReviewLogDialogPage.getReviewDateInput()).toMatch('2001-12-31T02:30');
        providerReviewLogDialogPage.serviceAppointmentSelectLastOption();
        providerReviewLogDialogPage.save();
        expect(providerReviewLogDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ProviderReviewLogComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-provider-review-log-lmp div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ProviderReviewLogDialogPage {
    modalTitle = element(by.css('h4#myProviderReviewLogLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    punctualityRatingInput = element(by.css('input#field_punctualityRating'));
    proficiencyRatingInput = element(by.css('input#field_proficiencyRating'));
    etiquattesRatingInput = element(by.css('input#field_etiquattesRating'));
    communicationRatingInput = element(by.css('input#field_communicationRating'));
    priceRatingInput = element(by.css('input#field_priceRating'));
    overallRatingInput = element(by.css('input#field_overallRating'));
    reviewInput = element(by.css('input#field_review'));
    reviewDateInput = element(by.css('input#field_reviewDate'));
    serviceAppointmentSelect = element(by.css('select#field_serviceAppointment'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setPunctualityRatingInput = function(punctualityRating) {
        this.punctualityRatingInput.sendKeys(punctualityRating);
    }

    getPunctualityRatingInput = function() {
        return this.punctualityRatingInput.getAttribute('value');
    }

    setProficiencyRatingInput = function(proficiencyRating) {
        this.proficiencyRatingInput.sendKeys(proficiencyRating);
    }

    getProficiencyRatingInput = function() {
        return this.proficiencyRatingInput.getAttribute('value');
    }

    setEtiquattesRatingInput = function(etiquattesRating) {
        this.etiquattesRatingInput.sendKeys(etiquattesRating);
    }

    getEtiquattesRatingInput = function() {
        return this.etiquattesRatingInput.getAttribute('value');
    }

    setCommunicationRatingInput = function(communicationRating) {
        this.communicationRatingInput.sendKeys(communicationRating);
    }

    getCommunicationRatingInput = function() {
        return this.communicationRatingInput.getAttribute('value');
    }

    setPriceRatingInput = function(priceRating) {
        this.priceRatingInput.sendKeys(priceRating);
    }

    getPriceRatingInput = function() {
        return this.priceRatingInput.getAttribute('value');
    }

    setOverallRatingInput = function(overallRating) {
        this.overallRatingInput.sendKeys(overallRating);
    }

    getOverallRatingInput = function() {
        return this.overallRatingInput.getAttribute('value');
    }

    setReviewInput = function(review) {
        this.reviewInput.sendKeys(review);
    }

    getReviewInput = function() {
        return this.reviewInput.getAttribute('value');
    }

    setReviewDateInput = function(reviewDate) {
        this.reviewDateInput.sendKeys(reviewDate);
    }

    getReviewDateInput = function() {
        return this.reviewDateInput.getAttribute('value');
    }

    serviceAppointmentSelectLastOption = function() {
        this.serviceAppointmentSelect.all(by.tagName('option')).last().click();
    }

    serviceAppointmentSelectOption = function(option) {
        this.serviceAppointmentSelect.sendKeys(option);
    }

    getServiceAppointmentSelect = function() {
        return this.serviceAppointmentSelect;
    }

    getServiceAppointmentSelectedOption = function() {
        return this.serviceAppointmentSelect.element(by.css('option:checked')).getText();
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
