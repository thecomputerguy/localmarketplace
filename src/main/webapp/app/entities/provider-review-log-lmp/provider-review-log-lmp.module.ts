import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LocalmarketplaceSharedModule } from '../../shared';
import {
    ProviderReviewLogLmpService,
    ProviderReviewLogLmpPopupService,
    ProviderReviewLogLmpComponent,
    ProviderReviewLogLmpDetailComponent,
    ProviderReviewLogLmpDialogComponent,
    ProviderReviewLogLmpPopupComponent,
    ProviderReviewLogLmpDeletePopupComponent,
    ProviderReviewLogLmpDeleteDialogComponent,
    providerReviewLogRoute,
    providerReviewLogPopupRoute,
    ProviderReviewLogLmpResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...providerReviewLogRoute,
    ...providerReviewLogPopupRoute,
];

@NgModule({
    imports: [
        LocalmarketplaceSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ProviderReviewLogLmpComponent,
        ProviderReviewLogLmpDetailComponent,
        ProviderReviewLogLmpDialogComponent,
        ProviderReviewLogLmpDeleteDialogComponent,
        ProviderReviewLogLmpPopupComponent,
        ProviderReviewLogLmpDeletePopupComponent,
    ],
    entryComponents: [
        ProviderReviewLogLmpComponent,
        ProviderReviewLogLmpDialogComponent,
        ProviderReviewLogLmpPopupComponent,
        ProviderReviewLogLmpDeleteDialogComponent,
        ProviderReviewLogLmpDeletePopupComponent,
    ],
    providers: [
        ProviderReviewLogLmpService,
        ProviderReviewLogLmpPopupService,
        ProviderReviewLogLmpResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LocalmarketplaceProviderReviewLogLmpModule {}
