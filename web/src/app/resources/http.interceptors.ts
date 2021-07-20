import { RequestStatus } from 'src/app/resources/enums/request-status';
import { AuthService } from 'src/app/auth/auth.service';
import { TOKEN_KEY } from './../auth/token-storage.service';
import { SnackService } from '../components/boss-snack/snack.service';
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})

export class InterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService, private snackService: SnackService) { }

  getAuthentication(): string {
    return localStorage.getItem(TOKEN_KEY)!;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (typeof (this.getAuthentication()) == 'string') {
      if (req.headers.get("skip")) {
        req = req.clone({
          headers: req.headers.delete('skip')
        });
        return next.handle(req);
      }
      else {
        req = req.clone({
          setHeaders: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.getAuthentication()
          }
        });
      }
    }

    return next.handle(req).pipe(tap((response) => {
      if (response instanceof HttpResponse) {
        // Se no projeto há tratamento genérico para sucesso* Não aconselhado
      }
    },
      (response: any) => {
        if (response instanceof HttpErrorResponse) {
          if (response.status == 401 || 403) {
            // Se no projeto há tratamento genérico
            this.authService.logout();
            this.snackService.openSnackBar('Deslogado por não possuir permissão!', RequestStatus.Error);
          }
          else if (response.status == 403) {
            //Se no projeto há tratamento genérico
          }
          else if (response.status == 404) {
            this.snackService.openSnackBar('O servidor não respondeu. Tente novamente mais tarde', 'Error');
          }
          else if (response.status == 409) {
            this.snackService.openSnackBar('Um conflito ocorreu', 'Warning');
          }
          else if (response.status == 500) {
            this.snackService.openSnackBar('O servidor não respondeu. Tente novamente mais tarde', 'Error');
          }
          else if (response.status == 502) {
            this.snackService.openSnackBar('O servidor não respondeu. Tente novamente mais tarde', 'Error');
          }
          else if (response.status == 503) {
            this.snackService.openSnackBar('O servidor não respondeu. Tente novamente mais tarde', 'Error');
          }
        }
      }));
  }
}
