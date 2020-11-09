import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../services/authService/auth.service';

export class RequestInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('accessToken');
    console.log('intercept', accessToken);
    if (accessToken) {
      req = req.clone({
        setHeaders: {
          Authorization: accessToken
        }
      });
      return next.handle(req);
    }
    return next.handle(req);
  }

}
