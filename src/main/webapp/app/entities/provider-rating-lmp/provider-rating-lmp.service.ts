import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ProviderRatingLmp } from './provider-rating-lmp.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ProviderRatingLmpService {

    private resourceUrl =  SERVER_API_URL + 'api/provider-ratings';

    constructor(private http: Http) { }

    create(providerRating: ProviderRatingLmp): Observable<ProviderRatingLmp> {
        const copy = this.convert(providerRating);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(providerRating: ProviderRatingLmp): Observable<ProviderRatingLmp> {
        const copy = this.convert(providerRating);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ProviderRatingLmp> {
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
     * Convert a returned JSON object to ProviderRatingLmp.
     */
    private convertItemFromServer(json: any): ProviderRatingLmp {
        const entity: ProviderRatingLmp = Object.assign(new ProviderRatingLmp(), json);
        return entity;
    }

    /**
     * Convert a ProviderRatingLmp to a JSON which can be sent to the server.
     */
    private convert(providerRating: ProviderRatingLmp): ProviderRatingLmp {
        const copy: ProviderRatingLmp = Object.assign({}, providerRating);
        return copy;
    }
}
