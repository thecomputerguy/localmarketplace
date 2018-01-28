import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ServiceAppointmentLmp } from './service-appointment-lmp.model';
import { ServiceAppointmentLmpService } from './service-appointment-lmp.service';

@Injectable()
export class ServiceAppointmentLmpPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private serviceAppointmentService: ServiceAppointmentLmpService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.serviceAppointmentService.find(id).subscribe((serviceAppointment) => {
                    serviceAppointment.serviceDeliverOn = this.datePipe
                        .transform(serviceAppointment.serviceDeliverOn, 'yyyy-MM-ddTHH:mm:ss');
                    serviceAppointment.serviceStartTime = this.datePipe
                        .transform(serviceAppointment.serviceStartTime, 'yyyy-MM-ddTHH:mm:ss');
                    serviceAppointment.serviceEndTime = this.datePipe
                        .transform(serviceAppointment.serviceEndTime, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.serviceAppointmentModalRef(component, serviceAppointment);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.serviceAppointmentModalRef(component, new ServiceAppointmentLmp());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    serviceAppointmentModalRef(component: Component, serviceAppointment: ServiceAppointmentLmp): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.serviceAppointment = serviceAppointment;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
