import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProviderRatingLmp } from './provider-rating-lmp.model';
import { ProviderRatingLmpPopupService } from './provider-rating-lmp-popup.service';
import { ProviderRatingLmpService } from './provider-rating-lmp.service';

@Component({
    selector: 'jhi-provider-rating-lmp-delete-dialog',
    templateUrl: './provider-rating-lmp-delete-dialog.component.html'
})
export class ProviderRatingLmpDeleteDialogComponent {

    providerRating: ProviderRatingLmp;

    constructor(
        private providerRatingService: ProviderRatingLmpService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.providerRatingService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'providerRatingListModification',
                content: 'Deleted an providerRating'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-provider-rating-lmp-delete-popup',
    template: ''
})
export class ProviderRatingLmpDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private providerRatingPopupService: ProviderRatingLmpPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.providerRatingPopupService
                .open(ProviderRatingLmpDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
