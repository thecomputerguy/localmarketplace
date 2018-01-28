import { BaseEntity } from './../../shared';

export class ServiceCategoryLmp implements BaseEntity {
    constructor(
        public id?: number,
        public categoryName?: string,
        public services?: BaseEntity[],
    ) {
    }
}
