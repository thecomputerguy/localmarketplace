import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ProviderReviewLogLmp } from './provider-review-log-lmp.model';
import { ProviderReviewLogLmpService } from './provider-review-log-lmp.service';

@Injectable()
export class ProviderReviewLogLmpPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private providerReviewLogService: ProviderReviewLogLmpService

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
                this.providerReviewLogService.find(id).subscribe((providerReviewLog) => {
                    providerReviewLog.reviewDate = this.datePipe
                        .transform(providerReviewLog.reviewDate, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.providerReviewLogModalRef(component, providerReviewLog);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.providerReviewLogModalRef(component, new ProviderReviewLogLmp());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    providerReviewLogModalRef(component: Component, providerReviewLog: ProviderReviewLogLmp): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.providerReviewLog = providerReviewLog;
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
