import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpInterceptorFn,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Observable,tap,of} from "rxjs";
import {HttpCacheService} from "./http-cache.service";
import {compareSegments} from "@angular/compiler-cli/src/ngtsc/sourcemaps/src/segment_marker";

@Injectable({
    providedIn: 'root'
})
export class CacheInterceptor implements HttpInterceptor{

    constructor(private cacheService:HttpCacheService) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let uri = req.url.split("/");
        let nuri = uri.length-2;
        let foo = uri.splice(nuri,2);
        let bar = foo.join("/");
        console.log("The joined:", bar)



        //pass along non GET requests blanket invalidate
        if(req.method !=='GET'){
            // this.cacheService.invalidateUrl(bar);
            this.cacheService.invalidateCache()
            return next.handle(req);
        }
        //attempt to retreive cached responses
        const cachedResponse = this.cacheService.get(req.url);
        if(cachedResponse){
            console.log(`Return cached repsonse: ${cachedResponse}`);
            console.log(cachedResponse);
            return of(cachedResponse);
        }

        //send request to server and add to cache
        return next.handle(req)
            .pipe(
                tap(event=> {
                    if (event instanceof HttpResponse){
                    console.log(`Adding item to cache: ${req.url}`);
                    this.cacheService.put(req.url,event);
                    }}
                ));
        }


};
