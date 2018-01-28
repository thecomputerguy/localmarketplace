import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProviderReviewLogLmp } from './provider-review-log-lmp.model';
import { ProviderReviewLogLmpPopupService } from './provider-review-log-lmp-popup.service';
import { ProviderReviewLogLmpService } from './provider-review-log-lmp.service';
import { ServiceAppointmentLmp, ServiceAppointmentLmpService } from '../service-appointment-lmp';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-provider-review-log-lmp-dialog',
    templateUrl: './provider-review-log-lmp-dialog.component.html'
})
export class ProviderReviewLogLmpDialogComponent implements OnInit {

    providerReviewLog: ProviderReviewLogLmp;
    isSaving: boolean;

    serviceappointments: ServiceAppointmentLmp[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private providerReviewLogService: ProviderReviewLogLmpService,
        private serviceAppointmentService: ServiceAppointmentLmpService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.serviceAppointmentService.query()
            .subscribe((res: ResponseWrapper) => { this.serviceappointments = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.providerReviewLog.id !== undefined) {
            this.subscribeToSaveResponse(
                this.providerReviewLogService.update(this.providerReviewLog));
        } else {
            this.subscribeToSaveResponse(
                this.providerReviewLogService.create(this.providerReviewLog));
        }
    }

    private subscribeToSaveResponse(result: Observable<ProviderReviewLogLmp>) {
        result.subscribe((res: ProviderReviewLogLmp) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ProviderReviewLogLmp) {
        this.eventManager.broadcast({ name: 'providerReviewLogListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackServiceAppointmentById(index: number, item: ServiceAppointmentLmp) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-provider-review-log-lmp-popup',
    template: ''
})
export class ProviderReviewLogLmpPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private providerReviewLogPopupService: ProviderReviewLogLmpPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.providerReviewLogPopupService
                    .open(ProviderReviewLogLmpDialogComponent as Component, params['id']);
            } else {
                this.providerReviewLogPopupService
                    .open(ProviderReviewLogLmpDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
