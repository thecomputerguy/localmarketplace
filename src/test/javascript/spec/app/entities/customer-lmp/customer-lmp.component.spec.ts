/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { LocalmarketplaceTestModule } from '../../../test.module';
import { CustomerLmpComponent } from '../../../../../../main/webapp/app/entities/customer-lmp/customer-lmp.component';
import { CustomerLmpService } from '../../../../../../main/webapp/app/entities/customer-lmp/customer-lmp.service';
import { CustomerLmp } from '../../../../../../main/webapp/app/entities/customer-lmp/customer-lmp.model';

describe('Component Tests', () => {

    describe('CustomerLmp Management Component', () => {
        let comp: CustomerLmpComponent;
        let fixture: ComponentFixture<CustomerLmpComponent>;
        let service: CustomerLmpService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LocalmarketplaceTestModule],
                declarations: [CustomerLmpComponent],
                providers: [
                    CustomerLmpService
                ]
            })
            .overrideTemplate(CustomerLmpComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomerLmpComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerLmpService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new CustomerLmp(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.customers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
