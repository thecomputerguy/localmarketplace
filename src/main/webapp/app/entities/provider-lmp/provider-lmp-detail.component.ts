import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ProviderLmp } from './provider-lmp.model';
import { ProviderLmpService } from './provider-lmp.service';

@Component({
    selector: 'jhi-provider-lmp-detail',
    templateUrl: './provider-lmp-detail.component.html'
})
export class ProviderLmpDetailComponent implements OnInit, OnDestroy {

    provider: ProviderLmp;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private providerService: ProviderLmpService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInProviders();
    }

    load(id) {
        this.providerService.find(id).subscribe((provider) => {
            this.provider = provider;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProviders() {
        this.eventSubscriber = this.eventManager.subscribe(
            'providerListModification',
            (response) => this.load(this.provider.id)
        );
    }
}
