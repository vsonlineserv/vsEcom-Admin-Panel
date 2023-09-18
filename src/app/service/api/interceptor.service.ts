import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = JSON.parse(localStorage.getItem("vsonlineuserToken"));
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + token.access_token)
      });
      return next.handle(cloned).pipe(tap(() => { },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 401) {
              localStorage.setItem('FlagAuthenticated', 'false');
              this.router.navigate(['/login']);
              return;
            }
            if (err.status == 503) {
              localStorage.setItem('FlagAuthenticated', 'false');
              this.router.navigate(['/serviceunavailable']);
              return;
            }
          }
        }));
    }
    else {
      return next.handle(req);
    }
  }

}
