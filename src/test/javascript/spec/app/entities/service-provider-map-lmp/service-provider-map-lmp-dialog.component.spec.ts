/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { LocalmarketplaceTestModule } from '../../../test.module';
import { ServiceProviderMapLmpDialogComponent } from '../../../../../../main/webapp/app/entities/service-provider-map-lmp/service-provider-map-lmp-dialog.component';
import { ServiceProviderMapLmpService } from '../../../../../../main/webapp/app/entities/service-provider-map-lmp/service-provider-map-lmp.service';
import { ServiceProviderMapLmp } from '../../../../../../main/webapp/app/entities/service-provider-map-lmp/service-provider-map-lmp.model';
import { ProviderLmpService } from '../../../../../../main/webapp/app/entities/provider-lmp';
import { ServiceLmpService } from '../../../../../../main/webapp/app/entities/service-lmp';

describe('Component Tests', () => {

    describe('ServiceProviderMapLmp Management Dialog Component', () => {
        let comp: ServiceProviderMapLmpDialogComponent;
        let fixture: ComponentFixture<ServiceProviderMapLmpDialogComponent>;
        let service: ServiceProviderMapLmpService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LocalmarketplaceTestModule],
                declarations: [ServiceProviderMapLmpDialogComponent],
                providers: [
                    ProviderLmpService,
                    ServiceLmpService,
                    ServiceProviderMapLmpService
                ]
            })
            .overrideTemplate(ServiceProviderMapLmpDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ServiceProviderMapLmpDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServiceProviderMapLmpService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ServiceProviderMapLmp(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.serviceProviderMap = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'serviceProviderMapListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ServiceProviderMapLmp();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.serviceProviderMap = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'serviceProviderMapListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
