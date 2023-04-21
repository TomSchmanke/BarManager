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

import { IngredientGroup } from '../models/ingredient-group';
import { UnitOfMeasurement } from '../models/unit-of-measurement';

@Injectable({
  providedIn: 'root',
})
export class IngredientGroupsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getIngredientGroups
   */
  static readonly GetIngredientGroupsPath = '/bar/{bar-id}/ingredient-groups';

  /**
   * Get all ingredient-groups of a specific bar.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getIngredientGroups()` instead.
   *
   * This method doesn't expect any request body.
   */
  getIngredientGroups$Response(params: {

    /**
     * Unique id to identify bar
     */
    'bar-id': number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<IngredientGroup>>> {

    const rb = new RequestBuilder(this.rootUrl, IngredientGroupsService.GetIngredientGroupsPath, 'get');
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
        return r as StrictHttpResponse<Array<IngredientGroup>>;
      })
    );
  }

  /**
   * Get all ingredient-groups of a specific bar.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getIngredientGroups$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getIngredientGroups(params: {

    /**
     * Unique id to identify bar
     */
    'bar-id': number;
  },
  context?: HttpContext

): Observable<Array<IngredientGroup>> {

    return this.getIngredientGroups$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<IngredientGroup>>) => r.body as Array<IngredientGroup>)
    );
  }

  /**
   * Path part for operation getIngredientGroup
   */
  static readonly GetIngredientGroupPath = '/bar/{bar-id}/ingredient-groups/{ingredient-group-id}';

  /**
   * Get a specific ingredient-group of a specific bar.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getIngredientGroup()` instead.
   *
   * This method doesn't expect any request body.
   */
  getIngredientGroup$Response(params: {

    /**
     * Unique id to identify bar
     */
    'bar-id': number;

    /**
     * Unique id to identify the ingredient
     */
    'ingredient-group-id': number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<IngredientGroup>> {

    const rb = new RequestBuilder(this.rootUrl, IngredientGroupsService.GetIngredientGroupPath, 'get');
    if (params) {
      rb.path('bar-id', params['bar-id'], {});
      rb.path('ingredient-group-id', params['ingredient-group-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<IngredientGroup>;
      })
    );
  }

  /**
   * Get a specific ingredient-group of a specific bar.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getIngredientGroup$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getIngredientGroup(params: {

    /**
     * Unique id to identify bar
     */
    'bar-id': number;

    /**
     * Unique id to identify the ingredient
     */
    'ingredient-group-id': number;
  },
  context?: HttpContext

): Observable<IngredientGroup> {

    return this.getIngredientGroup$Response(params,context).pipe(
      map((r: StrictHttpResponse<IngredientGroup>) => r.body as IngredientGroup)
    );
  }

  /**
   * Path part for operation putIngredientGroup
   */
  static readonly PutIngredientGroupPath = '/bar/{bar-id}/ingredient-groups/{ingredient-group-id}';

  /**
   * Update ingredient-group of a specific bar.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `putIngredientGroup()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putIngredientGroup$Response(params: {

    /**
     * Unique id to identify bar
     */
    'bar-id': number;

    /**
     * Unique id to identify the ingredient
     */
    'ingredient-group-id': number;

    /**
     * bar body
     */
    body: {
'name'?: string;
'unitOfMeasurement'?: UnitOfMeasurement;
}
  },
  context?: HttpContext

): Observable<StrictHttpResponse<IngredientGroup>> {

    const rb = new RequestBuilder(this.rootUrl, IngredientGroupsService.PutIngredientGroupPath, 'put');
    if (params) {
      rb.path('bar-id', params['bar-id'], {});
      rb.path('ingredient-group-id', params['ingredient-group-id'], {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<IngredientGroup>;
      })
    );
  }

  /**
   * Update ingredient-group of a specific bar.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `putIngredientGroup$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putIngredientGroup(params: {

    /**
     * Unique id to identify bar
     */
    'bar-id': number;

    /**
     * Unique id to identify the ingredient
     */
    'ingredient-group-id': number;

    /**
     * bar body
     */
    body: {
'name'?: string;
'unitOfMeasurement'?: UnitOfMeasurement;
}
  },
  context?: HttpContext

): Observable<IngredientGroup> {

    return this.putIngredientGroup$Response(params,context).pipe(
      map((r: StrictHttpResponse<IngredientGroup>) => r.body as IngredientGroup)
    );
  }

  /**
   * Path part for operation deleteIngredientGroup
   */
  static readonly DeleteIngredientGroupPath = '/bar/{bar-id}/ingredient-groups/{ingredient-group-id}';

  /**
   * delete ingredient-group of a specific bar.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteIngredientGroup()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteIngredientGroup$Response(params: {

    /**
     * Unique id to identify bar
     */
    'bar-id': number;

    /**
     * Unique id to identify the ingredientGroup
     */
    'ingredient-group-id': number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, IngredientGroupsService.DeleteIngredientGroupPath, 'delete');
    if (params) {
      rb.path('bar-id', params['bar-id'], {});
      rb.path('ingredient-group-id', params['ingredient-group-id'], {});
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
   * delete ingredient-group of a specific bar.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteIngredientGroup$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteIngredientGroup(params: {

    /**
     * Unique id to identify bar
     */
    'bar-id': number;

    /**
     * Unique id to identify the ingredientGroup
     */
    'ingredient-group-id': number;
  },
  context?: HttpContext

): Observable<void> {

    return this.deleteIngredientGroup$Response(params,context).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation postIngredientGroup
   */
  static readonly PostIngredientGroupPath = '/bar/{bar-id}/ingredient-groups/ingredient-group';

  /**
   * add ingredient-group to a specific bar.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postIngredientGroup()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postIngredientGroup$Response(params: {

    /**
     * Unique id to identify bar
     */
    'bar-id': number;

    /**
     * ingredient-group body
     */
    body: {
'name'?: string;
'unitOfMeasurement'?: IngredientGroup;
}
  },
  context?: HttpContext

): Observable<StrictHttpResponse<IngredientGroup>> {

    const rb = new RequestBuilder(this.rootUrl, IngredientGroupsService.PostIngredientGroupPath, 'post');
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
        return r as StrictHttpResponse<IngredientGroup>;
      })
    );
  }

  /**
   * add ingredient-group to a specific bar.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `postIngredientGroup$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postIngredientGroup(params: {

    /**
     * Unique id to identify bar
     */
    'bar-id': number;

    /**
     * ingredient-group body
     */
    body: {
'name'?: string;
'unitOfMeasurement'?: IngredientGroup;
}
  },
  context?: HttpContext

): Observable<IngredientGroup> {

    return this.postIngredientGroup$Response(params,context).pipe(
      map((r: StrictHttpResponse<IngredientGroup>) => r.body as IngredientGroup)
    );
  }

}
