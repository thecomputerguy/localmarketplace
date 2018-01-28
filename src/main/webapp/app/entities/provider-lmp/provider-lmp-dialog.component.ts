import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProviderLmp } from './provider-lmp.model';
import { ProviderLmpPopupService } from './provider-lmp-popup.service';
import { ProviderLmpService } from './provider-lmp.service';

@Component({
    selector: 'jhi-provider-lmp-dialog',
    templateUrl: './provider-lmp-dialog.component.html'
})
export class ProviderLmpDialogComponent implements OnInit {

    provider: ProviderLmp;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private providerService: ProviderLmpService,
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
        if (this.provider.id !== undefined) {
            this.subscribeToSaveResponse(
                this.providerService.update(this.provider));
        } else {
            this.subscribeToSaveResponse(
                this.providerService.create(this.provider));
        }
    }

    private subscribeToSaveResponse(result: Observable<ProviderLmp>) {
        result.subscribe((res: ProviderLmp) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ProviderLmp) {
        this.eventManager.broadcast({ name: 'providerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-provider-lmp-popup',
    template: ''
})
export class ProviderLmpPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private providerPopupService: ProviderLmpPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.providerPopupService
                    .open(ProviderLmpDialogComponent as Component, params['id']);
            } else {
                this.providerPopupService
                    .open(ProviderLmpDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
