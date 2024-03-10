import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../../environments/environment.prod';

@Injectable()
export class AjaxInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes(environment.appApiBaseUrl)) {
      request = request.clone({
        setHeaders: {
          'X-Requested-With': 'XMLHttpRequest',
        }
      });
    }

    return next.handle(request);
  }
}
