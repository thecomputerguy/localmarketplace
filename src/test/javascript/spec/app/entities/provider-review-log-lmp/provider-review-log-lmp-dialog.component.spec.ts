/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { LocalmarketplaceTestModule } from '../../../test.module';
import { ProviderReviewLogLmpDialogComponent } from '../../../../../../main/webapp/app/entities/provider-review-log-lmp/provider-review-log-lmp-dialog.component';
import { ProviderReviewLogLmpService } from '../../../../../../main/webapp/app/entities/provider-review-log-lmp/provider-review-log-lmp.service';
import { ProviderReviewLogLmp } from '../../../../../../main/webapp/app/entities/provider-review-log-lmp/provider-review-log-lmp.model';
import { ServiceAppointmentLmpService } from '../../../../../../main/webapp/app/entities/service-appointment-lmp';

describe('Component Tests', () => {

    describe('ProviderReviewLogLmp Management Dialog Component', () => {
        let comp: ProviderReviewLogLmpDialogComponent;
        let fixture: ComponentFixture<ProviderReviewLogLmpDialogComponent>;
        let service: ProviderReviewLogLmpService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LocalmarketplaceTestModule],
                declarations: [ProviderReviewLogLmpDialogComponent],
                providers: [
                    ServiceAppointmentLmpService,
                    ProviderReviewLogLmpService
                ]
            })
            .overrideTemplate(ProviderReviewLogLmpDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProviderReviewLogLmpDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProviderReviewLogLmpService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ProviderReviewLogLmp(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.providerReviewLog = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'providerReviewLogListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ProviderReviewLogLmp();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.providerReviewLog = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'providerReviewLogListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
