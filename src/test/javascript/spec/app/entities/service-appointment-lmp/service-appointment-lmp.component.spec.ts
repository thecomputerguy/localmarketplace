/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { LocalmarketplaceTestModule } from '../../../test.module';
import { ServiceAppointmentLmpComponent } from '../../../../../../main/webapp/app/entities/service-appointment-lmp/service-appointment-lmp.component';
import { ServiceAppointmentLmpService } from '../../../../../../main/webapp/app/entities/service-appointment-lmp/service-appointment-lmp.service';
import { ServiceAppointmentLmp } from '../../../../../../main/webapp/app/entities/service-appointment-lmp/service-appointment-lmp.model';

describe('Component Tests', () => {

    describe('ServiceAppointmentLmp Management Component', () => {
        let comp: ServiceAppointmentLmpComponent;
        let fixture: ComponentFixture<ServiceAppointmentLmpComponent>;
        let service: ServiceAppointmentLmpService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LocalmarketplaceTestModule],
                declarations: [ServiceAppointmentLmpComponent],
                providers: [
                    ServiceAppointmentLmpService
                ]
            })
            .overrideTemplate(ServiceAppointmentLmpComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ServiceAppointmentLmpComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServiceAppointmentLmpService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new ServiceAppointmentLmp(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.serviceAppointments[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
