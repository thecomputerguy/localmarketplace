import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ServiceProviderMapLmp } from './service-provider-map-lmp.model';
import { ServiceProviderMapLmpPopupService } from './service-provider-map-lmp-popup.service';
import { ServiceProviderMapLmpService } from './service-provider-map-lmp.service';
import { ProviderLmp, ProviderLmpService } from '../provider-lmp';
import { ServiceLmp, ServiceLmpService } from '../service-lmp';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-service-provider-map-lmp-dialog',
    templateUrl: './service-provider-map-lmp-dialog.component.html'
})
export class ServiceProviderMapLmpDialogComponent implements OnInit {

    serviceProviderMap: ServiceProviderMapLmp;
    isSaving: boolean;

    providers: ProviderLmp[];

    services: ServiceLmp[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private serviceProviderMapService: ServiceProviderMapLmpService,
        private providerService: ProviderLmpService,
        private serviceService: ServiceLmpService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.providerService.query()
            .subscribe((res: ResponseWrapper) => { this.providers = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.serviceService.query()
            .subscribe((res: ResponseWrapper) => { this.services = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.serviceProviderMap.id !== undefined) {
            this.subscribeToSaveResponse(
                this.serviceProviderMapService.update(this.serviceProviderMap));
        } else {
            this.subscribeToSaveResponse(
                this.serviceProviderMapService.create(this.serviceProviderMap));
        }
    }

    private subscribeToSaveResponse(result: Observable<ServiceProviderMapLmp>) {
        result.subscribe((res: ServiceProviderMapLmp) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ServiceProviderMapLmp) {
        this.eventManager.broadcast({ name: 'serviceProviderMapListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProviderById(index: number, item: ProviderLmp) {
        return item.id;
    }

    trackServiceById(index: number, item: ServiceLmp) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-service-provider-map-lmp-popup',
    template: ''
})
export class ServiceProviderMapLmpPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private serviceProviderMapPopupService: ServiceProviderMapLmpPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.serviceProviderMapPopupService
                    .open(ServiceProviderMapLmpDialogComponent as Component, params['id']);
            } else {
                this.serviceProviderMapPopupService
                    .open(ServiceProviderMapLmpDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
