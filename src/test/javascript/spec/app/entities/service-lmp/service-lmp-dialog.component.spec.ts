/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { LocalmarketplaceTestModule } from '../../../test.module';
import { ServiceLmpDialogComponent } from '../../../../../../main/webapp/app/entities/service-lmp/service-lmp-dialog.component';
import { ServiceLmpService } from '../../../../../../main/webapp/app/entities/service-lmp/service-lmp.service';
import { ServiceLmp } from '../../../../../../main/webapp/app/entities/service-lmp/service-lmp.model';
import { ServiceCategoryLmpService } from '../../../../../../main/webapp/app/entities/service-category-lmp';

describe('Component Tests', () => {

    describe('ServiceLmp Management Dialog Component', () => {
        let comp: ServiceLmpDialogComponent;
        let fixture: ComponentFixture<ServiceLmpDialogComponent>;
        let service: ServiceLmpService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LocalmarketplaceTestModule],
                declarations: [ServiceLmpDialogComponent],
                providers: [
                    ServiceCategoryLmpService,
                    ServiceLmpService
                ]
            })
            .overrideTemplate(ServiceLmpDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ServiceLmpDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServiceLmpService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ServiceLmp(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.service = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'serviceListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ServiceLmp();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.service = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'serviceListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
