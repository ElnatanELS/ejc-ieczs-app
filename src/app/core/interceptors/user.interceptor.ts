import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class userInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const newHeaders = new HttpHeaders()
    .append("user-data","1")
    .append("id-system","6");

    let clone = request.clone( {  headers: newHeaders } );
    return next.handle(clone);
  }
}
