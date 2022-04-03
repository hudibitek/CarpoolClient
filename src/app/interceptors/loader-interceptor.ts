import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { LoaderService } from 'services/app/http-loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.headers.get('x-koer-hide-loading-bar')) {
      return next.handle(request);
    } else {
      this.loaderService.isLoading.next(true);
      return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.stopRequest();
        }
      },
        () => {
          this.stopRequest();
        }));
    }
  }

  private stopRequest(): void {
    this.loaderService.isLoading.next(false);
  }
}
