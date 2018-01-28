import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LocalmarketplaceSharedModule } from '../../shared';
import {
    ServiceProviderMapLmpService,
    ServiceProviderMapLmpPopupService,
    ServiceProviderMapLmpComponent,
    ServiceProviderMapLmpDetailComponent,
    ServiceProviderMapLmpDialogComponent,
    ServiceProviderMapLmpPopupComponent,
    ServiceProviderMapLmpDeletePopupComponent,
    ServiceProviderMapLmpDeleteDialogComponent,
    serviceProviderMapRoute,
    serviceProviderMapPopupRoute,
} from './';

const ENTITY_STATES = [
    ...serviceProviderMapRoute,
    ...serviceProviderMapPopupRoute,
];

@NgModule({
    imports: [
        LocalmarketplaceSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ServiceProviderMapLmpComponent,
        ServiceProviderMapLmpDetailComponent,
        ServiceProviderMapLmpDialogComponent,
        ServiceProviderMapLmpDeleteDialogComponent,
        ServiceProviderMapLmpPopupComponent,
        ServiceProviderMapLmpDeletePopupComponent,
    ],
    entryComponents: [
        ServiceProviderMapLmpComponent,
        ServiceProviderMapLmpDialogComponent,
        ServiceProviderMapLmpPopupComponent,
        ServiceProviderMapLmpDeleteDialogComponent,
        ServiceProviderMapLmpDeletePopupComponent,
    ],
    providers: [
        ServiceProviderMapLmpService,
        ServiceProviderMapLmpPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LocalmarketplaceServiceProviderMapLmpModule {}
