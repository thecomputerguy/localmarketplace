/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { LocalmarketplaceTestModule } from '../../../test.module';
import { ProviderRatingLmpComponent } from '../../../../../../main/webapp/app/entities/provider-rating-lmp/provider-rating-lmp.component';
import { ProviderRatingLmpService } from '../../../../../../main/webapp/app/entities/provider-rating-lmp/provider-rating-lmp.service';
import { ProviderRatingLmp } from '../../../../../../main/webapp/app/entities/provider-rating-lmp/provider-rating-lmp.model';

describe('Component Tests', () => {

    describe('ProviderRatingLmp Management Component', () => {
        let comp: ProviderRatingLmpComponent;
        let fixture: ComponentFixture<ProviderRatingLmpComponent>;
        let service: ProviderRatingLmpService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LocalmarketplaceTestModule],
                declarations: [ProviderRatingLmpComponent],
                providers: [
                    ProviderRatingLmpService
                ]
            })
            .overrideTemplate(ProviderRatingLmpComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProviderRatingLmpComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProviderRatingLmpService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new ProviderRatingLmp(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.providerRatings[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
