import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { CustomerLmpComponent } from './customer-lmp.component';
import { CustomerLmpDetailComponent } from './customer-lmp-detail.component';
import { CustomerLmpPopupComponent } from './customer-lmp-dialog.component';
import { CustomerLmpDeletePopupComponent } from './customer-lmp-delete-dialog.component';

@Injectable()
export class CustomerLmpResolvePagingParams implements Resolve<any> {

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

export const customerRoute: Routes = [
    {
        path: 'customer-lmp',
        component: CustomerLmpComponent,
        resolve: {
            'pagingParams': CustomerLmpResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'localmarketplaceApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'customer-lmp/:id',
        component: CustomerLmpDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'localmarketplaceApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const customerPopupRoute: Routes = [
    {
        path: 'customer-lmp-new',
        component: CustomerLmpPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'localmarketplaceApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'customer-lmp/:id/edit',
        component: CustomerLmpPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'localmarketplaceApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'customer-lmp/:id/delete',
        component: CustomerLmpDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'localmarketplaceApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
