import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Router} from '@angular/router'

@Injectable()
export class AuthInterceptors implements HttpInterceptor{

    constructor(private router: Router){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log('http interceptor', req.headers)
        
        //no need for auth for login
        if(req.url.endsWith("api/auth/local/")){
            return next.handle(req)
        } 
        // cross domain issue, need to add headers in server side
        // const head =req.headers.get("No-Auth")
        // if (head==='TRUE'){
        //     return next.handle(req)
        // }
        const token = localStorage.getItem('itcast-jwt');
        const authReq = req.clone({
           headers: req.headers.set('Authorization', `Bearer ${token}`)
        })
        return next.handle(authReq).pipe(
            tap(
                (ok)=>{},
                (error:any)=>{
                    console.log('catch an error', error)
                    if(error.status===401){
                        localStorage.removeItem('itcast-jwt');
                        this.router.navigate(['/login'])
                    }
                }
            )
        )
    }
}