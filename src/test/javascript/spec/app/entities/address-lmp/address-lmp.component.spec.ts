/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { LocalmarketplaceTestModule } from '../../../test.module';
import { AddressLmpComponent } from '../../../../../../main/webapp/app/entities/address-lmp/address-lmp.component';
import { AddressLmpService } from '../../../../../../main/webapp/app/entities/address-lmp/address-lmp.service';
import { AddressLmp } from '../../../../../../main/webapp/app/entities/address-lmp/address-lmp.model';

describe('Component Tests', () => {

    describe('AddressLmp Management Component', () => {
        let comp: AddressLmpComponent;
        let fixture: ComponentFixture<AddressLmpComponent>;
        let service: AddressLmpService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LocalmarketplaceTestModule],
                declarations: [AddressLmpComponent],
                providers: [
                    AddressLmpService
                ]
            })
            .overrideTemplate(AddressLmpComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AddressLmpComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressLmpService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new AddressLmp(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.addresses[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
