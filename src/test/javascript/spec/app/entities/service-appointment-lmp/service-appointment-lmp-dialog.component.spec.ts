/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { LocalmarketplaceTestModule } from '../../../test.module';
import { ServiceAppointmentLmpDialogComponent } from '../../../../../../main/webapp/app/entities/service-appointment-lmp/service-appointment-lmp-dialog.component';
import { ServiceAppointmentLmpService } from '../../../../../../main/webapp/app/entities/service-appointment-lmp/service-appointment-lmp.service';
import { ServiceAppointmentLmp } from '../../../../../../main/webapp/app/entities/service-appointment-lmp/service-appointment-lmp.model';
import { ServiceDeliveryOfferLmpService } from '../../../../../../main/webapp/app/entities/service-delivery-offer-lmp';

describe('Component Tests', () => {

    describe('ServiceAppointmentLmp Management Dialog Component', () => {
        let comp: ServiceAppointmentLmpDialogComponent;
        let fixture: ComponentFixture<ServiceAppointmentLmpDialogComponent>;
        let service: ServiceAppointmentLmpService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LocalmarketplaceTestModule],
                declarations: [ServiceAppointmentLmpDialogComponent],
                providers: [
                    ServiceDeliveryOfferLmpService,
                    ServiceAppointmentLmpService
                ]
            })
            .overrideTemplate(ServiceAppointmentLmpDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ServiceAppointmentLmpDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServiceAppointmentLmpService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ServiceAppointmentLmp(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.serviceAppointment = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'serviceAppointmentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ServiceAppointmentLmp();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.serviceAppointment = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'serviceAppointmentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
