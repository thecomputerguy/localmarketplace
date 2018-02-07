import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ServiceCategoryLmpComponent } from './service-category-lmp.component';
import { ServiceCategoryLmpDetailComponent } from './service-category-lmp-detail.component';
import { ServiceCategoryLmpPopupComponent } from './service-category-lmp-dialog.component';
import { ServiceCategoryLmpDeletePopupComponent } from './service-category-lmp-delete-dialog.component';

export const serviceCategoryRoute: Routes = [
    {
        path: 'service-category-lmp',
        component: ServiceCategoryLmpComponent,
        data: {
            authorities: ['ROLE_USER','ROLE_CUSTOMER','ROLE_PROVIDER','ROLE_ADMIN'],
            pageTitle: 'localmarketplaceApp.serviceCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'service-category-lmp/:id',
        component: ServiceCategoryLmpDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'localmarketplaceApp.serviceCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const serviceCategoryPopupRoute: Routes = [
    {
        path: 'service-category-lmp-new',
        component: ServiceCategoryLmpPopupComponent,
        data: {
            authorities: ['ROLE_USER','ROLE_ADMIN'],
            pageTitle: 'localmarketplaceApp.serviceCategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'service-category-lmp/:id/edit',
        component: ServiceCategoryLmpPopupComponent,
        data: {
            authorities: ['ROLE_USER','ROLE_ADMIN'],
            pageTitle: 'localmarketplaceApp.serviceCategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'service-category-lmp/:id/delete',
        component: ServiceCategoryLmpDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER','ROLE_ADMIN'],
            pageTitle: 'localmarketplaceApp.serviceCategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
