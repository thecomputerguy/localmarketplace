import { BaseEntity } from './../../shared';

export class ProviderRatingLmp implements BaseEntity {
    constructor(
        public id?: number,
        public avgPunctualityRating?: number,
        public avgProfRating?: number,
        public avgEtiRating?: number,
        public avgCommRating?: number,
        public avgPriceRating?: number,
        public avgOverallRating?: number,
        public lastUpdatedOn?: number,
        public providerId?: number,
    ) {
    }
}
