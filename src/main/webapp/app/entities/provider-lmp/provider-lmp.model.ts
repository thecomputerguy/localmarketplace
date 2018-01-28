import { BaseEntity } from './../../shared';

export class ProviderLmp implements BaseEntity {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public mobileNumber?: number,
        public isIndividual?: boolean,
        public isRegisteredOffice?: boolean,
        public officeAddress?: string,
        public zip?: number,
        public description?: string,
        public ratings?: BaseEntity[],
        public serviceProviderMaps?: BaseEntity[],
    ) {
        this.isIndividual = false;
        this.isRegisteredOffice = false;
    }
}
