import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ngx-webstorage';

import { LocalmarketplaceSharedModule, UserRouteAccessService } from './shared';
import { LocalmarketplaceAppRoutingModule} from './app-routing.module';
import { LocalmarketplaceHomeModule } from './home/home.module';
import { LocalmarketplaceAdminModule } from './admin/admin.module';
import { LocalmarketplaceAccountModule } from './account/account.module';
import { LocalmarketplaceEntityModule } from './entities/entity.module';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        LocalmarketplaceAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        LocalmarketplaceSharedModule,
        LocalmarketplaceHomeModule,
        LocalmarketplaceAdminModule,
        LocalmarketplaceAccountModule,
        LocalmarketplaceEntityModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class LocalmarketplaceAppModule {}
