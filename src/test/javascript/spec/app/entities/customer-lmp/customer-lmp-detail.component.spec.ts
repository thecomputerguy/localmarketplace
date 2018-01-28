/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { LocalmarketplaceTestModule } from '../../../test.module';
import { CustomerLmpDetailComponent } from '../../../../../../main/webapp/app/entities/customer-lmp/customer-lmp-detail.component';
import { CustomerLmpService } from '../../../../../../main/webapp/app/entities/customer-lmp/customer-lmp.service';
import { CustomerLmp } from '../../../../../../main/webapp/app/entities/customer-lmp/customer-lmp.model';

describe('Component Tests', () => {

    describe('CustomerLmp Management Detail Component', () => {
        let comp: CustomerLmpDetailComponent;
        let fixture: ComponentFixture<CustomerLmpDetailComponent>;
        let service: CustomerLmpService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LocalmarketplaceTestModule],
                declarations: [CustomerLmpDetailComponent],
                providers: [
                    CustomerLmpService
                ]
            })
            .overrideTemplate(CustomerLmpDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomerLmpDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerLmpService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new CustomerLmp(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.customer).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
