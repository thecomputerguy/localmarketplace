import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ServiceAppointmentLmp } from './service-appointment-lmp.model';
import { ServiceAppointmentLmpService } from './service-appointment-lmp.service';

@Component({
    selector: 'jhi-service-appointment-lmp-detail',
    templateUrl: './service-appointment-lmp-detail.component.html'
})
export class ServiceAppointmentLmpDetailComponent implements OnInit, OnDestroy {

    serviceAppointment: ServiceAppointmentLmp;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private serviceAppointmentService: ServiceAppointmentLmpService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInServiceAppointments();
    }

    load(id) {
        this.serviceAppointmentService.find(id).subscribe((serviceAppointment) => {
            this.serviceAppointment = serviceAppointment;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInServiceAppointments() {
        this.eventSubscriber = this.eventManager.subscribe(
            'serviceAppointmentListModification',
            (response) => this.load(this.serviceAppointment.id)
        );
    }
}
