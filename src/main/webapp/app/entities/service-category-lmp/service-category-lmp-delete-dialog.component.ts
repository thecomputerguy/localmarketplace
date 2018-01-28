import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ServiceCategoryLmp } from './service-category-lmp.model';
import { ServiceCategoryLmpPopupService } from './service-category-lmp-popup.service';
import { ServiceCategoryLmpService } from './service-category-lmp.service';

@Component({
    selector: 'jhi-service-category-lmp-delete-dialog',
    templateUrl: './service-category-lmp-delete-dialog.component.html'
})
export class ServiceCategoryLmpDeleteDialogComponent {

    serviceCategory: ServiceCategoryLmp;

    constructor(
        private serviceCategoryService: ServiceCategoryLmpService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.serviceCategoryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'serviceCategoryListModification',
                content: 'Deleted an serviceCategory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-service-category-lmp-delete-popup',
    template: ''
})
export class ServiceCategoryLmpDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private serviceCategoryPopupService: ServiceCategoryLmpPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.serviceCategoryPopupService
                .open(ServiceCategoryLmpDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
