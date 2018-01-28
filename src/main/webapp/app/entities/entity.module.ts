import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { LocalmarketplaceProviderLmpModule } from './provider-lmp/provider-lmp.module';
import { LocalmarketplaceProviderRatingLmpModule } from './provider-rating-lmp/provider-rating-lmp.module';
import { LocalmarketplaceProviderReviewLogLmpModule } from './provider-review-log-lmp/provider-review-log-lmp.module';
import { LocalmarketplaceServiceCategoryLmpModule } from './service-category-lmp/service-category-lmp.module';
import { LocalmarketplaceServiceLmpModule } from './service-lmp/service-lmp.module';
import { LocalmarketplaceServiceProviderMapLmpModule } from './service-provider-map-lmp/service-provider-map-lmp.module';
import { LocalmarketplaceCustomerLmpModule } from './customer-lmp/customer-lmp.module';
import { LocalmarketplaceAddressLmpModule } from './address-lmp/address-lmp.module';
import { LocalmarketplaceServiceDeliveryOfferLmpModule } from './service-delivery-offer-lmp/service-delivery-offer-lmp.module';
import { LocalmarketplaceServiceRequestLmpModule } from './service-request-lmp/service-request-lmp.module';
import { LocalmarketplaceServiceAppointmentLmpModule } from './service-appointment-lmp/service-appointment-lmp.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        LocalmarketplaceProviderLmpModule,
        LocalmarketplaceProviderRatingLmpModule,
        LocalmarketplaceProviderReviewLogLmpModule,
        LocalmarketplaceServiceCategoryLmpModule,
        LocalmarketplaceServiceLmpModule,
        LocalmarketplaceServiceProviderMapLmpModule,
        LocalmarketplaceCustomerLmpModule,
        LocalmarketplaceAddressLmpModule,
        LocalmarketplaceServiceDeliveryOfferLmpModule,
        LocalmarketplaceServiceRequestLmpModule,
        LocalmarketplaceServiceAppointmentLmpModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LocalmarketplaceEntityModule {}
