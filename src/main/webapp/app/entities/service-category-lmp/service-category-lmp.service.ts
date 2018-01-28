import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ServiceCategoryLmp } from './service-category-lmp.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ServiceCategoryLmpService {

    private resourceUrl =  SERVER_API_URL + 'api/service-categories';

    constructor(private http: Http) { }

    create(serviceCategory: ServiceCategoryLmp): Observable<ServiceCategoryLmp> {
        const copy = this.convert(serviceCategory);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(serviceCategory: ServiceCategoryLmp): Observable<ServiceCategoryLmp> {
        const copy = this.convert(serviceCategory);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ServiceCategoryLmp> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to ServiceCategoryLmp.
     */
    private convertItemFromServer(json: any): ServiceCategoryLmp {
        const entity: ServiceCategoryLmp = Object.assign(new ServiceCategoryLmp(), json);
        return entity;
    }

    /**
     * Convert a ServiceCategoryLmp to a JSON which can be sent to the server.
     */
    private convert(serviceCategory: ServiceCategoryLmp): ServiceCategoryLmp {
        const copy: ServiceCategoryLmp = Object.assign({}, serviceCategory);
        return copy;
    }
}
