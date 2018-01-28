/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { LocalmarketplaceTestModule } from '../../../test.module';
import { ProviderLmpDetailComponent } from '../../../../../../main/webapp/app/entities/provider-lmp/provider-lmp-detail.component';
import { ProviderLmpService } from '../../../../../../main/webapp/app/entities/provider-lmp/provider-lmp.service';
import { ProviderLmp } from '../../../../../../main/webapp/app/entities/provider-lmp/provider-lmp.model';

describe('Component Tests', () => {

    describe('ProviderLmp Management Detail Component', () => {
        let comp: ProviderLmpDetailComponent;
        let fixture: ComponentFixture<ProviderLmpDetailComponent>;
        let service: ProviderLmpService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LocalmarketplaceTestModule],
                declarations: [ProviderLmpDetailComponent],
                providers: [
                    ProviderLmpService
                ]
            })
            .overrideTemplate(ProviderLmpDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProviderLmpDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProviderLmpService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new ProviderLmp(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.provider).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
