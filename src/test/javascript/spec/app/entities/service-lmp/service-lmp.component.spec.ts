/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { LocalmarketplaceTestModule } from '../../../test.module';
import { ServiceLmpComponent } from '../../../../../../main/webapp/app/entities/service-lmp/service-lmp.component';
import { ServiceLmpService } from '../../../../../../main/webapp/app/entities/service-lmp/service-lmp.service';
import { ServiceLmp } from '../../../../../../main/webapp/app/entities/service-lmp/service-lmp.model';

describe('Component Tests', () => {

    describe('ServiceLmp Management Component', () => {
        let comp: ServiceLmpComponent;
        let fixture: ComponentFixture<ServiceLmpComponent>;
        let service: ServiceLmpService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LocalmarketplaceTestModule],
                declarations: [ServiceLmpComponent],
                providers: [
                    ServiceLmpService
                ]
            })
            .overrideTemplate(ServiceLmpComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ServiceLmpComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServiceLmpService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new ServiceLmp(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.services[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
