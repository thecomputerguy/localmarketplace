/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { LocalmarketplaceTestModule } from '../../../test.module';
import { ProviderReviewLogLmpDetailComponent } from '../../../../../../main/webapp/app/entities/provider-review-log-lmp/provider-review-log-lmp-detail.component';
import { ProviderReviewLogLmpService } from '../../../../../../main/webapp/app/entities/provider-review-log-lmp/provider-review-log-lmp.service';
import { ProviderReviewLogLmp } from '../../../../../../main/webapp/app/entities/provider-review-log-lmp/provider-review-log-lmp.model';

describe('Component Tests', () => {

    describe('ProviderReviewLogLmp Management Detail Component', () => {
        let comp: ProviderReviewLogLmpDetailComponent;
        let fixture: ComponentFixture<ProviderReviewLogLmpDetailComponent>;
        let service: ProviderReviewLogLmpService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LocalmarketplaceTestModule],
                declarations: [ProviderReviewLogLmpDetailComponent],
                providers: [
                    ProviderReviewLogLmpService
                ]
            })
            .overrideTemplate(ProviderReviewLogLmpDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProviderReviewLogLmpDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProviderReviewLogLmpService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new ProviderReviewLogLmp(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.providerReviewLog).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
