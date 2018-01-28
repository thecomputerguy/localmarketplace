/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { LocalmarketplaceTestModule } from '../../../test.module';
import { ServiceCategoryLmpDetailComponent } from '../../../../../../main/webapp/app/entities/service-category-lmp/service-category-lmp-detail.component';
import { ServiceCategoryLmpService } from '../../../../../../main/webapp/app/entities/service-category-lmp/service-category-lmp.service';
import { ServiceCategoryLmp } from '../../../../../../main/webapp/app/entities/service-category-lmp/service-category-lmp.model';

describe('Component Tests', () => {

    describe('ServiceCategoryLmp Management Detail Component', () => {
        let comp: ServiceCategoryLmpDetailComponent;
        let fixture: ComponentFixture<ServiceCategoryLmpDetailComponent>;
        let service: ServiceCategoryLmpService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LocalmarketplaceTestModule],
                declarations: [ServiceCategoryLmpDetailComponent],
                providers: [
                    ServiceCategoryLmpService
                ]
            })
            .overrideTemplate(ServiceCategoryLmpDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ServiceCategoryLmpDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServiceCategoryLmpService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new ServiceCategoryLmp(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.serviceCategory).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
