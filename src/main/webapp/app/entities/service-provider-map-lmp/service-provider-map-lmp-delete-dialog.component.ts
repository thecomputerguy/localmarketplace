import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ServiceProviderMapLmp } from './service-provider-map-lmp.model';
import { ServiceProviderMapLmpPopupService } from './service-provider-map-lmp-popup.service';
import { ServiceProviderMapLmpService } from './service-provider-map-lmp.service';

@Component({
    selector: 'jhi-service-provider-map-lmp-delete-dialog',
    templateUrl: './service-provider-map-lmp-delete-dialog.component.html'
})
export class ServiceProviderMapLmpDeleteDialogComponent {

    serviceProviderMap: ServiceProviderMapLmp;

    constructor(
        private serviceProviderMapService: ServiceProviderMapLmpService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.serviceProviderMapService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'serviceProviderMapListModification',
                content: 'Deleted an serviceProviderMap'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-service-provider-map-lmp-delete-popup',
    template: ''
})
export class ServiceProviderMapLmpDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private serviceProviderMapPopupService: ServiceProviderMapLmpPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.serviceProviderMapPopupService
                .open(ServiceProviderMapLmpDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
