/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { LocalmarketplaceTestModule } from '../../../test.module';
import { ServiceRequestLmpDetailComponent } from '../../../../../../main/webapp/app/entities/service-request-lmp/service-request-lmp-detail.component';
import { ServiceRequestLmpService } from '../../../../../../main/webapp/app/entities/service-request-lmp/service-request-lmp.service';
import { ServiceRequestLmp } from '../../../../../../main/webapp/app/entities/service-request-lmp/service-request-lmp.model';

describe('Component Tests', () => {

    describe('ServiceRequestLmp Management Detail Component', () => {
        let comp: ServiceRequestLmpDetailComponent;
        let fixture: ComponentFixture<ServiceRequestLmpDetailComponent>;
        let service: ServiceRequestLmpService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LocalmarketplaceTestModule],
                declarations: [ServiceRequestLmpDetailComponent],
                providers: [
                    ServiceRequestLmpService
                ]
            })
            .overrideTemplate(ServiceRequestLmpDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ServiceRequestLmpDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServiceRequestLmpService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new ServiceRequestLmp(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.serviceRequest).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
