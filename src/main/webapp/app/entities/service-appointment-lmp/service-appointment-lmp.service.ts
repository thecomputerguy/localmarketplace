import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ServiceAppointmentLmp } from './service-appointment-lmp.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ServiceAppointmentLmpService {

    private resourceUrl =  SERVER_API_URL + 'api/service-appointments';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(serviceAppointment: ServiceAppointmentLmp): Observable<ServiceAppointmentLmp> {
        const copy = this.convert(serviceAppointment);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(serviceAppointment: ServiceAppointmentLmp): Observable<ServiceAppointmentLmp> {
        const copy = this.convert(serviceAppointment);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ServiceAppointmentLmp> {
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
     * Convert a returned JSON object to ServiceAppointmentLmp.
     */
    private convertItemFromServer(json: any): ServiceAppointmentLmp {
        const entity: ServiceAppointmentLmp = Object.assign(new ServiceAppointmentLmp(), json);
        entity.serviceDeliverOn = this.dateUtils
            .convertDateTimeFromServer(json.serviceDeliverOn);
        entity.serviceStartTime = this.dateUtils
            .convertDateTimeFromServer(json.serviceStartTime);
        entity.serviceEndTime = this.dateUtils
            .convertDateTimeFromServer(json.serviceEndTime);
        return entity;
    }

    /**
     * Convert a ServiceAppointmentLmp to a JSON which can be sent to the server.
     */
    private convert(serviceAppointment: ServiceAppointmentLmp): ServiceAppointmentLmp {
        const copy: ServiceAppointmentLmp = Object.assign({}, serviceAppointment);

        copy.serviceDeliverOn = this.dateUtils.toDate(serviceAppointment.serviceDeliverOn);

        copy.serviceStartTime = this.dateUtils.toDate(serviceAppointment.serviceStartTime);

        copy.serviceEndTime = this.dateUtils.toDate(serviceAppointment.serviceEndTime);
        return copy;
    }
}
