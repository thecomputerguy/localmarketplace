import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LocalmarketplaceSharedModule } from '../../shared';
import {
    ServiceRequestLmpService,
    ServiceRequestLmpPopupService,
    ServiceRequestLmpComponent,
    ServiceRequestLmpDetailComponent,
    ServiceRequestLmpDialogComponent,
    ServiceRequestLmpPopupComponent,
    ServiceRequestLmpDeletePopupComponent,
    ServiceRequestLmpDeleteDialogComponent,
    serviceRequestRoute,
    serviceRequestPopupRoute,
    ServiceRequestLmpResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...serviceRequestRoute,
    ...serviceRequestPopupRoute,
];

@NgModule({
    imports: [
        LocalmarketplaceSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ServiceRequestLmpComponent,
        ServiceRequestLmpDetailComponent,
        ServiceRequestLmpDialogComponent,
        ServiceRequestLmpDeleteDialogComponent,
        ServiceRequestLmpPopupComponent,
        ServiceRequestLmpDeletePopupComponent,
    ],
    entryComponents: [
        ServiceRequestLmpComponent,
        ServiceRequestLmpDialogComponent,
        ServiceRequestLmpPopupComponent,
        ServiceRequestLmpDeleteDialogComponent,
        ServiceRequestLmpDeletePopupComponent,
    ],
    providers: [
        ServiceRequestLmpService,
        ServiceRequestLmpPopupService,
        ServiceRequestLmpResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LocalmarketplaceServiceRequestLmpModule {}
