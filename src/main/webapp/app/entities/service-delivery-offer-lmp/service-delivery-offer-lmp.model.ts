import { BaseEntity } from './../../shared';

export class ServiceDeliveryOfferLmp implements BaseEntity {
    constructor(
        public id?: number,
        public discountInPercentage?: number,
        public estimatedCost?: number,
        public offerSubmitDate?: any,
        public isOfferAccepted?: boolean,
        public serviceProviderMapId?: number,
        public serviceAppointments?: BaseEntity[],
        public serviceRequestId?: number,
    ) {
        this.isOfferAccepted = false;
    }
}
