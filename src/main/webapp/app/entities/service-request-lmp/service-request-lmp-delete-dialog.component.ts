import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ServiceRequestLmp } from './service-request-lmp.model';
import { ServiceRequestLmpPopupService } from './service-request-lmp-popup.service';
import { ServiceRequestLmpService } from './service-request-lmp.service';

@Component({
    selector: 'jhi-service-request-lmp-delete-dialog',
    templateUrl: './service-request-lmp-delete-dialog.component.html'
})
export class ServiceRequestLmpDeleteDialogComponent {

    serviceRequest: ServiceRequestLmp;

    constructor(
        private serviceRequestService: ServiceRequestLmpService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.serviceRequestService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'serviceRequestListModification',
                content: 'Deleted an serviceRequest'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-service-request-lmp-delete-popup',
    template: ''
})
export class ServiceRequestLmpDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private serviceRequestPopupService: ServiceRequestLmpPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.serviceRequestPopupService
                .open(ServiceRequestLmpDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
