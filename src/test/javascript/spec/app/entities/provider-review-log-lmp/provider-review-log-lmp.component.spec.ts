/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { LocalmarketplaceTestModule } from '../../../test.module';
import { ProviderReviewLogLmpComponent } from '../../../../../../main/webapp/app/entities/provider-review-log-lmp/provider-review-log-lmp.component';
import { ProviderReviewLogLmpService } from '../../../../../../main/webapp/app/entities/provider-review-log-lmp/provider-review-log-lmp.service';
import { ProviderReviewLogLmp } from '../../../../../../main/webapp/app/entities/provider-review-log-lmp/provider-review-log-lmp.model';

describe('Component Tests', () => {

    describe('ProviderReviewLogLmp Management Component', () => {
        let comp: ProviderReviewLogLmpComponent;
        let fixture: ComponentFixture<ProviderReviewLogLmpComponent>;
        let service: ProviderReviewLogLmpService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LocalmarketplaceTestModule],
                declarations: [ProviderReviewLogLmpComponent],
                providers: [
                    ProviderReviewLogLmpService
                ]
            })
            .overrideTemplate(ProviderReviewLogLmpComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProviderReviewLogLmpComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProviderReviewLogLmpService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new ProviderReviewLogLmp(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.providerReviewLogs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
