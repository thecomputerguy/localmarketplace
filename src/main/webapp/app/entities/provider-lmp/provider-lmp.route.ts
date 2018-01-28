import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ProviderLmpComponent } from './provider-lmp.component';
import { ProviderLmpDetailComponent } from './provider-lmp-detail.component';
import { ProviderLmpPopupComponent } from './provider-lmp-dialog.component';
import { ProviderLmpDeletePopupComponent } from './provider-lmp-delete-dialog.component';

export const providerRoute: Routes = [
    {
        path: 'provider-lmp',
        component: ProviderLmpComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'localmarketplaceApp.provider.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'provider-lmp/:id',
        component: ProviderLmpDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'localmarketplaceApp.provider.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const providerPopupRoute: Routes = [
    {
        path: 'provider-lmp-new',
        component: ProviderLmpPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'localmarketplaceApp.provider.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'provider-lmp/:id/edit',
        component: ProviderLmpPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'localmarketplaceApp.provider.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'provider-lmp/:id/delete',
        component: ProviderLmpDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'localmarketplaceApp.provider.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
