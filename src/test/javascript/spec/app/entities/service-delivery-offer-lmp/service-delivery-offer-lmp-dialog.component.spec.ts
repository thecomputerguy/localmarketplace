/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { LocalmarketplaceTestModule } from '../../../test.module';
import { ServiceDeliveryOfferLmpDialogComponent } from '../../../../../../main/webapp/app/entities/service-delivery-offer-lmp/service-delivery-offer-lmp-dialog.component';
import { ServiceDeliveryOfferLmpService } from '../../../../../../main/webapp/app/entities/service-delivery-offer-lmp/service-delivery-offer-lmp.service';
import { ServiceDeliveryOfferLmp } from '../../../../../../main/webapp/app/entities/service-delivery-offer-lmp/service-delivery-offer-lmp.model';
import { ServiceProviderMapLmpService } from '../../../../../../main/webapp/app/entities/service-provider-map-lmp';
import { ServiceRequestLmpService } from '../../../../../../main/webapp/app/entities/service-request-lmp';

describe('Component Tests', () => {

    describe('ServiceDeliveryOfferLmp Management Dialog Component', () => {
        let comp: ServiceDeliveryOfferLmpDialogComponent;
        let fixture: ComponentFixture<ServiceDeliveryOfferLmpDialogComponent>;
        let service: ServiceDeliveryOfferLmpService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LocalmarketplaceTestModule],
                declarations: [ServiceDeliveryOfferLmpDialogComponent],
                providers: [
                    ServiceProviderMapLmpService,
                    ServiceRequestLmpService,
                    ServiceDeliveryOfferLmpService
                ]
            })
            .overrideTemplate(ServiceDeliveryOfferLmpDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ServiceDeliveryOfferLmpDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServiceDeliveryOfferLmpService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ServiceDeliveryOfferLmp(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.serviceDeliveryOffer = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'serviceDeliveryOfferListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ServiceDeliveryOfferLmp();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.serviceDeliveryOffer = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'serviceDeliveryOfferListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
