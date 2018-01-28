import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { AddressLmp } from './address-lmp.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AddressLmpService {

    private resourceUrl =  SERVER_API_URL + 'api/addresses';

    constructor(private http: Http) { }

    create(address: AddressLmp): Observable<AddressLmp> {
        const copy = this.convert(address);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(address: AddressLmp): Observable<AddressLmp> {
        const copy = this.convert(address);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<AddressLmp> {
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
     * Convert a returned JSON object to AddressLmp.
     */
    private convertItemFromServer(json: any): AddressLmp {
        const entity: AddressLmp = Object.assign(new AddressLmp(), json);
        return entity;
    }

    /**
     * Convert a AddressLmp to a JSON which can be sent to the server.
     */
    private convert(address: AddressLmp): AddressLmp {
        const copy: AddressLmp = Object.assign({}, address);
        return copy;
    }
}
