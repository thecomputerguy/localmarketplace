/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { LocalmarketplaceTestModule } from '../../../test.module';
import { ServiceAppointmentLmpDetailComponent } from '../../../../../../main/webapp/app/entities/service-appointment-lmp/service-appointment-lmp-detail.component';
import { ServiceAppointmentLmpService } from '../../../../../../main/webapp/app/entities/service-appointment-lmp/service-appointment-lmp.service';
import { ServiceAppointmentLmp } from '../../../../../../main/webapp/app/entities/service-appointment-lmp/service-appointment-lmp.model';

describe('Component Tests', () => {

    describe('ServiceAppointmentLmp Management Detail Component', () => {
        let comp: ServiceAppointmentLmpDetailComponent;
        let fixture: ComponentFixture<ServiceAppointmentLmpDetailComponent>;
        let service: ServiceAppointmentLmpService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LocalmarketplaceTestModule],
                declarations: [ServiceAppointmentLmpDetailComponent],
                providers: [
                    ServiceAppointmentLmpService
                ]
            })
            .overrideTemplate(ServiceAppointmentLmpDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ServiceAppointmentLmpDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServiceAppointmentLmpService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new ServiceAppointmentLmp(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.serviceAppointment).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
