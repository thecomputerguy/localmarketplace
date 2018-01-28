import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ServiceDeliveryOfferLmp } from './service-delivery-offer-lmp.model';
import { ServiceDeliveryOfferLmpPopupService } from './service-delivery-offer-lmp-popup.service';
import { ServiceDeliveryOfferLmpService } from './service-delivery-offer-lmp.service';
import { ServiceProviderMapLmp, ServiceProviderMapLmpService } from '../service-provider-map-lmp';
import { ServiceRequestLmp, ServiceRequestLmpService } from '../service-request-lmp';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-service-delivery-offer-lmp-dialog',
    templateUrl: './service-delivery-offer-lmp-dialog.component.html'
})
export class ServiceDeliveryOfferLmpDialogComponent implements OnInit {

    serviceDeliveryOffer: ServiceDeliveryOfferLmp;
    isSaving: boolean;

    serviceprovidermaps: ServiceProviderMapLmp[];

    servicerequests: ServiceRequestLmp[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private serviceDeliveryOfferService: ServiceDeliveryOfferLmpService,
        private serviceProviderMapService: ServiceProviderMapLmpService,
        private serviceRequestService: ServiceRequestLmpService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.serviceProviderMapService.query()
            .subscribe((res: ResponseWrapper) => { this.serviceprovidermaps = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.serviceRequestService.query()
            .subscribe((res: ResponseWrapper) => { this.servicerequests = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.serviceDeliveryOffer.id !== undefined) {
            this.subscribeToSaveResponse(
                this.serviceDeliveryOfferService.update(this.serviceDeliveryOffer));
        } else {
            this.subscribeToSaveResponse(
                this.serviceDeliveryOfferService.create(this.serviceDeliveryOffer));
        }
    }

    private subscribeToSaveResponse(result: Observable<ServiceDeliveryOfferLmp>) {
        result.subscribe((res: ServiceDeliveryOfferLmp) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ServiceDeliveryOfferLmp) {
        this.eventManager.broadcast({ name: 'serviceDeliveryOfferListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackServiceProviderMapById(index: number, item: ServiceProviderMapLmp) {
        return item.id;
    }

    trackServiceRequestById(index: number, item: ServiceRequestLmp) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-service-delivery-offer-lmp-popup',
    template: ''
})
export class ServiceDeliveryOfferLmpPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private serviceDeliveryOfferPopupService: ServiceDeliveryOfferLmpPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.serviceDeliveryOfferPopupService
                    .open(ServiceDeliveryOfferLmpDialogComponent as Component, params['id']);
            } else {
                this.serviceDeliveryOfferPopupService
                    .open(ServiceDeliveryOfferLmpDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
