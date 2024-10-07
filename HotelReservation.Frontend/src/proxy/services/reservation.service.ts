import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { format } from 'date-fns';
import { ReservationDto } from '../entity-dtos/reservation-dto';
import { environment } from 'src/environments/environment';
import { ServiceResponse } from '../entity-dtos/service-response';

const headers: HttpHeaders = new HttpHeaders()
  .set('Content-Type', 'application/json, charset=utf-8');

@Injectable({
  providedIn: 'root'
})

export class ReservationService {

  baseUrl = "http://localhost:8080/api/v1";

  //date = format(new Date(), 'yyyy-MM-dd');

  dateModel = {
    date: new Date()

  }

  constructor(private http: HttpClient) { }

  createPayment(itemDto: any) {
    var body = JSON.stringify(itemDto);
    console.log(body)
    return this.http.post<any>(`${this.baseUrl}/createPayment`, body, { headers });
  }

  create(itemDto: any) {
    console.log(itemDto)
    var body = JSON.stringify(itemDto);
    console.log(body)
    return this.http.post<any>(`${this.baseUrl}/createBooking`, body, { headers });
  }

  update(itemDto: any) {
    console.log(itemDto)
    var body = JSON.stringify(itemDto);
    console.log(body)
    return this.http.put<any>(`${this.baseUrl}/updateBooking`, body, { headers });
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.baseUrl}/deleteBooking/${id}`);
  }

  get(id: number) {
    return this.http.get<any>(`${this.baseUrl}/getBooking/${id}`);
  }

  getAllList() {
    return this.http.get<ReservationDto[]>(`${this.baseUrl}/reservation`);
  }
}
