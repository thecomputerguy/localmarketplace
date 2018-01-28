import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ServiceLmp } from './service-lmp.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ServiceLmpService {

    private resourceUrl =  SERVER_API_URL + 'api/services';

    constructor(private http: Http) { }

    create(service: ServiceLmp): Observable<ServiceLmp> {
        const copy = this.convert(service);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(service: ServiceLmp): Observable<ServiceLmp> {
        const copy = this.convert(service);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ServiceLmp> {
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
     * Convert a returned JSON object to ServiceLmp.
     */
    private convertItemFromServer(json: any): ServiceLmp {
        const entity: ServiceLmp = Object.assign(new ServiceLmp(), json);
        return entity;
    }

    /**
     * Convert a ServiceLmp to a JSON which can be sent to the server.
     */
    private convert(service: ServiceLmp): ServiceLmp {
        const copy: ServiceLmp = Object.assign({}, service);
        return copy;
    }
}
