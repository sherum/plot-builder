import {HttpContextToken, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";


export const DP1 = new HttpContextToken(() => "Rear Entry");

@Injectable({
    providedIn: 'root'
})
export class HeadersInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let meta1 = req.context.get(DP1);
        if (meta1 === "Missionary") {
            console.log("Puritan");
        }
        const modifiedReq = req.clone();
        return next.handle(modifiedReq);

    }


};
