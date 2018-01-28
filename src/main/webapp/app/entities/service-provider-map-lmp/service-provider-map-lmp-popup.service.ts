import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ServiceProviderMapLmp } from './service-provider-map-lmp.model';
import { ServiceProviderMapLmpService } from './service-provider-map-lmp.service';

@Injectable()
export class ServiceProviderMapLmpPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private serviceProviderMapService: ServiceProviderMapLmpService

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
                this.serviceProviderMapService.find(id).subscribe((serviceProviderMap) => {
                    this.ngbModalRef = this.serviceProviderMapModalRef(component, serviceProviderMap);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.serviceProviderMapModalRef(component, new ServiceProviderMapLmp());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    serviceProviderMapModalRef(component: Component, serviceProviderMap: ServiceProviderMapLmp): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.serviceProviderMap = serviceProviderMap;
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
