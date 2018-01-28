import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ServiceCategoryLmp } from './service-category-lmp.model';
import { ServiceCategoryLmpPopupService } from './service-category-lmp-popup.service';
import { ServiceCategoryLmpService } from './service-category-lmp.service';

@Component({
    selector: 'jhi-service-category-lmp-dialog',
    templateUrl: './service-category-lmp-dialog.component.html'
})
export class ServiceCategoryLmpDialogComponent implements OnInit {

    serviceCategory: ServiceCategoryLmp;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private serviceCategoryService: ServiceCategoryLmpService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.serviceCategory.id !== undefined) {
            this.subscribeToSaveResponse(
                this.serviceCategoryService.update(this.serviceCategory));
        } else {
            this.subscribeToSaveResponse(
                this.serviceCategoryService.create(this.serviceCategory));
        }
    }

    private subscribeToSaveResponse(result: Observable<ServiceCategoryLmp>) {
        result.subscribe((res: ServiceCategoryLmp) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ServiceCategoryLmp) {
        this.eventManager.broadcast({ name: 'serviceCategoryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-service-category-lmp-popup',
    template: ''
})
export class ServiceCategoryLmpPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private serviceCategoryPopupService: ServiceCategoryLmpPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.serviceCategoryPopupService
                    .open(ServiceCategoryLmpDialogComponent as Component, params['id']);
            } else {
                this.serviceCategoryPopupService
                    .open(ServiceCategoryLmpDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
