import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LocalmarketplaceSharedModule } from '../../shared';
import {
    ServiceLmpService,
    ServiceLmpPopupService,
    ServiceLmpComponent,
    ServiceLmpDetailComponent,
    ServiceLmpDialogComponent,
    ServiceLmpPopupComponent,
    ServiceLmpDeletePopupComponent,
    ServiceLmpDeleteDialogComponent,
    serviceRoute,
    servicePopupRoute,
} from './';

const ENTITY_STATES = [
    ...serviceRoute,
    ...servicePopupRoute,
];

@NgModule({
    imports: [
        LocalmarketplaceSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ServiceLmpComponent,
        ServiceLmpDetailComponent,
        ServiceLmpDialogComponent,
        ServiceLmpDeleteDialogComponent,
        ServiceLmpPopupComponent,
        ServiceLmpDeletePopupComponent,
    ],
    entryComponents: [
        ServiceLmpComponent,
        ServiceLmpDialogComponent,
        ServiceLmpPopupComponent,
        ServiceLmpDeleteDialogComponent,
        ServiceLmpDeletePopupComponent,
    ],
    providers: [
        ServiceLmpService,
        ServiceLmpPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LocalmarketplaceServiceLmpModule {}
