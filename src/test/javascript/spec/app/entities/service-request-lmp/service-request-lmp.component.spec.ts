/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { LocalmarketplaceTestModule } from '../../../test.module';
import { ServiceRequestLmpComponent } from '../../../../../../main/webapp/app/entities/service-request-lmp/service-request-lmp.component';
import { ServiceRequestLmpService } from '../../../../../../main/webapp/app/entities/service-request-lmp/service-request-lmp.service';
import { ServiceRequestLmp } from '../../../../../../main/webapp/app/entities/service-request-lmp/service-request-lmp.model';

describe('Component Tests', () => {

    describe('ServiceRequestLmp Management Component', () => {
        let comp: ServiceRequestLmpComponent;
        let fixture: ComponentFixture<ServiceRequestLmpComponent>;
        let service: ServiceRequestLmpService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LocalmarketplaceTestModule],
                declarations: [ServiceRequestLmpComponent],
                providers: [
                    ServiceRequestLmpService
                ]
            })
            .overrideTemplate(ServiceRequestLmpComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ServiceRequestLmpComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServiceRequestLmpService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new ServiceRequestLmp(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.serviceRequests[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
