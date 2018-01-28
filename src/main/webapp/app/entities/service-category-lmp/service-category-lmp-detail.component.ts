import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ServiceCategoryLmp } from './service-category-lmp.model';
import { ServiceCategoryLmpService } from './service-category-lmp.service';

@Component({
    selector: 'jhi-service-category-lmp-detail',
    templateUrl: './service-category-lmp-detail.component.html'
})
export class ServiceCategoryLmpDetailComponent implements OnInit, OnDestroy {

    serviceCategory: ServiceCategoryLmp;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private serviceCategoryService: ServiceCategoryLmpService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInServiceCategories();
    }

    load(id) {
        this.serviceCategoryService.find(id).subscribe((serviceCategory) => {
            this.serviceCategory = serviceCategory;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInServiceCategories() {
        this.eventSubscriber = this.eventManager.subscribe(
            'serviceCategoryListModification',
            (response) => this.load(this.serviceCategory.id)
        );
    }
}
