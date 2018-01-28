import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('ProviderRating e2e test', () => {

    let navBarPage: NavBarPage;
    let providerRatingDialogPage: ProviderRatingDialogPage;
    let providerRatingComponentsPage: ProviderRatingComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ProviderRatings', () => {
        navBarPage.goToEntity('provider-rating-lmp');
        providerRatingComponentsPage = new ProviderRatingComponentsPage();
        expect(providerRatingComponentsPage.getTitle())
            .toMatch(/localmarketplaceApp.providerRating.home.title/);

    });

    it('should load create ProviderRating dialog', () => {
        providerRatingComponentsPage.clickOnCreateButton();
        providerRatingDialogPage = new ProviderRatingDialogPage();
        expect(providerRatingDialogPage.getModalTitle())
            .toMatch(/localmarketplaceApp.providerRating.home.createOrEditLabel/);
        providerRatingDialogPage.close();
    });

    it('should create and save ProviderRatings', () => {
        providerRatingComponentsPage.clickOnCreateButton();
        providerRatingDialogPage.setAvgPunctualityRatingInput('5');
        expect(providerRatingDialogPage.getAvgPunctualityRatingInput()).toMatch('5');
        providerRatingDialogPage.setAvgProfRatingInput('5');
        expect(providerRatingDialogPage.getAvgProfRatingInput()).toMatch('5');
        providerRatingDialogPage.setAvgEtiRatingInput('5');
        expect(providerRatingDialogPage.getAvgEtiRatingInput()).toMatch('5');
        providerRatingDialogPage.setAvgCommRatingInput('5');
        expect(providerRatingDialogPage.getAvgCommRatingInput()).toMatch('5');
        providerRatingDialogPage.setAvgPriceRatingInput('5');
        expect(providerRatingDialogPage.getAvgPriceRatingInput()).toMatch('5');
        providerRatingDialogPage.setAvgOverallRatingInput('5');
        expect(providerRatingDialogPage.getAvgOverallRatingInput()).toMatch('5');
        providerRatingDialogPage.setLastUpdatedOnInput('5');
        expect(providerRatingDialogPage.getLastUpdatedOnInput()).toMatch('5');
        providerRatingDialogPage.providerSelectLastOption();
        providerRatingDialogPage.save();
        expect(providerRatingDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ProviderRatingComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-provider-rating-lmp div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ProviderRatingDialogPage {
    modalTitle = element(by.css('h4#myProviderRatingLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    avgPunctualityRatingInput = element(by.css('input#field_avgPunctualityRating'));
    avgProfRatingInput = element(by.css('input#field_avgProfRating'));
    avgEtiRatingInput = element(by.css('input#field_avgEtiRating'));
    avgCommRatingInput = element(by.css('input#field_avgCommRating'));
    avgPriceRatingInput = element(by.css('input#field_avgPriceRating'));
    avgOverallRatingInput = element(by.css('input#field_avgOverallRating'));
    lastUpdatedOnInput = element(by.css('input#field_lastUpdatedOn'));
    providerSelect = element(by.css('select#field_provider'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setAvgPunctualityRatingInput = function(avgPunctualityRating) {
        this.avgPunctualityRatingInput.sendKeys(avgPunctualityRating);
    }

    getAvgPunctualityRatingInput = function() {
        return this.avgPunctualityRatingInput.getAttribute('value');
    }

    setAvgProfRatingInput = function(avgProfRating) {
        this.avgProfRatingInput.sendKeys(avgProfRating);
    }

    getAvgProfRatingInput = function() {
        return this.avgProfRatingInput.getAttribute('value');
    }

    setAvgEtiRatingInput = function(avgEtiRating) {
        this.avgEtiRatingInput.sendKeys(avgEtiRating);
    }

    getAvgEtiRatingInput = function() {
        return this.avgEtiRatingInput.getAttribute('value');
    }

    setAvgCommRatingInput = function(avgCommRating) {
        this.avgCommRatingInput.sendKeys(avgCommRating);
    }

    getAvgCommRatingInput = function() {
        return this.avgCommRatingInput.getAttribute('value');
    }

    setAvgPriceRatingInput = function(avgPriceRating) {
        this.avgPriceRatingInput.sendKeys(avgPriceRating);
    }

    getAvgPriceRatingInput = function() {
        return this.avgPriceRatingInput.getAttribute('value');
    }

    setAvgOverallRatingInput = function(avgOverallRating) {
        this.avgOverallRatingInput.sendKeys(avgOverallRating);
    }

    getAvgOverallRatingInput = function() {
        return this.avgOverallRatingInput.getAttribute('value');
    }

    setLastUpdatedOnInput = function(lastUpdatedOn) {
        this.lastUpdatedOnInput.sendKeys(lastUpdatedOn);
    }

    getLastUpdatedOnInput = function() {
        return this.lastUpdatedOnInput.getAttribute('value');
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
