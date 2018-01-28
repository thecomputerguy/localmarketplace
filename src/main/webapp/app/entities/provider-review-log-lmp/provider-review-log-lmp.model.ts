import { BaseEntity } from './../../shared';

export class ProviderReviewLogLmp implements BaseEntity {
    constructor(
        public id?: number,
        public punctualityRating?: number,
        public proficiencyRating?: number,
        public etiquattesRating?: number,
        public communicationRating?: number,
        public priceRating?: number,
        public overallRating?: number,
        public review?: number,
        public reviewDate?: any,
        public serviceAppointmentId?: number,
    ) {
    }
}
