/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { LocalmarketplaceTestModule } from '../../../test.module';
import { ServiceDeliveryOfferLmpDetailComponent } from '../../../../../../main/webapp/app/entities/service-delivery-offer-lmp/service-delivery-offer-lmp-detail.component';
import { ServiceDeliveryOfferLmpService } from '../../../../../../main/webapp/app/entities/service-delivery-offer-lmp/service-delivery-offer-lmp.service';
import { ServiceDeliveryOfferLmp } from '../../../../../../main/webapp/app/entities/service-delivery-offer-lmp/service-delivery-offer-lmp.model';

describe('Component Tests', () => {

    describe('ServiceDeliveryOfferLmp Management Detail Component', () => {
        let comp: ServiceDeliveryOfferLmpDetailComponent;
        let fixture: ComponentFixture<ServiceDeliveryOfferLmpDetailComponent>;
        let service: ServiceDeliveryOfferLmpService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LocalmarketplaceTestModule],
                declarations: [ServiceDeliveryOfferLmpDetailComponent],
                providers: [
                    ServiceDeliveryOfferLmpService
                ]
            })
            .overrideTemplate(ServiceDeliveryOfferLmpDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ServiceDeliveryOfferLmpDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServiceDeliveryOfferLmpService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new ServiceDeliveryOfferLmp(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.serviceDeliveryOffer).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
