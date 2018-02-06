import { BaseEntity } from './../../shared';

export class AddressLmp implements BaseEntity {
    constructor(
        public id?: number,
        public streetAddress?: string,
        public city?: string,
        public state?: string,
        public country?: string,
        public zip?: number,
        public userId?: number,
    ) {
    }
}
