import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ProviderReviewLogLmp } from './provider-review-log-lmp.model';
import { ProviderReviewLogLmpService } from './provider-review-log-lmp.service';

@Component({
    selector: 'jhi-provider-review-log-lmp-detail',
    templateUrl: './provider-review-log-lmp-detail.component.html'
})
export class ProviderReviewLogLmpDetailComponent implements OnInit, OnDestroy {

    providerReviewLog: ProviderReviewLogLmp;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private providerReviewLogService: ProviderReviewLogLmpService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInProviderReviewLogs();
    }

    load(id) {
        this.providerReviewLogService.find(id).subscribe((providerReviewLog) => {
            this.providerReviewLog = providerReviewLog;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProviderReviewLogs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'providerReviewLogListModification',
            (response) => this.load(this.providerReviewLog.id)
        );
    }
}
