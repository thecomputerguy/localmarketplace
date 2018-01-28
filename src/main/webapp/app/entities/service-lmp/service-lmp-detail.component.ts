import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ServiceLmp } from './service-lmp.model';
import { ServiceLmpService } from './service-lmp.service';

@Component({
    selector: 'jhi-service-lmp-detail',
    templateUrl: './service-lmp-detail.component.html'
})
export class ServiceLmpDetailComponent implements OnInit, OnDestroy {

    service: ServiceLmp;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private serviceService: ServiceLmpService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInServices();
    }

    load(id) {
        this.serviceService.find(id).subscribe((service) => {
            this.service = service;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInServices() {
        this.eventSubscriber = this.eventManager.subscribe(
            'serviceListModification',
            (response) => this.load(this.service.id)
        );
    }
}
