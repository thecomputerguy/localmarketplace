import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('ServiceCategory e2e test', () => {

    let navBarPage: NavBarPage;
    let serviceCategoryDialogPage: ServiceCategoryDialogPage;
    let serviceCategoryComponentsPage: ServiceCategoryComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ServiceCategories', () => {
        navBarPage.goToEntity('service-category-lmp');
        serviceCategoryComponentsPage = new ServiceCategoryComponentsPage();
        expect(serviceCategoryComponentsPage.getTitle())
            .toMatch(/localmarketplaceApp.serviceCategory.home.title/);

    });

    it('should load create ServiceCategory dialog', () => {
        serviceCategoryComponentsPage.clickOnCreateButton();
        serviceCategoryDialogPage = new ServiceCategoryDialogPage();
        expect(serviceCategoryDialogPage.getModalTitle())
            .toMatch(/localmarketplaceApp.serviceCategory.home.createOrEditLabel/);
        serviceCategoryDialogPage.close();
    });

    it('should create and save ServiceCategories', () => {
        serviceCategoryComponentsPage.clickOnCreateButton();
        serviceCategoryDialogPage.setCategoryNameInput('categoryName');
        expect(serviceCategoryDialogPage.getCategoryNameInput()).toMatch('categoryName');
        serviceCategoryDialogPage.save();
        expect(serviceCategoryDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ServiceCategoryComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-service-category-lmp div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ServiceCategoryDialogPage {
    modalTitle = element(by.css('h4#myServiceCategoryLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    categoryNameInput = element(by.css('input#field_categoryName'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setCategoryNameInput = function(categoryName) {
        this.categoryNameInput.sendKeys(categoryName);
    }

    getCategoryNameInput = function() {
        return this.categoryNameInput.getAttribute('value');
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
