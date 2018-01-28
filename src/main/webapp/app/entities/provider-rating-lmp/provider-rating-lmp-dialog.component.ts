import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProviderRatingLmp } from './provider-rating-lmp.model';
import { ProviderRatingLmpPopupService } from './provider-rating-lmp-popup.service';
import { ProviderRatingLmpService } from './provider-rating-lmp.service';
import { ProviderLmp, ProviderLmpService } from '../provider-lmp';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-provider-rating-lmp-dialog',
    templateUrl: './provider-rating-lmp-dialog.component.html'
})
export class ProviderRatingLmpDialogComponent implements OnInit {

    providerRating: ProviderRatingLmp;
    isSaving: boolean;

    providers: ProviderLmp[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private providerRatingService: ProviderRatingLmpService,
        private providerService: ProviderLmpService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.providerService.query()
            .subscribe((res: ResponseWrapper) => { this.providers = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.providerRating.id !== undefined) {
            this.subscribeToSaveResponse(
                this.providerRatingService.update(this.providerRating));
        } else {
            this.subscribeToSaveResponse(
                this.providerRatingService.create(this.providerRating));
        }
    }

    private subscribeToSaveResponse(result: Observable<ProviderRatingLmp>) {
        result.subscribe((res: ProviderRatingLmp) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ProviderRatingLmp) {
        this.eventManager.broadcast({ name: 'providerRatingListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-provider-rating-lmp-popup',
    template: ''
})
export class ProviderRatingLmpPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private providerRatingPopupService: ProviderRatingLmpPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.providerRatingPopupService
                    .open(ProviderRatingLmpDialogComponent as Component, params['id']);
            } else {
                this.providerRatingPopupService
                    .open(ProviderRatingLmpDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
