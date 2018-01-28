import { BaseEntity } from './../../shared';

export class ServiceProviderMapLmp implements BaseEntity {
    constructor(
        public id?: number,
        public billingRatePerHour?: number,
        public experienceInMonths?: number,
        public serviceOfferingDescription?: string,
        public providerId?: number,
        public serviceId?: number,
        public serviceDeliveryOffers?: BaseEntity[],
    ) {
    }
}
