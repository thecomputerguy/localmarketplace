import { BaseEntity } from './../../shared';

export class CustomerLmp implements BaseEntity {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public mobileNumber?: number,
        public addresses?: BaseEntity[],
        public serviceRequests?: BaseEntity[],
    ) {
    }
}
