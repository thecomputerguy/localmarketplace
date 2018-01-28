/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { LocalmarketplaceTestModule } from '../../../test.module';
import { ProviderRatingLmpDetailComponent } from '../../../../../../main/webapp/app/entities/provider-rating-lmp/provider-rating-lmp-detail.component';
import { ProviderRatingLmpService } from '../../../../../../main/webapp/app/entities/provider-rating-lmp/provider-rating-lmp.service';
import { ProviderRatingLmp } from '../../../../../../main/webapp/app/entities/provider-rating-lmp/provider-rating-lmp.model';

describe('Component Tests', () => {

    describe('ProviderRatingLmp Management Detail Component', () => {
        let comp: ProviderRatingLmpDetailComponent;
        let fixture: ComponentFixture<ProviderRatingLmpDetailComponent>;
        let service: ProviderRatingLmpService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LocalmarketplaceTestModule],
                declarations: [ProviderRatingLmpDetailComponent],
                providers: [
                    ProviderRatingLmpService
                ]
            })
            .overrideTemplate(ProviderRatingLmpDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProviderRatingLmpDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProviderRatingLmpService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new ProviderRatingLmp(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.providerRating).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
