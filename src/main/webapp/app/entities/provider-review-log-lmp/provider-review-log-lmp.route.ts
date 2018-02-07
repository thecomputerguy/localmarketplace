import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ProviderReviewLogLmpComponent } from './provider-review-log-lmp.component';
import { ProviderReviewLogLmpDetailComponent } from './provider-review-log-lmp-detail.component';
import { ProviderReviewLogLmpPopupComponent } from './provider-review-log-lmp-dialog.component';
import { ProviderReviewLogLmpDeletePopupComponent } from './provider-review-log-lmp-delete-dialog.component';

@Injectable()
export class ProviderReviewLogLmpResolvePagingParams implements Resolve<any> {

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

export const providerReviewLogRoute: Routes = [
    {
        path: 'provider-review-log-lmp',
        component: ProviderReviewLogLmpComponent,
        resolve: {
            'pagingParams': ProviderReviewLogLmpResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER','ROLE_PROVIDER','ROLE_CUSTOMER'],
            pageTitle: 'localmarketplaceApp.providerReviewLog.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'provider-review-log-lmp/:id',
        component: ProviderReviewLogLmpDetailComponent,
        data: {
            authorities: ['ROLE_USER','ROLE_PROVIDER','ROLE_CUSTOMER'],
            pageTitle: 'localmarketplaceApp.providerReviewLog.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const providerReviewLogPopupRoute: Routes = [
    {
        path: 'provider-review-log-lmp-new',
        component: ProviderReviewLogLmpPopupComponent,
        data: {
            authorities: ['ROLE_USER','ROLE_CUSTOMER'],
            pageTitle: 'localmarketplaceApp.providerReviewLog.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'provider-review-log-lmp/:id/edit',
        component: ProviderReviewLogLmpPopupComponent,
        data: {
            authorities: ['ROLE_USER','ROLE_CUSTOMER'],
            pageTitle: 'localmarketplaceApp.providerReviewLog.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'provider-review-log-lmp/:id/delete',
        component: ProviderReviewLogLmpDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER','ROLE_CUSTOMER'],
            pageTitle: 'localmarketplaceApp.providerReviewLog.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
