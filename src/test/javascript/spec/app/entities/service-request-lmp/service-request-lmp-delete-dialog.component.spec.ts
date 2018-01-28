/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { LocalmarketplaceTestModule } from '../../../test.module';
import { ServiceRequestLmpDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/service-request-lmp/service-request-lmp-delete-dialog.component';
import { ServiceRequestLmpService } from '../../../../../../main/webapp/app/entities/service-request-lmp/service-request-lmp.service';

describe('Component Tests', () => {

    describe('ServiceRequestLmp Management Delete Component', () => {
        let comp: ServiceRequestLmpDeleteDialogComponent;
        let fixture: ComponentFixture<ServiceRequestLmpDeleteDialogComponent>;
        let service: ServiceRequestLmpService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LocalmarketplaceTestModule],
                declarations: [ServiceRequestLmpDeleteDialogComponent],
                providers: [
                    ServiceRequestLmpService
                ]
            })
            .overrideTemplate(ServiceRequestLmpDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ServiceRequestLmpDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServiceRequestLmpService);
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
