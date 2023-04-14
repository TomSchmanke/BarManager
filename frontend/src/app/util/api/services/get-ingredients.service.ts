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

import { IngredientsResponse } from '../models/ingredients-response';

@Injectable({
  providedIn: 'root',
})
export class GetIngredientsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getIngredients
   */
  static readonly GetIngredientsPath = '/ingredients';

  /**
   * Get all ingredients.
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
    bar_id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<IngredientsResponse>> {

    const rb = new RequestBuilder(this.rootUrl, GetIngredientsService.GetIngredientsPath, 'get');
    if (params) {
      rb.query('bar_id', params.bar_id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<IngredientsResponse>;
      })
    );
  }

  /**
   * Get all ingredients.
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
    bar_id: number;
  },
  context?: HttpContext

): Observable<IngredientsResponse> {

    return this.getIngredients$Response(params,context).pipe(
      map((r: StrictHttpResponse<IngredientsResponse>) => r.body as IngredientsResponse)
    );
  }

}
