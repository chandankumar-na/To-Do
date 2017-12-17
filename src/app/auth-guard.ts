import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from "@angular/router";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { AppService } from "./services/app.service";
@Injectable()
export class AuthGuard implements CanActivate {

    public authstatus: boolean;
    constructor(private http: Http, private appService: AppService, private router: Router) {
        console.log("constructor()")
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
       if(this.appService.isAuthorized()) {
        return true;
       }else{
        this.router.navigateByUrl('/home');
        return false;
       }
      
    }
}