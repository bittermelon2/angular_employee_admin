import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import {URL} from '../config'
import { EmployeeWrapper } from '../models/EmployeeWrapper.type'
import { EmployeeResp } from '../models/EmployeeResp.type'
import { Employee } from '../models/Employee.type';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) { }

  fetchData(curPage: number, pageSize:number){
    //const jwt = localStorage.getItem('itcast-jwt')

    //http://localhost:1337/api/employees?pagination[page]=2&pagination[pageSize]=5
    const employeeUrl = `${URL}/employees?pagination[page]=${curPage}&pagination[pageSize]=${pageSize}`

    // return this.http.get<EmployeeWrapper[]>(employeeUrl, {
    //     headers: {
    //       Authorization: `Bearer ${jwt}`
    //     }
    // })
    return this.http.get<EmployeeWrapper[]>(employeeUrl)
  }

  delEmployee(id:number){
     //const jwt = localStorage.getItem('itcast-jwt')

     return this.http.delete(`${URL}/employees/${id}`)
  }

  addEmployee(emp: Employee){
    return this.http.post(`${URL}/employees`, {data: emp})
  }
  
  updateEmployee(emp: Employee, id: number){
    return this.http.put(`${URL}/employees/${id}`, {data: emp})
  }

   getEmployeeById<EmployeeResp>(id: number){
     return this.http.get(`${URL}/employees/${id}`)
   }
}
