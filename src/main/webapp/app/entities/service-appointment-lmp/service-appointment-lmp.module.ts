import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LocalmarketplaceSharedModule } from '../../shared';
import {
    ServiceAppointmentLmpService,
    ServiceAppointmentLmpPopupService,
    ServiceAppointmentLmpComponent,
    ServiceAppointmentLmpDetailComponent,
    ServiceAppointmentLmpDialogComponent,
    ServiceAppointmentLmpPopupComponent,
    ServiceAppointmentLmpDeletePopupComponent,
    ServiceAppointmentLmpDeleteDialogComponent,
    serviceAppointmentRoute,
    serviceAppointmentPopupRoute,
    ServiceAppointmentLmpResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...serviceAppointmentRoute,
    ...serviceAppointmentPopupRoute,
];

@NgModule({
    imports: [
        LocalmarketplaceSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ServiceAppointmentLmpComponent,
        ServiceAppointmentLmpDetailComponent,
        ServiceAppointmentLmpDialogComponent,
        ServiceAppointmentLmpDeleteDialogComponent,
        ServiceAppointmentLmpPopupComponent,
        ServiceAppointmentLmpDeletePopupComponent,
    ],
    entryComponents: [
        ServiceAppointmentLmpComponent,
        ServiceAppointmentLmpDialogComponent,
        ServiceAppointmentLmpPopupComponent,
        ServiceAppointmentLmpDeleteDialogComponent,
        ServiceAppointmentLmpDeletePopupComponent,
    ],
    providers: [
        ServiceAppointmentLmpService,
        ServiceAppointmentLmpPopupService,
        ServiceAppointmentLmpResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LocalmarketplaceServiceAppointmentLmpModule {}
