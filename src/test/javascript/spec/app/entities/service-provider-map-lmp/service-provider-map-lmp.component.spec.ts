/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { LocalmarketplaceTestModule } from '../../../test.module';
import { ServiceProviderMapLmpComponent } from '../../../../../../main/webapp/app/entities/service-provider-map-lmp/service-provider-map-lmp.component';
import { ServiceProviderMapLmpService } from '../../../../../../main/webapp/app/entities/service-provider-map-lmp/service-provider-map-lmp.service';
import { ServiceProviderMapLmp } from '../../../../../../main/webapp/app/entities/service-provider-map-lmp/service-provider-map-lmp.model';

describe('Component Tests', () => {

    describe('ServiceProviderMapLmp Management Component', () => {
        let comp: ServiceProviderMapLmpComponent;
        let fixture: ComponentFixture<ServiceProviderMapLmpComponent>;
        let service: ServiceProviderMapLmpService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LocalmarketplaceTestModule],
                declarations: [ServiceProviderMapLmpComponent],
                providers: [
                    ServiceProviderMapLmpService
                ]
            })
            .overrideTemplate(ServiceProviderMapLmpComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ServiceProviderMapLmpComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServiceProviderMapLmpService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new ServiceProviderMapLmp(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.serviceProviderMaps[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
