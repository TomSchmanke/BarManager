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

import { Order } from '../models/order';
import { OrderCreationRequest } from '../models/order-creation-request';
import { OrderCreationResponse } from '../models/order-creation-response';

@Injectable({
  providedIn: 'root',
})
export class OrdersService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getOrders
   */
  static readonly GetOrdersPath = '/bars/{bar-id}/orders';

  /**
   * get orders from a bar.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOrders()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrders$Response(params: {

    /**
     * Unique id to identify bar
     */
    'bar-id': string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<Order>>> {

    const rb = new RequestBuilder(this.rootUrl, OrdersService.GetOrdersPath, 'get');
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
        return r as StrictHttpResponse<Array<Order>>;
      })
    );
  }

  /**
   * get orders from a bar.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getOrders$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrders(params: {

    /**
     * Unique id to identify bar
     */
    'bar-id': string;
  },
  context?: HttpContext

): Observable<Array<Order>> {

    return this.getOrders$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<Order>>) => r.body as Array<Order>)
    );
  }

  /**
   * Path part for operation deleteOrder
   */
  static readonly DeleteOrderPath = '/bars/{bar-id}/orders/{order-id}';

  /**
   * delete Order from a bar.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteOrder()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteOrder$Response(params: {

    /**
     * Unique id to identify bar
     */
    'bar-id': string;
    'order-id': string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, OrdersService.DeleteOrderPath, 'delete');
    if (params) {
      rb.path('bar-id', params['bar-id'], {});
      rb.path('order-id', params['order-id'], {});
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
   * delete Order from a bar.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteOrder$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteOrder(params: {

    /**
     * Unique id to identify bar
     */
    'bar-id': string;
    'order-id': string;
  },
  context?: HttpContext

): Observable<void> {

    return this.deleteOrder$Response(params,context).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
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

    const rb = new RequestBuilder(this.rootUrl, OrdersService.PostOrderPath, 'post');
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

}
