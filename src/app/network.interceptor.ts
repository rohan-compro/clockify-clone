import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderService.show();
    return next.handle(request).pipe(
      finalize(() => {
        this.loaderService.hide()
      })
    );
  }
}
