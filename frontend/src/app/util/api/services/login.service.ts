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

import { BarCreationRequest } from '../models/bar-creation-request';
import { BarCreationResponse } from '../models/bar-creation-response';
import { LoginResponse } from '../models/login-response';

@Injectable({
  providedIn: 'root',
})
export class LoginService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation login
   */
  static readonly LoginPath = '/login/{bar-code}';

  /**
   * login to existing bar.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `login()` instead.
   *
   * This method doesn't expect any request body.
   */
  login$Response(params: {

    /**
     * Unique Code to identify the bar
     */
    'bar-code': string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<LoginResponse>> {

    const rb = new RequestBuilder(this.rootUrl, LoginService.LoginPath, 'get');
    if (params) {
      rb.path('bar-code', params['bar-code'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LoginResponse>;
      })
    );
  }

  /**
   * login to existing bar.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `login$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  login(params: {

    /**
     * Unique Code to identify the bar
     */
    'bar-code': string;
  },
  context?: HttpContext

): Observable<LoginResponse> {

    return this.login$Response(params,context).pipe(
      map((r: StrictHttpResponse<LoginResponse>) => r.body as LoginResponse)
    );
  }

  /**
   * Path part for operation postBar
   */
  static readonly PostBarPath = '/bars/bar';

  /**
   * login.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postBar()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postBar$Response(params: {

    /**
     * bar body
     */
    body: BarCreationRequest
  },
  context?: HttpContext

): Observable<StrictHttpResponse<BarCreationResponse>> {

    const rb = new RequestBuilder(this.rootUrl, LoginService.PostBarPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BarCreationResponse>;
      })
    );
  }

  /**
   * login.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `postBar$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postBar(params: {

    /**
     * bar body
     */
    body: BarCreationRequest
  },
  context?: HttpContext

): Observable<BarCreationResponse> {

    return this.postBar$Response(params,context).pipe(
      map((r: StrictHttpResponse<BarCreationResponse>) => r.body as BarCreationResponse)
    );
  }

}
