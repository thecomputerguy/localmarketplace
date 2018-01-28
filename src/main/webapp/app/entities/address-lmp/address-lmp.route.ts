import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { AddressLmpComponent } from './address-lmp.component';
import { AddressLmpDetailComponent } from './address-lmp-detail.component';
import { AddressLmpPopupComponent } from './address-lmp-dialog.component';
import { AddressLmpDeletePopupComponent } from './address-lmp-delete-dialog.component';

@Injectable()
export class AddressLmpResolvePagingParams implements Resolve<any> {

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

export const addressRoute: Routes = [
    {
        path: 'address-lmp',
        component: AddressLmpComponent,
        resolve: {
            'pagingParams': AddressLmpResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'localmarketplaceApp.address.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'address-lmp/:id',
        component: AddressLmpDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'localmarketplaceApp.address.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const addressPopupRoute: Routes = [
    {
        path: 'address-lmp-new',
        component: AddressLmpPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'localmarketplaceApp.address.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'address-lmp/:id/edit',
        component: AddressLmpPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'localmarketplaceApp.address.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'address-lmp/:id/delete',
        component: AddressLmpDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'localmarketplaceApp.address.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
