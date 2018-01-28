import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ServiceRequestLmp } from './service-request-lmp.model';
import { ServiceRequestLmpService } from './service-request-lmp.service';

@Component({
    selector: 'jhi-service-request-lmp-detail',
    templateUrl: './service-request-lmp-detail.component.html'
})
export class ServiceRequestLmpDetailComponent implements OnInit, OnDestroy {

    serviceRequest: ServiceRequestLmp;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private serviceRequestService: ServiceRequestLmpService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInServiceRequests();
    }

    load(id) {
        this.serviceRequestService.find(id).subscribe((serviceRequest) => {
            this.serviceRequest = serviceRequest;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInServiceRequests() {
        this.eventSubscriber = this.eventManager.subscribe(
            'serviceRequestListModification',
            (response) => this.load(this.serviceRequest.id)
        );
    }
}
