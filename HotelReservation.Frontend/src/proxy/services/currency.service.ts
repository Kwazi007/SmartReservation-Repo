import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ReservationDto } from '../entity-dtos/reservation-dto';
import { ServiceResponse } from '../entity-dtos/service-response';
import { CurrencyDto } from '../entity-dtos/currency-dto';


  const headers: HttpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  baseUrl = "http://localhost:8080";

  //date = format(new Date(), 'yyyy-MM-dd');

  dateModel = {
    date: new Date()

  }

  constructor(private http: HttpClient) { }

  create(itemDto: any) {
    var body = JSON.stringify(itemDto);
    console.log(body)
    return this.http.post<CurrencyDto>(`${this.baseUrl}/currency`, body, { headers });
  }

  update(itemDto: any) {
    console.log(itemDto)
    var body = JSON.stringify(itemDto);
    console.log(body)
    return this.http.put<any>(`${this.baseUrl}/currency`, body, { headers });
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.baseUrl}/currency/${id}`);
  }

  get(id: number) {
    return this.http.get<any>(`${this.baseUrl}/currency/${id}`);
  }

  getAllList() {
    return this.http.get<CurrencyDto[]>(`${this.baseUrl}/currencies`);
  }
}
