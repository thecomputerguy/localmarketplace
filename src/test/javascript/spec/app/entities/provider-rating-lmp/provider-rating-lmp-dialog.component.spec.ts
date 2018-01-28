/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { LocalmarketplaceTestModule } from '../../../test.module';
import { ProviderRatingLmpDialogComponent } from '../../../../../../main/webapp/app/entities/provider-rating-lmp/provider-rating-lmp-dialog.component';
import { ProviderRatingLmpService } from '../../../../../../main/webapp/app/entities/provider-rating-lmp/provider-rating-lmp.service';
import { ProviderRatingLmp } from '../../../../../../main/webapp/app/entities/provider-rating-lmp/provider-rating-lmp.model';
import { ProviderLmpService } from '../../../../../../main/webapp/app/entities/provider-lmp';

describe('Component Tests', () => {

    describe('ProviderRatingLmp Management Dialog Component', () => {
        let comp: ProviderRatingLmpDialogComponent;
        let fixture: ComponentFixture<ProviderRatingLmpDialogComponent>;
        let service: ProviderRatingLmpService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LocalmarketplaceTestModule],
                declarations: [ProviderRatingLmpDialogComponent],
                providers: [
                    ProviderLmpService,
                    ProviderRatingLmpService
                ]
            })
            .overrideTemplate(ProviderRatingLmpDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProviderRatingLmpDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProviderRatingLmpService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ProviderRatingLmp(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.providerRating = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'providerRatingListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ProviderRatingLmp();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.providerRating = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'providerRatingListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
