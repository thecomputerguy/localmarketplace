import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ServiceDeliveryOfferLmpComponent } from './service-delivery-offer-lmp.component';
import { ServiceDeliveryOfferLmpDetailComponent } from './service-delivery-offer-lmp-detail.component';
import { ServiceDeliveryOfferLmpPopupComponent } from './service-delivery-offer-lmp-dialog.component';
import { ServiceDeliveryOfferLmpDeletePopupComponent } from './service-delivery-offer-lmp-delete-dialog.component';

export const serviceDeliveryOfferRoute: Routes = [
    {
        path: 'service-delivery-offer-lmp',
        component: ServiceDeliveryOfferLmpComponent,
        data: {
            authorities: ['ROLE_USER','ROLE_PROVIDER','ROLE_CUSTOMER'],
            pageTitle: 'localmarketplaceApp.serviceDeliveryOffer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'service-delivery-offer-lmp/:id',
        component: ServiceDeliveryOfferLmpDetailComponent,
        data: {
            authorities: ['ROLE_USER','ROLE_PROVIDER','ROLE_CUSTOMER'],
            pageTitle: 'localmarketplaceApp.serviceDeliveryOffer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const serviceDeliveryOfferPopupRoute: Routes = [
    {
        path: 'service-delivery-offer-lmp-new',
        component: ServiceDeliveryOfferLmpPopupComponent,
        data: {
            authorities: ['ROLE_USER','ROLE_PROVIDER','ROLE_ADMIN'],
            pageTitle: 'localmarketplaceApp.serviceDeliveryOffer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'service-delivery-offer-lmp/:id/edit',
        component: ServiceDeliveryOfferLmpPopupComponent,
        data: {
            authorities: ['ROLE_USER','ROLE_PROVIDER','ROLE_ADMIN'],
            pageTitle: 'localmarketplaceApp.serviceDeliveryOffer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'service-delivery-offer-lmp/:id/delete',
        component: ServiceDeliveryOfferLmpDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER','ROLE_PROVIDER','ROLE_ADMIN'],
            pageTitle: 'localmarketplaceApp.serviceDeliveryOffer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
