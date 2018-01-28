import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ServiceLmp } from './service-lmp.model';
import { ServiceLmpPopupService } from './service-lmp-popup.service';
import { ServiceLmpService } from './service-lmp.service';

@Component({
    selector: 'jhi-service-lmp-delete-dialog',
    templateUrl: './service-lmp-delete-dialog.component.html'
})
export class ServiceLmpDeleteDialogComponent {

    service: ServiceLmp;

    constructor(
        private serviceService: ServiceLmpService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.serviceService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'serviceListModification',
                content: 'Deleted an service'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-service-lmp-delete-popup',
    template: ''
})
export class ServiceLmpDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private servicePopupService: ServiceLmpPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.servicePopupService
                .open(ServiceLmpDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
