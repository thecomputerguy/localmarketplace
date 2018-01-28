import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ServiceDeliveryOfferLmp } from './service-delivery-offer-lmp.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ServiceDeliveryOfferLmpService {

    private resourceUrl =  SERVER_API_URL + 'api/service-delivery-offers';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(serviceDeliveryOffer: ServiceDeliveryOfferLmp): Observable<ServiceDeliveryOfferLmp> {
        const copy = this.convert(serviceDeliveryOffer);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(serviceDeliveryOffer: ServiceDeliveryOfferLmp): Observable<ServiceDeliveryOfferLmp> {
        const copy = this.convert(serviceDeliveryOffer);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ServiceDeliveryOfferLmp> {
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
     * Convert a returned JSON object to ServiceDeliveryOfferLmp.
     */
    private convertItemFromServer(json: any): ServiceDeliveryOfferLmp {
        const entity: ServiceDeliveryOfferLmp = Object.assign(new ServiceDeliveryOfferLmp(), json);
        entity.offerSubmitDate = this.dateUtils
            .convertDateTimeFromServer(json.offerSubmitDate);
        return entity;
    }

    /**
     * Convert a ServiceDeliveryOfferLmp to a JSON which can be sent to the server.
     */
    private convert(serviceDeliveryOffer: ServiceDeliveryOfferLmp): ServiceDeliveryOfferLmp {
        const copy: ServiceDeliveryOfferLmp = Object.assign({}, serviceDeliveryOffer);

        copy.offerSubmitDate = this.dateUtils.toDate(serviceDeliveryOffer.offerSubmitDate);
        return copy;
    }
}
