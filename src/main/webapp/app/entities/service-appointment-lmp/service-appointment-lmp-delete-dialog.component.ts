import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ServiceAppointmentLmp } from './service-appointment-lmp.model';
import { ServiceAppointmentLmpPopupService } from './service-appointment-lmp-popup.service';
import { ServiceAppointmentLmpService } from './service-appointment-lmp.service';

@Component({
    selector: 'jhi-service-appointment-lmp-delete-dialog',
    templateUrl: './service-appointment-lmp-delete-dialog.component.html'
})
export class ServiceAppointmentLmpDeleteDialogComponent {

    serviceAppointment: ServiceAppointmentLmp;

    constructor(
        private serviceAppointmentService: ServiceAppointmentLmpService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.serviceAppointmentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'serviceAppointmentListModification',
                content: 'Deleted an serviceAppointment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-service-appointment-lmp-delete-popup',
    template: ''
})
export class ServiceAppointmentLmpDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private serviceAppointmentPopupService: ServiceAppointmentLmpPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.serviceAppointmentPopupService
                .open(ServiceAppointmentLmpDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
