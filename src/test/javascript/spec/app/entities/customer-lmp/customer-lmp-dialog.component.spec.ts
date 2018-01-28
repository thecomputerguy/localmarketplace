/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { LocalmarketplaceTestModule } from '../../../test.module';
import { CustomerLmpDialogComponent } from '../../../../../../main/webapp/app/entities/customer-lmp/customer-lmp-dialog.component';
import { CustomerLmpService } from '../../../../../../main/webapp/app/entities/customer-lmp/customer-lmp.service';
import { CustomerLmp } from '../../../../../../main/webapp/app/entities/customer-lmp/customer-lmp.model';

describe('Component Tests', () => {

    describe('CustomerLmp Management Dialog Component', () => {
        let comp: CustomerLmpDialogComponent;
        let fixture: ComponentFixture<CustomerLmpDialogComponent>;
        let service: CustomerLmpService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LocalmarketplaceTestModule],
                declarations: [CustomerLmpDialogComponent],
                providers: [
                    CustomerLmpService
                ]
            })
            .overrideTemplate(CustomerLmpDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomerLmpDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerLmpService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CustomerLmp(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.customer = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'customerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CustomerLmp();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.customer = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'customerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
