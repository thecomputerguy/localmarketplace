/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { LocalmarketplaceTestModule } from '../../../test.module';
import { ServiceDeliveryOfferLmpComponent } from '../../../../../../main/webapp/app/entities/service-delivery-offer-lmp/service-delivery-offer-lmp.component';
import { ServiceDeliveryOfferLmpService } from '../../../../../../main/webapp/app/entities/service-delivery-offer-lmp/service-delivery-offer-lmp.service';
import { ServiceDeliveryOfferLmp } from '../../../../../../main/webapp/app/entities/service-delivery-offer-lmp/service-delivery-offer-lmp.model';

describe('Component Tests', () => {

    describe('ServiceDeliveryOfferLmp Management Component', () => {
        let comp: ServiceDeliveryOfferLmpComponent;
        let fixture: ComponentFixture<ServiceDeliveryOfferLmpComponent>;
        let service: ServiceDeliveryOfferLmpService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LocalmarketplaceTestModule],
                declarations: [ServiceDeliveryOfferLmpComponent],
                providers: [
                    ServiceDeliveryOfferLmpService
                ]
            })
            .overrideTemplate(ServiceDeliveryOfferLmpComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ServiceDeliveryOfferLmpComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServiceDeliveryOfferLmpService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new ServiceDeliveryOfferLmp(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.serviceDeliveryOffers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
