import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ServiceResponse } from '../entity-dtos/service-response';
import { RoomDto } from '../entity-dtos/room-dto';

const headers: HttpHeaders = new HttpHeaders()
.set('Content-Type', 'application/json')
.set('Accept', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class RoomService {

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
    return this.http.post<any>(`${this.baseUrl}/room`, body, { headers });
  }

  update(itemDto: any) {
    console.log(itemDto)
    var body = JSON.stringify(itemDto);
    console.log(body)
    return this.http.put<any>(`${this.baseUrl}/room`, body, { headers });
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.baseUrl}/room/${id}`);
  }

  get(id: number) {
    return this.http.get<any>(`${this.baseUrl}/room/${id}`);
  }

  getAllList() {
    return this.http.get<RoomDto[]>(`${this.baseUrl}/rooms`);
  }
}
