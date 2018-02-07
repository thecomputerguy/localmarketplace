import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ProviderRatingLmpComponent } from './provider-rating-lmp.component';
import { ProviderRatingLmpDetailComponent } from './provider-rating-lmp-detail.component';
import { ProviderRatingLmpPopupComponent } from './provider-rating-lmp-dialog.component';
import { ProviderRatingLmpDeletePopupComponent } from './provider-rating-lmp-delete-dialog.component';

export const providerRatingRoute: Routes = [
    {
        path: 'provider-rating-lmp',
        component: ProviderRatingLmpComponent,
        data: {
            authorities: ['ROLE_USER','ROLE_CUSTOMER','ROLE_PROVIDER'],
            pageTitle: 'localmarketplaceApp.providerRating.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'provider-rating-lmp/:id',
        component: ProviderRatingLmpDetailComponent,
        data: {
            authorities: ['ROLE_USER','ROLE_PROVIDER','ROLE_CUSTOMER'],
            pageTitle: 'localmarketplaceApp.providerRating.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const providerRatingPopupRoute: Routes = [
    {
        path: 'provider-rating-lmp-new',
        component: ProviderRatingLmpPopupComponent,
        data: {
            authorities: ['ROLE_USER','ROLE_CUSTOMER'],
            pageTitle: 'localmarketplaceApp.providerRating.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'provider-rating-lmp/:id/edit',
        component: ProviderRatingLmpPopupComponent,
        data: {
            authorities: ['ROLE_USER','ROLE_CUSTOMER'],
            pageTitle: 'localmarketplaceApp.providerRating.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'provider-rating-lmp/:id/delete',
        component: ProviderRatingLmpDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER','ROLE_CUSTOMER'],
            pageTitle: 'localmarketplaceApp.providerRating.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
