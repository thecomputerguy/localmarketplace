import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ServiceLmp } from './service-lmp.model';
import { ServiceLmpPopupService } from './service-lmp-popup.service';
import { ServiceLmpService } from './service-lmp.service';
import { ServiceCategoryLmp, ServiceCategoryLmpService } from '../service-category-lmp';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-service-lmp-dialog',
    templateUrl: './service-lmp-dialog.component.html'
})
export class ServiceLmpDialogComponent implements OnInit {

    service: ServiceLmp;
    isSaving: boolean;

    servicecategories: ServiceCategoryLmp[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private serviceService: ServiceLmpService,
        private serviceCategoryService: ServiceCategoryLmpService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.serviceCategoryService.query()
            .subscribe((res: ResponseWrapper) => { this.servicecategories = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.service.id !== undefined) {
            this.subscribeToSaveResponse(
                this.serviceService.update(this.service));
        } else {
            this.subscribeToSaveResponse(
                this.serviceService.create(this.service));
        }
    }

    private subscribeToSaveResponse(result: Observable<ServiceLmp>) {
        result.subscribe((res: ServiceLmp) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ServiceLmp) {
        this.eventManager.broadcast({ name: 'serviceListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackServiceCategoryById(index: number, item: ServiceCategoryLmp) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-service-lmp-popup',
    template: ''
})
export class ServiceLmpPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private servicePopupService: ServiceLmpPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.servicePopupService
                    .open(ServiceLmpDialogComponent as Component, params['id']);
            } else {
                this.servicePopupService
                    .open(ServiceLmpDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
