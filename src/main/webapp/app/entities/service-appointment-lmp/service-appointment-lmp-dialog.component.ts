import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ServiceAppointmentLmp } from './service-appointment-lmp.model';
import { ServiceAppointmentLmpPopupService } from './service-appointment-lmp-popup.service';
import { ServiceAppointmentLmpService } from './service-appointment-lmp.service';
import { ServiceDeliveryOfferLmp, ServiceDeliveryOfferLmpService } from '../service-delivery-offer-lmp';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-service-appointment-lmp-dialog',
    templateUrl: './service-appointment-lmp-dialog.component.html'
})
export class ServiceAppointmentLmpDialogComponent implements OnInit {

    serviceAppointment: ServiceAppointmentLmp;
    isSaving: boolean;

    servicedeliveryoffers: ServiceDeliveryOfferLmp[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private serviceAppointmentService: ServiceAppointmentLmpService,
        private serviceDeliveryOfferService: ServiceDeliveryOfferLmpService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.serviceDeliveryOfferService.query()
            .subscribe((res: ResponseWrapper) => { this.servicedeliveryoffers = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.serviceAppointment.id !== undefined) {
            this.subscribeToSaveResponse(
                this.serviceAppointmentService.update(this.serviceAppointment));
        } else {
            this.subscribeToSaveResponse(
                this.serviceAppointmentService.create(this.serviceAppointment));
        }
    }

    private subscribeToSaveResponse(result: Observable<ServiceAppointmentLmp>) {
        result.subscribe((res: ServiceAppointmentLmp) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ServiceAppointmentLmp) {
        this.eventManager.broadcast({ name: 'serviceAppointmentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackServiceDeliveryOfferById(index: number, item: ServiceDeliveryOfferLmp) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-service-appointment-lmp-popup',
    template: ''
})
export class ServiceAppointmentLmpPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private serviceAppointmentPopupService: ServiceAppointmentLmpPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.serviceAppointmentPopupService
                    .open(ServiceAppointmentLmpDialogComponent as Component, params['id']);
            } else {
                this.serviceAppointmentPopupService
                    .open(ServiceAppointmentLmpDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
