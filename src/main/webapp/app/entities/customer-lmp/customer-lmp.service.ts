import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CustomerLmp } from './customer-lmp.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CustomerLmpService {

    private resourceUrl =  SERVER_API_URL + 'api/customers';

    constructor(private http: Http) { }

    create(customer: CustomerLmp): Observable<CustomerLmp> {
        const copy = this.convert(customer);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(customer: CustomerLmp): Observable<CustomerLmp> {
        const copy = this.convert(customer);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<CustomerLmp> {
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
     * Convert a returned JSON object to CustomerLmp.
     */
    private convertItemFromServer(json: any): CustomerLmp {
        const entity: CustomerLmp = Object.assign(new CustomerLmp(), json);
        return entity;
    }

    /**
     * Convert a CustomerLmp to a JSON which can be sent to the server.
     */
    private convert(customer: CustomerLmp): CustomerLmp {
        const copy: CustomerLmp = Object.assign({}, customer);
        return copy;
    }
}
