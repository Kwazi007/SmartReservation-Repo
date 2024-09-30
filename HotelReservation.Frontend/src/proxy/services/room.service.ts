import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ServiceResponse } from '../entity-dtos/service-response';
import { RoomDto } from '../entity-dtos/room-dto';

const headers: HttpHeaders = new HttpHeaders()
  .set('Content-Type', 'application/json, charset=utf-8');

@Injectable({
  providedIn: 'root'
})
export class RoomService {

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
    return this.http.post<any>(`${this.baseUrl}/createRoom`, body, { headers });
  }

  update(itemDto: any) {
    console.log(itemDto)
    var body = JSON.stringify(itemDto);
    console.log(body)
    return this.http.put<any>(`${this.baseUrl}/updateRoom`, body, { headers });
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.baseUrl}/deleteRoom/${id}`);
  }

  get(id: number) {
    return this.http.get<any>(`${this.baseUrl}/getRoom/${id}`);
  }

  getAllList() {
    return this.http.get<ServiceResponse<RoomDto[]>>(`${this.baseUrl}/getAllRooms`);
  }
}
