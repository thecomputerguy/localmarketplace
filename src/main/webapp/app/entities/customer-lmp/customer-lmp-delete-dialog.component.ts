import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CustomerLmp } from './customer-lmp.model';
import { CustomerLmpPopupService } from './customer-lmp-popup.service';
import { CustomerLmpService } from './customer-lmp.service';

@Component({
    selector: 'jhi-customer-lmp-delete-dialog',
    templateUrl: './customer-lmp-delete-dialog.component.html'
})
export class CustomerLmpDeleteDialogComponent {

    customer: CustomerLmp;

    constructor(
        private customerService: CustomerLmpService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.customerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'customerListModification',
                content: 'Deleted an customer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-customer-lmp-delete-popup',
    template: ''
})
export class CustomerLmpDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customerPopupService: CustomerLmpPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.customerPopupService
                .open(CustomerLmpDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
