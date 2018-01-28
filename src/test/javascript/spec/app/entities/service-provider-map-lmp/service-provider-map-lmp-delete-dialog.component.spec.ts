/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { LocalmarketplaceTestModule } from '../../../test.module';
import { ServiceProviderMapLmpDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/service-provider-map-lmp/service-provider-map-lmp-delete-dialog.component';
import { ServiceProviderMapLmpService } from '../../../../../../main/webapp/app/entities/service-provider-map-lmp/service-provider-map-lmp.service';

describe('Component Tests', () => {

    describe('ServiceProviderMapLmp Management Delete Component', () => {
        let comp: ServiceProviderMapLmpDeleteDialogComponent;
        let fixture: ComponentFixture<ServiceProviderMapLmpDeleteDialogComponent>;
        let service: ServiceProviderMapLmpService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LocalmarketplaceTestModule],
                declarations: [ServiceProviderMapLmpDeleteDialogComponent],
                providers: [
                    ServiceProviderMapLmpService
                ]
            })
            .overrideTemplate(ServiceProviderMapLmpDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ServiceProviderMapLmpDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServiceProviderMapLmpService);
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
