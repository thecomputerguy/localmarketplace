import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ServiceRequestLmp } from './service-request-lmp.model';
import { ServiceRequestLmpPopupService } from './service-request-lmp-popup.service';
import { ServiceRequestLmpService } from './service-request-lmp.service';
import { CustomerLmp, CustomerLmpService } from '../customer-lmp';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-service-request-lmp-dialog',
    templateUrl: './service-request-lmp-dialog.component.html'
})
export class ServiceRequestLmpDialogComponent implements OnInit {

    serviceRequest: ServiceRequestLmp;
    isSaving: boolean;

    customers: CustomerLmp[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private serviceRequestService: ServiceRequestLmpService,
        private customerService: CustomerLmpService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.customerService.query()
            .subscribe((res: ResponseWrapper) => { this.customers = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.serviceRequest.id !== undefined) {
            this.subscribeToSaveResponse(
                this.serviceRequestService.update(this.serviceRequest));
        } else {
            this.subscribeToSaveResponse(
                this.serviceRequestService.create(this.serviceRequest));
        }
    }

    private subscribeToSaveResponse(result: Observable<ServiceRequestLmp>) {
        result.subscribe((res: ServiceRequestLmp) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ServiceRequestLmp) {
        this.eventManager.broadcast({ name: 'serviceRequestListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCustomerById(index: number, item: CustomerLmp) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-service-request-lmp-popup',
    template: ''
})
export class ServiceRequestLmpPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private serviceRequestPopupService: ServiceRequestLmpPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.serviceRequestPopupService
                    .open(ServiceRequestLmpDialogComponent as Component, params['id']);
            } else {
                this.serviceRequestPopupService
                    .open(ServiceRequestLmpDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
