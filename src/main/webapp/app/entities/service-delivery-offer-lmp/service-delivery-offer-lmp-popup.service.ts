import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ServiceDeliveryOfferLmp } from './service-delivery-offer-lmp.model';
import { ServiceDeliveryOfferLmpService } from './service-delivery-offer-lmp.service';

@Injectable()
export class ServiceDeliveryOfferLmpPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private serviceDeliveryOfferService: ServiceDeliveryOfferLmpService

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
                this.serviceDeliveryOfferService.find(id).subscribe((serviceDeliveryOffer) => {
                    serviceDeliveryOffer.offerSubmitDate = this.datePipe
                        .transform(serviceDeliveryOffer.offerSubmitDate, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.serviceDeliveryOfferModalRef(component, serviceDeliveryOffer);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.serviceDeliveryOfferModalRef(component, new ServiceDeliveryOfferLmp());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    serviceDeliveryOfferModalRef(component: Component, serviceDeliveryOffer: ServiceDeliveryOfferLmp): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.serviceDeliveryOffer = serviceDeliveryOffer;
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
