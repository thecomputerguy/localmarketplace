/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { LocalmarketplaceTestModule } from '../../../test.module';
import { ServiceDeliveryOfferLmpDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/service-delivery-offer-lmp/service-delivery-offer-lmp-delete-dialog.component';
import { ServiceDeliveryOfferLmpService } from '../../../../../../main/webapp/app/entities/service-delivery-offer-lmp/service-delivery-offer-lmp.service';

describe('Component Tests', () => {

    describe('ServiceDeliveryOfferLmp Management Delete Component', () => {
        let comp: ServiceDeliveryOfferLmpDeleteDialogComponent;
        let fixture: ComponentFixture<ServiceDeliveryOfferLmpDeleteDialogComponent>;
        let service: ServiceDeliveryOfferLmpService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LocalmarketplaceTestModule],
                declarations: [ServiceDeliveryOfferLmpDeleteDialogComponent],
                providers: [
                    ServiceDeliveryOfferLmpService
                ]
            })
            .overrideTemplate(ServiceDeliveryOfferLmpDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ServiceDeliveryOfferLmpDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServiceDeliveryOfferLmpService);
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
