/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { LocalmarketplaceTestModule } from '../../../test.module';
import { AddressLmpDialogComponent } from '../../../../../../main/webapp/app/entities/address-lmp/address-lmp-dialog.component';
import { AddressLmpService } from '../../../../../../main/webapp/app/entities/address-lmp/address-lmp.service';
import { AddressLmp } from '../../../../../../main/webapp/app/entities/address-lmp/address-lmp.model';
import { CustomerLmpService } from '../../../../../../main/webapp/app/entities/customer-lmp';

describe('Component Tests', () => {

    describe('AddressLmp Management Dialog Component', () => {
        let comp: AddressLmpDialogComponent;
        let fixture: ComponentFixture<AddressLmpDialogComponent>;
        let service: AddressLmpService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LocalmarketplaceTestModule],
                declarations: [AddressLmpDialogComponent],
                providers: [
                    CustomerLmpService,
                    AddressLmpService
                ]
            })
            .overrideTemplate(AddressLmpDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AddressLmpDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressLmpService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AddressLmp(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.address = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'addressListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AddressLmp();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.address = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'addressListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
