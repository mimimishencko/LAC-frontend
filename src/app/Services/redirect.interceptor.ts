import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponseBase} from "@angular/common/http";
import {Observable} from 'rxjs';
import {tap} from "rxjs/operators";

export class RedirectHttpInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(req);
        return next.handle(req).pipe(tap(event => {
            console.log(event);
            if (event instanceof HttpResponseBase) {
                const response = event as HttpResponseBase;
                console.log(response);
                const redirectURL = response.url;

                window.location.href = redirectURL;
                return;
            }
        }));
    }
}
