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

import { Ingredient } from '../models/ingredient';
import { OrderCreationResponse } from '../models/order-creation-response';

@Injectable({
  providedIn: 'root',
})
export class IngredientsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getIngredients
   */
  static readonly GetIngredientsPath = '/bar/{bar-id}/ingredients';

  /**
   * Get all ingredients of a specific bar.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getIngredients()` instead.
   *
   * This method doesn't expect any request body.
   */
  getIngredients$Response(params: {

    /**
     * Unique id to identify bar
     */
    'bar-id': number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<Ingredient>>> {

    const rb = new RequestBuilder(this.rootUrl, IngredientsService.GetIngredientsPath, 'get');
    if (params) {
      rb.path('bar-id', params['bar-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Ingredient>>;
      })
    );
  }

  /**
   * Get all ingredients of a specific bar.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getIngredients$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getIngredients(params: {

    /**
     * Unique id to identify bar
     */
    'bar-id': number;
  },
  context?: HttpContext

): Observable<Array<Ingredient>> {

    return this.getIngredients$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<Ingredient>>) => r.body as Array<Ingredient>)
    );
  }

  /**
   * Path part for operation putIngredient
   */
  static readonly PutIngredientPath = '/bar/{bar-id}/ingredients/{ingredient-id}';

  /**
   * Update ingredient of a specific bar.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `putIngredient()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putIngredient$Response(params: {

    /**
     * Unique id to identify bar
     */
    'bar-id': number;

    /**
     * Unique id to identify the ingredient
     */
    'ingredient-id': number;

    /**
     * bar body
     */
    body: Ingredient
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Ingredient>> {

    const rb = new RequestBuilder(this.rootUrl, IngredientsService.PutIngredientPath, 'put');
    if (params) {
      rb.path('bar-id', params['bar-id'], {});
      rb.path('ingredient-id', params['ingredient-id'], {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Ingredient>;
      })
    );
  }

  /**
   * Update ingredient of a specific bar.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `putIngredient$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putIngredient(params: {

    /**
     * Unique id to identify bar
     */
    'bar-id': number;

    /**
     * Unique id to identify the ingredient
     */
    'ingredient-id': number;

    /**
     * bar body
     */
    body: Ingredient
  },
  context?: HttpContext

): Observable<Ingredient> {

    return this.putIngredient$Response(params,context).pipe(
      map((r: StrictHttpResponse<Ingredient>) => r.body as Ingredient)
    );
  }

  /**
   * Path part for operation deleteIngredient
   */
  static readonly DeleteIngredientPath = '/bar/{bar-id}/ingredients/{ingredient-id}';

  /**
   * delete ingredient of a specific bar.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteIngredient()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteIngredient$Response(params: {

    /**
     * Unique id to identify bar
     */
    'bar-id': number;

    /**
     * Unique id to identify the ingredient
     */
    'ingredient-id': number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, IngredientsService.DeleteIngredientPath, 'delete');
    if (params) {
      rb.path('bar-id', params['bar-id'], {});
      rb.path('ingredient-id', params['ingredient-id'], {});
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
   * delete ingredient of a specific bar.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteIngredient$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteIngredient(params: {

    /**
     * Unique id to identify bar
     */
    'bar-id': number;

    /**
     * Unique id to identify the ingredient
     */
    'ingredient-id': number;
  },
  context?: HttpContext

): Observable<void> {

    return this.deleteIngredient$Response(params,context).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postIngredient
   */
  static readonly PostIngredientPath = '/bar/{bar-id}/ingredient-groups/ingredient';

  /**
   * add ingrdient to a specific bar.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postIngredient()` instead.
   *
   * This method doesn't expect any request body.
   */
  postIngredient$Response(params: {

    /**
     * Unique id to identify bar
     */
    'bar-id': number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<OrderCreationResponse>> {

    const rb = new RequestBuilder(this.rootUrl, IngredientsService.PostIngredientPath, 'post');
    if (params) {
      rb.path('bar-id', params['bar-id'], {});
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
   * add ingrdient to a specific bar.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `postIngredient$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  postIngredient(params: {

    /**
     * Unique id to identify bar
     */
    'bar-id': number;
  },
  context?: HttpContext

): Observable<OrderCreationResponse> {

    return this.postIngredient$Response(params,context).pipe(
      map((r: StrictHttpResponse<OrderCreationResponse>) => r.body as OrderCreationResponse)
    );
  }

}