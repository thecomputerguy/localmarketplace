import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LocalmarketplaceSharedModule } from '../../shared';
import {
    ProviderLmpService,
    ProviderLmpPopupService,
    ProviderLmpComponent,
    ProviderLmpDetailComponent,
    ProviderLmpDialogComponent,
    ProviderLmpPopupComponent,
    ProviderLmpDeletePopupComponent,
    ProviderLmpDeleteDialogComponent,
    providerRoute,
    providerPopupRoute,
} from './';

const ENTITY_STATES = [
    ...providerRoute,
    ...providerPopupRoute,
];

@NgModule({
    imports: [
        LocalmarketplaceSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ProviderLmpComponent,
        ProviderLmpDetailComponent,
        ProviderLmpDialogComponent,
        ProviderLmpDeleteDialogComponent,
        ProviderLmpPopupComponent,
        ProviderLmpDeletePopupComponent,
    ],
    entryComponents: [
        ProviderLmpComponent,
        ProviderLmpDialogComponent,
        ProviderLmpPopupComponent,
        ProviderLmpDeleteDialogComponent,
        ProviderLmpDeletePopupComponent,
    ],
    providers: [
        ProviderLmpService,
        ProviderLmpPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LocalmarketplaceProviderLmpModule {}
