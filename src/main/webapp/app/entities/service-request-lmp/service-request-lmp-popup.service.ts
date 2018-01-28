import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ServiceRequestLmp } from './service-request-lmp.model';
import { ServiceRequestLmpService } from './service-request-lmp.service';

@Injectable()
export class ServiceRequestLmpPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private serviceRequestService: ServiceRequestLmpService

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
                this.serviceRequestService.find(id).subscribe((serviceRequest) => {
                    serviceRequest.serviceRequiredOn = this.datePipe
                        .transform(serviceRequest.serviceRequiredOn, 'yyyy-MM-ddTHH:mm:ss');
                    serviceRequest.expectedStartTime = this.datePipe
                        .transform(serviceRequest.expectedStartTime, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.serviceRequestModalRef(component, serviceRequest);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.serviceRequestModalRef(component, new ServiceRequestLmp());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    serviceRequestModalRef(component: Component, serviceRequest: ServiceRequestLmp): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.serviceRequest = serviceRequest;
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
