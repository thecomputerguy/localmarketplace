import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ServiceLmpComponent } from './service-lmp.component';
import { ServiceLmpDetailComponent } from './service-lmp-detail.component';
import { ServiceLmpPopupComponent } from './service-lmp-dialog.component';
import { ServiceLmpDeletePopupComponent } from './service-lmp-delete-dialog.component';

export const serviceRoute: Routes = [
    {
        path: 'service-lmp',
        component: ServiceLmpComponent,
        data: {
            authorities: ['ROLE_USER','ROLE_CUSTOMER','ROLE_PROVIDER'],
            pageTitle: 'localmarketplaceApp.service.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'service-lmp/:id',
        component: ServiceLmpDetailComponent,
        data: {
            authorities: ['ROLE_USER','ROLE_CUSTOMER','ROLE_PROVIDER'],
            pageTitle: 'localmarketplaceApp.service.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const servicePopupRoute: Routes = [
    {
        path: 'service-lmp-new',
        component: ServiceLmpPopupComponent,
        data: {
            authorities: ['ROLE_USER','ROLE_CUSTOMER','ROLE_PROVIDER'],
            pageTitle: 'localmarketplaceApp.service.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'service-lmp/:id/edit',
        component: ServiceLmpPopupComponent,
        data: {
            authorities: ['ROLE_USER','ROLE_CUSTOMER','ROLE_PROVIDER'],
            pageTitle: 'localmarketplaceApp.service.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'service-lmp/:id/delete',
        component: ServiceLmpDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER','ROLE_CUSTOMER','ROLE_PROVIDER'],
            pageTitle: 'localmarketplaceApp.service.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
