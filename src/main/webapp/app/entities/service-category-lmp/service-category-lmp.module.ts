import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LocalmarketplaceSharedModule } from '../../shared';
import {
    ServiceCategoryLmpService,
    ServiceCategoryLmpPopupService,
    ServiceCategoryLmpComponent,
    ServiceCategoryLmpDetailComponent,
    ServiceCategoryLmpDialogComponent,
    ServiceCategoryLmpPopupComponent,
    ServiceCategoryLmpDeletePopupComponent,
    ServiceCategoryLmpDeleteDialogComponent,
    serviceCategoryRoute,
    serviceCategoryPopupRoute,
} from './';

const ENTITY_STATES = [
    ...serviceCategoryRoute,
    ...serviceCategoryPopupRoute,
];

@NgModule({
    imports: [
        LocalmarketplaceSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ServiceCategoryLmpComponent,
        ServiceCategoryLmpDetailComponent,
        ServiceCategoryLmpDialogComponent,
        ServiceCategoryLmpDeleteDialogComponent,
        ServiceCategoryLmpPopupComponent,
        ServiceCategoryLmpDeletePopupComponent,
    ],
    entryComponents: [
        ServiceCategoryLmpComponent,
        ServiceCategoryLmpDialogComponent,
        ServiceCategoryLmpPopupComponent,
        ServiceCategoryLmpDeleteDialogComponent,
        ServiceCategoryLmpDeletePopupComponent,
    ],
    providers: [
        ServiceCategoryLmpService,
        ServiceCategoryLmpPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LocalmarketplaceServiceCategoryLmpModule {}
