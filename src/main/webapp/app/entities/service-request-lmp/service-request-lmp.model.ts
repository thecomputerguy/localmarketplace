import { BaseEntity } from './../../shared';

export class ServiceRequestLmp implements BaseEntity {
    constructor(
        public id?: number,
        public requirementDescription?: string,
        public serviceRequiredOn?: any,
        public expectedStartTime?: any,
        public tentativeEffortsRequiredInHours?: number,
        public userId?: number,
        public serviceDeliveryOffers?: BaseEntity[],
    ) {
    }
}
