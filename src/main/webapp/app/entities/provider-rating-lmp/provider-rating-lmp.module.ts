import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LocalmarketplaceSharedModule } from '../../shared';
import {
    ProviderRatingLmpService,
    ProviderRatingLmpPopupService,
    ProviderRatingLmpComponent,
    ProviderRatingLmpDetailComponent,
    ProviderRatingLmpDialogComponent,
    ProviderRatingLmpPopupComponent,
    ProviderRatingLmpDeletePopupComponent,
    ProviderRatingLmpDeleteDialogComponent,
    providerRatingRoute,
    providerRatingPopupRoute,
} from './';

const ENTITY_STATES = [
    ...providerRatingRoute,
    ...providerRatingPopupRoute,
];

@NgModule({
    imports: [
        LocalmarketplaceSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ProviderRatingLmpComponent,
        ProviderRatingLmpDetailComponent,
        ProviderRatingLmpDialogComponent,
        ProviderRatingLmpDeleteDialogComponent,
        ProviderRatingLmpPopupComponent,
        ProviderRatingLmpDeletePopupComponent,
    ],
    entryComponents: [
        ProviderRatingLmpComponent,
        ProviderRatingLmpDialogComponent,
        ProviderRatingLmpPopupComponent,
        ProviderRatingLmpDeleteDialogComponent,
        ProviderRatingLmpDeletePopupComponent,
    ],
    providers: [
        ProviderRatingLmpService,
        ProviderRatingLmpPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LocalmarketplaceProviderRatingLmpModule {}
