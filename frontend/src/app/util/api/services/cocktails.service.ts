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

@Injectable({
  providedIn: 'root',
})
export class CocktailsService extends BaseService {
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
    'check-if-available'?: boolean;

    /**
     * Unique id to identify bar
     */
    'bar-id': number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<Cocktail>>> {

    const rb = new RequestBuilder(this.rootUrl, CocktailsService.GetCocktailsPath, 'get');
    if (params) {
      rb.query('check-if-available', params['check-if-available'], {});
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
    'check-if-available'?: boolean;

    /**
     * Unique id to identify bar
     */
    'bar-id': number;
  },
  context?: HttpContext

): Observable<Array<Cocktail>> {

    return this.getCocktails$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<Cocktail>>) => r.body as Array<Cocktail>)
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
    'bar-id': number;

    /**
     * Unique id to identify bar
     */
    'cocktail-id': number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Cocktail>> {

    const rb = new RequestBuilder(this.rootUrl, CocktailsService.GetCocktailPath, 'get');
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
    'bar-id': number;

    /**
     * Unique id to identify bar
     */
    'cocktail-id': number;
  },
  context?: HttpContext

): Observable<Cocktail> {

    return this.getCocktail$Response(params,context).pipe(
      map((r: StrictHttpResponse<Cocktail>) => r.body as Cocktail)
    );
  }

  /**
   * Path part for operation putCocktail
   */
  static readonly PutCocktailPath = '/bars/{bar-id}/cocktails/{cocktail-id}';

  /**
   * Update a cocktail in a specific bar.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `putCocktail()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putCocktail$Response(params: {

    /**
     * Unique id to identify bar
     */
    'bar-id': number;

    /**
     * Unique id to identify bar
     */
    'cocktail-id': number;

    /**
     * cocktail body
     */
    body: Cocktail
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Cocktail>> {

    const rb = new RequestBuilder(this.rootUrl, CocktailsService.PutCocktailPath, 'put');
    if (params) {
      rb.path('bar-id', params['bar-id'], {});
      rb.path('cocktail-id', params['cocktail-id'], {});
      rb.body(params.body, 'application/json');
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
   * Update a cocktail in a specific bar.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `putCocktail$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putCocktail(params: {

    /**
     * Unique id to identify bar
     */
    'bar-id': number;

    /**
     * Unique id to identify bar
     */
    'cocktail-id': number;

    /**
     * cocktail body
     */
    body: Cocktail
  },
  context?: HttpContext

): Observable<Cocktail> {

    return this.putCocktail$Response(params,context).pipe(
      map((r: StrictHttpResponse<Cocktail>) => r.body as Cocktail)
    );
  }

  /**
   * Path part for operation deleteCocktail
   */
  static readonly DeleteCocktailPath = '/bars/{bar-id}/cocktails/{cocktail-id}';

  /**
   * Delete a Cocktail from a specific bar.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteCocktail()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  deleteCocktail$Response(params: {

    /**
     * Unique id to identify bar
     */
    'bar-id': number;

    /**
     * Unique id to identify bar
     */
    'cocktail-id': number;

    /**
     * cocktail body
     */
    body: Cocktail
  },
  context?: HttpContext

): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CocktailsService.DeleteCocktailPath, 'delete');
    if (params) {
      rb.path('bar-id', params['bar-id'], {});
      rb.path('cocktail-id', params['cocktail-id'], {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Delete a Cocktail from a specific bar.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteCocktail$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  deleteCocktail(params: {

    /**
     * Unique id to identify bar
     */
    'bar-id': number;

    /**
     * Unique id to identify bar
     */
    'cocktail-id': number;

    /**
     * cocktail body
     */
    body: Cocktail
  },
  context?: HttpContext

): Observable<void> {

    return this.deleteCocktail$Response(params,context).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postCocktail
   */
  static readonly PostCocktailPath = '/bars/{bar-id}/cocktails/cocktail';

  /**
   * Add a cocktail to a specific bar.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postCocktail()` instead.
   *
   * This method doesn't expect any request body.
   */
  postCocktail$Response(params: {

    /**
     * Unique id to identify bar
     */
    'bar-id': number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CocktailsService.PostCocktailPath, 'post');
    if (params) {
      rb.path('bar-id', params['bar-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Add a cocktail to a specific bar.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `postCocktail$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  postCocktail(params: {

    /**
     * Unique id to identify bar
     */
    'bar-id': number;
  },
  context?: HttpContext

): Observable<void> {

    return this.postCocktail$Response(params,context).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
