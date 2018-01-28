import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LocalmarketplaceSharedModule } from '../../shared';
import {
    CustomerLmpService,
    CustomerLmpPopupService,
    CustomerLmpComponent,
    CustomerLmpDetailComponent,
    CustomerLmpDialogComponent,
    CustomerLmpPopupComponent,
    CustomerLmpDeletePopupComponent,
    CustomerLmpDeleteDialogComponent,
    customerRoute,
    customerPopupRoute,
    CustomerLmpResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...customerRoute,
    ...customerPopupRoute,
];

@NgModule({
    imports: [
        LocalmarketplaceSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CustomerLmpComponent,
        CustomerLmpDetailComponent,
        CustomerLmpDialogComponent,
        CustomerLmpDeleteDialogComponent,
        CustomerLmpPopupComponent,
        CustomerLmpDeletePopupComponent,
    ],
    entryComponents: [
        CustomerLmpComponent,
        CustomerLmpDialogComponent,
        CustomerLmpPopupComponent,
        CustomerLmpDeleteDialogComponent,
        CustomerLmpDeletePopupComponent,
    ],
    providers: [
        CustomerLmpService,
        CustomerLmpPopupService,
        CustomerLmpResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LocalmarketplaceCustomerLmpModule {}
