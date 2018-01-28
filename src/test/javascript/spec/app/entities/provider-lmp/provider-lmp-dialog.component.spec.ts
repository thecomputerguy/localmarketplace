/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { LocalmarketplaceTestModule } from '../../../test.module';
import { ProviderLmpDialogComponent } from '../../../../../../main/webapp/app/entities/provider-lmp/provider-lmp-dialog.component';
import { ProviderLmpService } from '../../../../../../main/webapp/app/entities/provider-lmp/provider-lmp.service';
import { ProviderLmp } from '../../../../../../main/webapp/app/entities/provider-lmp/provider-lmp.model';

describe('Component Tests', () => {

    describe('ProviderLmp Management Dialog Component', () => {
        let comp: ProviderLmpDialogComponent;
        let fixture: ComponentFixture<ProviderLmpDialogComponent>;
        let service: ProviderLmpService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LocalmarketplaceTestModule],
                declarations: [ProviderLmpDialogComponent],
                providers: [
                    ProviderLmpService
                ]
            })
            .overrideTemplate(ProviderLmpDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProviderLmpDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProviderLmpService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ProviderLmp(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.provider = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'providerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ProviderLmp();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.provider = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'providerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
