import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ServiceRequestLmpComponent } from './service-request-lmp.component';
import { ServiceRequestLmpDetailComponent } from './service-request-lmp-detail.component';
import { ServiceRequestLmpPopupComponent } from './service-request-lmp-dialog.component';
import { ServiceRequestLmpDeletePopupComponent } from './service-request-lmp-delete-dialog.component';

@Injectable()
export class ServiceRequestLmpResolvePagingParams implements Resolve<any> {

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

export const serviceRequestRoute: Routes = [
    {
        path: 'service-request-lmp',
        component: ServiceRequestLmpComponent,
        resolve: {
            'pagingParams': ServiceRequestLmpResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER','ROLE_CUSTOMER','ROLE_PROVIDER','ROLE_ADMIN'],
            pageTitle: 'localmarketplaceApp.serviceRequest.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'service-request-lmp/:id',
        component: ServiceRequestLmpDetailComponent,
        data: {
            authorities: ['ROLE_USER','ROLE_CUSTOMER','ROLE_PROVIDER','ROLE_ADMIN'],
            pageTitle: 'localmarketplaceApp.serviceRequest.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const serviceRequestPopupRoute: Routes = [
    {
        path: 'service-request-lmp-new',
        component: ServiceRequestLmpPopupComponent,
        data: {
            authorities: ['ROLE_USER','ROLE_CUSTOMER','ROLE_ADMIN'],
            pageTitle: 'localmarketplaceApp.serviceRequest.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'service-request-lmp/:id/edit',
        component: ServiceRequestLmpPopupComponent,
        data: {
            authorities: ['ROLE_USER','ROLE_CUSTOMER','ROLE_ADMIN'],
            pageTitle: 'localmarketplaceApp.serviceRequest.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'service-request-lmp/:id/delete',
        component: ServiceRequestLmpDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER','ROLE_CUSTOMER','ROLE_ADMIN'],
            pageTitle: 'localmarketplaceApp.serviceRequest.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
