import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ServiceDeliveryOfferLmp } from './service-delivery-offer-lmp.model';
import { ServiceDeliveryOfferLmpService } from './service-delivery-offer-lmp.service';

@Component({
    selector: 'jhi-service-delivery-offer-lmp-detail',
    templateUrl: './service-delivery-offer-lmp-detail.component.html'
})
export class ServiceDeliveryOfferLmpDetailComponent implements OnInit, OnDestroy {

    serviceDeliveryOffer: ServiceDeliveryOfferLmp;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private serviceDeliveryOfferService: ServiceDeliveryOfferLmpService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInServiceDeliveryOffers();
    }

    load(id) {
        this.serviceDeliveryOfferService.find(id).subscribe((serviceDeliveryOffer) => {
            this.serviceDeliveryOffer = serviceDeliveryOffer;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInServiceDeliveryOffers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'serviceDeliveryOfferListModification',
            (response) => this.load(this.serviceDeliveryOffer.id)
        );
    }
}
