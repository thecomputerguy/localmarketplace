import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LocalmarketplaceSharedModule } from '../../shared';
import {
    AddressLmpService,
    AddressLmpPopupService,
    AddressLmpComponent,
    AddressLmpDetailComponent,
    AddressLmpDialogComponent,
    AddressLmpPopupComponent,
    AddressLmpDeletePopupComponent,
    AddressLmpDeleteDialogComponent,
    addressRoute,
    addressPopupRoute,
    AddressLmpResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...addressRoute,
    ...addressPopupRoute,
];

@NgModule({
    imports: [
        LocalmarketplaceSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AddressLmpComponent,
        AddressLmpDetailComponent,
        AddressLmpDialogComponent,
        AddressLmpDeleteDialogComponent,
        AddressLmpPopupComponent,
        AddressLmpDeletePopupComponent,
    ],
    entryComponents: [
        AddressLmpComponent,
        AddressLmpDialogComponent,
        AddressLmpPopupComponent,
        AddressLmpDeleteDialogComponent,
        AddressLmpDeletePopupComponent,
    ],
    providers: [
        AddressLmpService,
        AddressLmpPopupService,
        AddressLmpResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LocalmarketplaceAddressLmpModule {}
