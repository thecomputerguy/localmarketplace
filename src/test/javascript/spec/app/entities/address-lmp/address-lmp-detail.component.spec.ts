/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { LocalmarketplaceTestModule } from '../../../test.module';
import { AddressLmpDetailComponent } from '../../../../../../main/webapp/app/entities/address-lmp/address-lmp-detail.component';
import { AddressLmpService } from '../../../../../../main/webapp/app/entities/address-lmp/address-lmp.service';
import { AddressLmp } from '../../../../../../main/webapp/app/entities/address-lmp/address-lmp.model';

describe('Component Tests', () => {

    describe('AddressLmp Management Detail Component', () => {
        let comp: AddressLmpDetailComponent;
        let fixture: ComponentFixture<AddressLmpDetailComponent>;
        let service: AddressLmpService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LocalmarketplaceTestModule],
                declarations: [AddressLmpDetailComponent],
                providers: [
                    AddressLmpService
                ]
            })
            .overrideTemplate(AddressLmpDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AddressLmpDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressLmpService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new AddressLmp(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.address).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
