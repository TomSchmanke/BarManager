/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Cocktail } from '../models/cocktail';
import { OrderCreationRequest } from '../models/order-creation-request';
import { OrderCreationResponse } from '../models/order-creation-response';

@Injectable({
  providedIn: 'root',
})
export class DashboardService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getCocktails
   */
  static readonly GetCocktailsPath = '/bars/{bar-id}/cocktails';

  /**
   * get cocktails of specific bar.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCocktails()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCocktails$Response(params: {
    checkAvailability?: boolean;

    /**
     * Unique id to identify bar
     */
    'bar-id': string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<Cocktail>>> {

    const rb = new RequestBuilder(this.rootUrl, DashboardService.GetCocktailsPath, 'get');
    if (params) {
      rb.query('checkAvailability', params.checkAvailability, {});
      rb.path('bar-id', params['bar-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Cocktail>>;
      })
    );
  }

  /**
   * get cocktails of specific bar.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCocktails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCocktails(params: {
    checkAvailability?: boolean;

    /**
     * Unique id to identify bar
     */
    'bar-id': string;
  },
  context?: HttpContext

): Observable<Array<Cocktail>> {

    return this.getCocktails$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<Cocktail>>) => r.body as Array<Cocktail>)
    );
  }

  /**
   * Path part for operation postOrder
   */
  static readonly PostOrderPath = '/bars/{bar-id}/orders/order';

  /**
   * Add Order to orders of a bar.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postOrder()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postOrder$Response(params: {

    /**
     * Unique id to identify bar
     */
    'bar-id': string;

    /**
     * order request body
     */
    body: OrderCreationRequest
  },
  context?: HttpContext

): Observable<StrictHttpResponse<OrderCreationResponse>> {

    const rb = new RequestBuilder(this.rootUrl, DashboardService.PostOrderPath, 'post');
    if (params) {
      rb.path('bar-id', params['bar-id'], {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<OrderCreationResponse>;
      })
    );
  }

  /**
   * Add Order to orders of a bar.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `postOrder$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postOrder(params: {

    /**
     * Unique id to identify bar
     */
    'bar-id': string;

    /**
     * order request body
     */
    body: OrderCreationRequest
  },
  context?: HttpContext

): Observable<OrderCreationResponse> {

    return this.postOrder$Response(params,context).pipe(
      map((r: StrictHttpResponse<OrderCreationResponse>) => r.body as OrderCreationResponse)
    );
  }

  /**
   * Path part for operation getCocktail
   */
  static readonly GetCocktailPath = '/bars/{bar-id}/cocktails/{cocktail-id}';

  /**
   * get cocktail and its cocktail from a specific bar.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCocktail()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCocktail$Response(params: {

    /**
     * Unique id to identify bar
     */
    'bar-id': string;

    /**
     * Unique id to identify bar
     */
    'cocktail-id': string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Cocktail>> {

    const rb = new RequestBuilder(this.rootUrl, DashboardService.GetCocktailPath, 'get');
    if (params) {
      rb.path('bar-id', params['bar-id'], {});
      rb.path('cocktail-id', params['cocktail-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Cocktail>;
      })
    );
  }

  /**
   * get cocktail and its cocktail from a specific bar.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCocktail$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCocktail(params: {

    /**
     * Unique id to identify bar
     */
    'bar-id': string;

    /**
     * Unique id to identify bar
     */
    'cocktail-id': string;
  },
  context?: HttpContext

): Observable<Cocktail> {

    return this.getCocktail$Response(params,context).pipe(
      map((r: StrictHttpResponse<Cocktail>) => r.body as Cocktail)
    );
  }

}
