import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ServiceDeliveryOfferLmp } from './service-delivery-offer-lmp.model';
import { ServiceDeliveryOfferLmpPopupService } from './service-delivery-offer-lmp-popup.service';
import { ServiceDeliveryOfferLmpService } from './service-delivery-offer-lmp.service';

@Component({
    selector: 'jhi-service-delivery-offer-lmp-delete-dialog',
    templateUrl: './service-delivery-offer-lmp-delete-dialog.component.html'
})
export class ServiceDeliveryOfferLmpDeleteDialogComponent {

    serviceDeliveryOffer: ServiceDeliveryOfferLmp;

    constructor(
        private serviceDeliveryOfferService: ServiceDeliveryOfferLmpService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.serviceDeliveryOfferService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'serviceDeliveryOfferListModification',
                content: 'Deleted an serviceDeliveryOffer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-service-delivery-offer-lmp-delete-popup',
    template: ''
})
export class ServiceDeliveryOfferLmpDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private serviceDeliveryOfferPopupService: ServiceDeliveryOfferLmpPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.serviceDeliveryOfferPopupService
                .open(ServiceDeliveryOfferLmpDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
