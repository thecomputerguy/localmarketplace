import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ServiceProviderMapLmpComponent } from './service-provider-map-lmp.component';
import { ServiceProviderMapLmpDetailComponent } from './service-provider-map-lmp-detail.component';
import { ServiceProviderMapLmpPopupComponent } from './service-provider-map-lmp-dialog.component';
import { ServiceProviderMapLmpDeletePopupComponent } from './service-provider-map-lmp-delete-dialog.component';

export const serviceProviderMapRoute: Routes = [
    {
        path: 'service-provider-map-lmp',
        component: ServiceProviderMapLmpComponent,
        data: {
            authorities: ['ROLE_USER','ROLE_PROVIDER','ROLE_CUSTOMER','ROLE_ADMIN'],
            pageTitle: 'localmarketplaceApp.serviceProviderMap.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'service-provider-map-lmp/:id',
        component: ServiceProviderMapLmpDetailComponent,
        data: {
            authorities: ['ROLE_USER','ROLE_PROVIDER','ROLE_CUSTOMER','ROLE_ADMIN'],
            pageTitle: 'localmarketplaceApp.serviceProviderMap.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const serviceProviderMapPopupRoute: Routes = [
    {
        path: 'service-provider-map-lmp-new',
        component: ServiceProviderMapLmpPopupComponent,
        data: {
            authorities: ['ROLE_USER','ROLE_PROVIDER','ROLE_ADMIN'],
            pageTitle: 'localmarketplaceApp.serviceProviderMap.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'service-provider-map-lmp/:id/edit',
        component: ServiceProviderMapLmpPopupComponent,
        data: {
            authorities: ['ROLE_USER','ROLE_PROVIDER','ROLE_ADMIN'],
            pageTitle: 'localmarketplaceApp.serviceProviderMap.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'service-provider-map-lmp/:id/delete',
        component: ServiceProviderMapLmpDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER','ROLE_PROVIDER','ROLE_ADMIN'],
            pageTitle: 'localmarketplaceApp.serviceProviderMap.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
