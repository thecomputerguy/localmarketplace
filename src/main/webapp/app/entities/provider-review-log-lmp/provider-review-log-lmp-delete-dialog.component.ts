import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProviderReviewLogLmp } from './provider-review-log-lmp.model';
import { ProviderReviewLogLmpPopupService } from './provider-review-log-lmp-popup.service';
import { ProviderReviewLogLmpService } from './provider-review-log-lmp.service';

@Component({
    selector: 'jhi-provider-review-log-lmp-delete-dialog',
    templateUrl: './provider-review-log-lmp-delete-dialog.component.html'
})
export class ProviderReviewLogLmpDeleteDialogComponent {

    providerReviewLog: ProviderReviewLogLmp;

    constructor(
        private providerReviewLogService: ProviderReviewLogLmpService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.providerReviewLogService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'providerReviewLogListModification',
                content: 'Deleted an providerReviewLog'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-provider-review-log-lmp-delete-popup',
    template: ''
})
export class ProviderReviewLogLmpDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private providerReviewLogPopupService: ProviderReviewLogLmpPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.providerReviewLogPopupService
                .open(ProviderReviewLogLmpDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
