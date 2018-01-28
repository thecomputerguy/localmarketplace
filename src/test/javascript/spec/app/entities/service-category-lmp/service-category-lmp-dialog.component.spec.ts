/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { LocalmarketplaceTestModule } from '../../../test.module';
import { ServiceCategoryLmpDialogComponent } from '../../../../../../main/webapp/app/entities/service-category-lmp/service-category-lmp-dialog.component';
import { ServiceCategoryLmpService } from '../../../../../../main/webapp/app/entities/service-category-lmp/service-category-lmp.service';
import { ServiceCategoryLmp } from '../../../../../../main/webapp/app/entities/service-category-lmp/service-category-lmp.model';

describe('Component Tests', () => {

    describe('ServiceCategoryLmp Management Dialog Component', () => {
        let comp: ServiceCategoryLmpDialogComponent;
        let fixture: ComponentFixture<ServiceCategoryLmpDialogComponent>;
        let service: ServiceCategoryLmpService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LocalmarketplaceTestModule],
                declarations: [ServiceCategoryLmpDialogComponent],
                providers: [
                    ServiceCategoryLmpService
                ]
            })
            .overrideTemplate(ServiceCategoryLmpDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ServiceCategoryLmpDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServiceCategoryLmpService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ServiceCategoryLmp(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.serviceCategory = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'serviceCategoryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ServiceCategoryLmp();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.serviceCategory = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'serviceCategoryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
