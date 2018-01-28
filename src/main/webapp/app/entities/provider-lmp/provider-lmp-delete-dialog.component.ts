import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProviderLmp } from './provider-lmp.model';
import { ProviderLmpPopupService } from './provider-lmp-popup.service';
import { ProviderLmpService } from './provider-lmp.service';

@Component({
    selector: 'jhi-provider-lmp-delete-dialog',
    templateUrl: './provider-lmp-delete-dialog.component.html'
})
export class ProviderLmpDeleteDialogComponent {

    provider: ProviderLmp;

    constructor(
        private providerService: ProviderLmpService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.providerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'providerListModification',
                content: 'Deleted an provider'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-provider-lmp-delete-popup',
    template: ''
})
export class ProviderLmpDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private providerPopupService: ProviderLmpPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.providerPopupService
                .open(ProviderLmpDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
