/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { LocalmarketplaceTestModule } from '../../../test.module';
import { ServiceProviderMapLmpDetailComponent } from '../../../../../../main/webapp/app/entities/service-provider-map-lmp/service-provider-map-lmp-detail.component';
import { ServiceProviderMapLmpService } from '../../../../../../main/webapp/app/entities/service-provider-map-lmp/service-provider-map-lmp.service';
import { ServiceProviderMapLmp } from '../../../../../../main/webapp/app/entities/service-provider-map-lmp/service-provider-map-lmp.model';

describe('Component Tests', () => {

    describe('ServiceProviderMapLmp Management Detail Component', () => {
        let comp: ServiceProviderMapLmpDetailComponent;
        let fixture: ComponentFixture<ServiceProviderMapLmpDetailComponent>;
        let service: ServiceProviderMapLmpService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LocalmarketplaceTestModule],
                declarations: [ServiceProviderMapLmpDetailComponent],
                providers: [
                    ServiceProviderMapLmpService
                ]
            })
            .overrideTemplate(ServiceProviderMapLmpDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ServiceProviderMapLmpDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServiceProviderMapLmpService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new ServiceProviderMapLmp(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.serviceProviderMap).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
