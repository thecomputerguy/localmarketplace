/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { LocalmarketplaceTestModule } from '../../../test.module';
import { ProviderLmpComponent } from '../../../../../../main/webapp/app/entities/provider-lmp/provider-lmp.component';
import { ProviderLmpService } from '../../../../../../main/webapp/app/entities/provider-lmp/provider-lmp.service';
import { ProviderLmp } from '../../../../../../main/webapp/app/entities/provider-lmp/provider-lmp.model';

describe('Component Tests', () => {

    describe('ProviderLmp Management Component', () => {
        let comp: ProviderLmpComponent;
        let fixture: ComponentFixture<ProviderLmpComponent>;
        let service: ProviderLmpService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LocalmarketplaceTestModule],
                declarations: [ProviderLmpComponent],
                providers: [
                    ProviderLmpService
                ]
            })
            .overrideTemplate(ProviderLmpComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProviderLmpComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProviderLmpService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new ProviderLmp(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.providers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
