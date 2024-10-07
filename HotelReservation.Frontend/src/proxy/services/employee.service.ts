import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ServiceResponse } from '../entity-dtos/service-response';
import { EmployeeDto } from '../entity-dtos/employee-dto';

const headers: HttpHeaders = new HttpHeaders()
.set('Content-Type', 'application/json')
.set('Accept', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

baseUrl = "http://localhost:8080";
  //date = format(new Date(), 'yyyy-MM-dd');

  dateModel = {
    date: new Date()

  }

  constructor(private http: HttpClient) { }

  create(itemDto: any) {
    console.log(itemDto)
    var body = JSON.stringify(itemDto);
    console.log(body)
    return this.http.post<any>(`${this.baseUrl}/employee`, body, { headers });
  }

  update(itemDto: any) {
    console.log(itemDto)
    var body = JSON.stringify(itemDto);
    console.log(body)
    return this.http.put<any>(`${this.baseUrl}/employee`, body, { headers });
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.baseUrl}/employee/${id}`);
  }

  get(id: number) {
    return this.http.get<any>(`${this.baseUrl}/employee/${id}`);
  }

  getAllList() {
    return this.http.get<EmployeeDto[]>(`${this.baseUrl}/employees`);
  }
}
