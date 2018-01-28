import { BaseEntity } from './../../shared';

export class ServiceAppointmentLmp implements BaseEntity {
    constructor(
        public id?: number,
        public serviceDeliverOn?: any,
        public serviceStartTime?: any,
        public serviceEndTime?: any,
        public serviceDeliveryOfferId?: number,
        public providerReviewLogs?: BaseEntity[],
    ) {
    }
}
