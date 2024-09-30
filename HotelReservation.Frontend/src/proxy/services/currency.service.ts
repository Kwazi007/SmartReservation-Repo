import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ReservationDto } from '../entity-dtos/reservation-dto';
import { ServiceResponse } from '../entity-dtos/service-response';
import { CurrencyDto } from '../entity-dtos/currency-dto';

const headers: HttpHeaders = new HttpHeaders()
  .set('Content-Type', 'application/json, charset=utf-8');

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  baseUrl = environment;

  //date = format(new Date(), 'yyyy-MM-dd');

  dateModel = {
    date: new Date()

  }

  constructor(private http: HttpClient) { }

  create(itemDto: any) {
    console.log(itemDto)
    var body = JSON.stringify(itemDto);
    console.log(body)
    return this.http.post<any>(`${this.baseUrl}/createCurrency`, body, { headers });
  }

  update(itemDto: any) {
    console.log(itemDto)
    var body = JSON.stringify(itemDto);
    console.log(body)
    return this.http.put<any>(`${this.baseUrl}/updateCurrency`, body, { headers });
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.baseUrl}/deleteCurrency/${id}`);
  }

  get(id: number) {
    return this.http.get<any>(`${this.baseUrl}/getCurrency/${id}`);
  }

  getAllList() {
    return this.http.get<ServiceResponse<CurrencyDto[]>>(`${this.baseUrl}/getAllCurrencies`);
  }
}
