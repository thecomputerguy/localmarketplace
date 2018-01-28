/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { LocalmarketplaceTestModule } from '../../../test.module';
import { ServiceCategoryLmpComponent } from '../../../../../../main/webapp/app/entities/service-category-lmp/service-category-lmp.component';
import { ServiceCategoryLmpService } from '../../../../../../main/webapp/app/entities/service-category-lmp/service-category-lmp.service';
import { ServiceCategoryLmp } from '../../../../../../main/webapp/app/entities/service-category-lmp/service-category-lmp.model';

describe('Component Tests', () => {

    describe('ServiceCategoryLmp Management Component', () => {
        let comp: ServiceCategoryLmpComponent;
        let fixture: ComponentFixture<ServiceCategoryLmpComponent>;
        let service: ServiceCategoryLmpService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LocalmarketplaceTestModule],
                declarations: [ServiceCategoryLmpComponent],
                providers: [
                    ServiceCategoryLmpService
                ]
            })
            .overrideTemplate(ServiceCategoryLmpComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ServiceCategoryLmpComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServiceCategoryLmpService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new ServiceCategoryLmp(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.serviceCategories[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
