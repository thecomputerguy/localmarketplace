import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ProviderRatingLmp } from './provider-rating-lmp.model';
import { ProviderRatingLmpService } from './provider-rating-lmp.service';

@Component({
    selector: 'jhi-provider-rating-lmp-detail',
    templateUrl: './provider-rating-lmp-detail.component.html'
})
export class ProviderRatingLmpDetailComponent implements OnInit, OnDestroy {

    providerRating: ProviderRatingLmp;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private providerRatingService: ProviderRatingLmpService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInProviderRatings();
    }

    load(id) {
        this.providerRatingService.find(id).subscribe((providerRating) => {
            this.providerRating = providerRating;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProviderRatings() {
        this.eventSubscriber = this.eventManager.subscribe(
            'providerRatingListModification',
            (response) => this.load(this.providerRating.id)
        );
    }
}
