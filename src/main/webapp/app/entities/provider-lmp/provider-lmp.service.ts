import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ProviderLmp } from './provider-lmp.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ProviderLmpService {

    private resourceUrl =  SERVER_API_URL + 'api/providers';

    constructor(private http: Http) { }

    create(provider: ProviderLmp): Observable<ProviderLmp> {
        const copy = this.convert(provider);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(provider: ProviderLmp): Observable<ProviderLmp> {
        const copy = this.convert(provider);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ProviderLmp> {
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
     * Convert a returned JSON object to ProviderLmp.
     */
    private convertItemFromServer(json: any): ProviderLmp {
        const entity: ProviderLmp = Object.assign(new ProviderLmp(), json);
        return entity;
    }

    /**
     * Convert a ProviderLmp to a JSON which can be sent to the server.
     */
    private convert(provider: ProviderLmp): ProviderLmp {
        const copy: ProviderLmp = Object.assign({}, provider);
        return copy;
    }
}
