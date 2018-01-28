import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LocalmarketplaceSharedModule } from '../../shared';
import {
    ServiceDeliveryOfferLmpService,
    ServiceDeliveryOfferLmpPopupService,
    ServiceDeliveryOfferLmpComponent,
    ServiceDeliveryOfferLmpDetailComponent,
    ServiceDeliveryOfferLmpDialogComponent,
    ServiceDeliveryOfferLmpPopupComponent,
    ServiceDeliveryOfferLmpDeletePopupComponent,
    ServiceDeliveryOfferLmpDeleteDialogComponent,
    serviceDeliveryOfferRoute,
    serviceDeliveryOfferPopupRoute,
} from './';

const ENTITY_STATES = [
    ...serviceDeliveryOfferRoute,
    ...serviceDeliveryOfferPopupRoute,
];

@NgModule({
    imports: [
        LocalmarketplaceSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ServiceDeliveryOfferLmpComponent,
        ServiceDeliveryOfferLmpDetailComponent,
        ServiceDeliveryOfferLmpDialogComponent,
        ServiceDeliveryOfferLmpDeleteDialogComponent,
        ServiceDeliveryOfferLmpPopupComponent,
        ServiceDeliveryOfferLmpDeletePopupComponent,
    ],
    entryComponents: [
        ServiceDeliveryOfferLmpComponent,
        ServiceDeliveryOfferLmpDialogComponent,
        ServiceDeliveryOfferLmpPopupComponent,
        ServiceDeliveryOfferLmpDeleteDialogComponent,
        ServiceDeliveryOfferLmpDeletePopupComponent,
    ],
    providers: [
        ServiceDeliveryOfferLmpService,
        ServiceDeliveryOfferLmpPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LocalmarketplaceServiceDeliveryOfferLmpModule {}
