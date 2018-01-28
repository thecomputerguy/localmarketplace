import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ServiceProviderMapLmp } from './service-provider-map-lmp.model';
import { ServiceProviderMapLmpService } from './service-provider-map-lmp.service';

@Component({
    selector: 'jhi-service-provider-map-lmp-detail',
    templateUrl: './service-provider-map-lmp-detail.component.html'
})
export class ServiceProviderMapLmpDetailComponent implements OnInit, OnDestroy {

    serviceProviderMap: ServiceProviderMapLmp;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private serviceProviderMapService: ServiceProviderMapLmpService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInServiceProviderMaps();
    }

    load(id) {
        this.serviceProviderMapService.find(id).subscribe((serviceProviderMap) => {
            this.serviceProviderMap = serviceProviderMap;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInServiceProviderMaps() {
        this.eventSubscriber = this.eventManager.subscribe(
            'serviceProviderMapListModification',
            (response) => this.load(this.serviceProviderMap.id)
        );
    }
}
