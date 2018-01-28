/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { LocalmarketplaceTestModule } from '../../../test.module';
import { ServiceLmpDetailComponent } from '../../../../../../main/webapp/app/entities/service-lmp/service-lmp-detail.component';
import { ServiceLmpService } from '../../../../../../main/webapp/app/entities/service-lmp/service-lmp.service';
import { ServiceLmp } from '../../../../../../main/webapp/app/entities/service-lmp/service-lmp.model';

describe('Component Tests', () => {

    describe('ServiceLmp Management Detail Component', () => {
        let comp: ServiceLmpDetailComponent;
        let fixture: ComponentFixture<ServiceLmpDetailComponent>;
        let service: ServiceLmpService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LocalmarketplaceTestModule],
                declarations: [ServiceLmpDetailComponent],
                providers: [
                    ServiceLmpService
                ]
            })
            .overrideTemplate(ServiceLmpDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ServiceLmpDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServiceLmpService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new ServiceLmp(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.service).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
