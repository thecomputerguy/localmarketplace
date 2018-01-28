import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ServiceRequestLmp } from './service-request-lmp.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ServiceRequestLmpService {

    private resourceUrl =  SERVER_API_URL + 'api/service-requests';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(serviceRequest: ServiceRequestLmp): Observable<ServiceRequestLmp> {
        const copy = this.convert(serviceRequest);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(serviceRequest: ServiceRequestLmp): Observable<ServiceRequestLmp> {
        const copy = this.convert(serviceRequest);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ServiceRequestLmp> {
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
     * Convert a returned JSON object to ServiceRequestLmp.
     */
    private convertItemFromServer(json: any): ServiceRequestLmp {
        const entity: ServiceRequestLmp = Object.assign(new ServiceRequestLmp(), json);
        entity.serviceRequiredOn = this.dateUtils
            .convertDateTimeFromServer(json.serviceRequiredOn);
        entity.expectedStartTime = this.dateUtils
            .convertDateTimeFromServer(json.expectedStartTime);
        return entity;
    }

    /**
     * Convert a ServiceRequestLmp to a JSON which can be sent to the server.
     */
    private convert(serviceRequest: ServiceRequestLmp): ServiceRequestLmp {
        const copy: ServiceRequestLmp = Object.assign({}, serviceRequest);

        copy.serviceRequiredOn = this.dateUtils.toDate(serviceRequest.serviceRequiredOn);

        copy.expectedStartTime = this.dateUtils.toDate(serviceRequest.expectedStartTime);
        return copy;
    }
}
