/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { LocalmarketplaceTestModule } from '../../../test.module';
import { ServiceCategoryLmpDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/service-category-lmp/service-category-lmp-delete-dialog.component';
import { ServiceCategoryLmpService } from '../../../../../../main/webapp/app/entities/service-category-lmp/service-category-lmp.service';

describe('Component Tests', () => {

    describe('ServiceCategoryLmp Management Delete Component', () => {
        let comp: ServiceCategoryLmpDeleteDialogComponent;
        let fixture: ComponentFixture<ServiceCategoryLmpDeleteDialogComponent>;
        let service: ServiceCategoryLmpService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LocalmarketplaceTestModule],
                declarations: [ServiceCategoryLmpDeleteDialogComponent],
                providers: [
                    ServiceCategoryLmpService
                ]
            })
            .overrideTemplate(ServiceCategoryLmpDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ServiceCategoryLmpDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServiceCategoryLmpService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
