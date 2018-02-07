import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ServiceAppointmentLmpComponent } from './service-appointment-lmp.component';
import { ServiceAppointmentLmpDetailComponent } from './service-appointment-lmp-detail.component';
import { ServiceAppointmentLmpPopupComponent } from './service-appointment-lmp-dialog.component';
import { ServiceAppointmentLmpDeletePopupComponent } from './service-appointment-lmp-delete-dialog.component';

@Injectable()
export class ServiceAppointmentLmpResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const serviceAppointmentRoute: Routes = [
    {
        path: 'service-appointment-lmp',
        component: ServiceAppointmentLmpComponent,
        resolve: {
            'pagingParams': ServiceAppointmentLmpResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER','ROLE_CUSTOMER','ROLE_PROVIDER'],
            pageTitle: 'localmarketplaceApp.serviceAppointment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'service-appointment-lmp/:id',
        component: ServiceAppointmentLmpDetailComponent,
        data: {
            authorities: ['ROLE_USER','ROLE_CUSTOMER','ROLE_PROVIDER'],
            pageTitle: 'localmarketplaceApp.serviceAppointment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const serviceAppointmentPopupRoute: Routes = [
    {
        path: 'service-appointment-lmp-new',
        component: ServiceAppointmentLmpPopupComponent,
        data: {
            authorities: ['ROLE_USER','ROLE_CUSTOMER'],
            pageTitle: 'localmarketplaceApp.serviceAppointment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'service-appointment-lmp/:id/edit',
        component: ServiceAppointmentLmpPopupComponent,
        data: {
            authorities: ['ROLE_USER','ROLE_CUSTOMER'],
            pageTitle: 'localmarketplaceApp.serviceAppointment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'service-appointment-lmp/:id/delete',
        component: ServiceAppointmentLmpDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER','ROLE_CUSTOMER'],
            pageTitle: 'localmarketplaceApp.serviceAppointment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
