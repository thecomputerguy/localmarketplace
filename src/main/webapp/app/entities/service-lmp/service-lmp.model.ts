import { BaseEntity } from './../../shared';

export class ServiceLmp implements BaseEntity {
    constructor(
        public id?: number,
        public serviceName?: string,
        public serviceCategoryId?: number,
        public serviceProviderMaps?: BaseEntity[],
    ) {
    }
}
