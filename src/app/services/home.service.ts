import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {URL} from '../config'

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(public http: HttpClient) { }

  logout(){
     const token = localStorage.getItem('itcast-jwt');
    //  return  this.http.delete(`${URL}/auth/local/`,{
    //     headers:{
    //       Authorization: `Bearer ${token}`
    //     }
    //  })
    return  this.http.delete(`${URL}/auth/local/`)
  }
}
