import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import {LoginForm} from '../models/Login.type'
import { URL} from '../config'


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: HttpClient) { }

//http://localhost:1337/api/auth/local/register
//http://localhost:1337/api/auth/local/
  login(loginForm: LoginForm){
     return this.http.post(`${URL}/auth/local/`, loginForm, {
        // headers:{
        //   "No-Auth":'TRUE'
        // }
     })
  }
}
