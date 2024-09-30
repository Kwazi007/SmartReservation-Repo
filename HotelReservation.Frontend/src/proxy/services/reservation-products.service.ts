import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReservationDto } from '../entity-dtos/reservation-dto';
import { ServiceResponse } from '../entity-dtos/service-response';
import { environment } from 'src/environments/environment';
import { ReservationProductDto } from '../entity-dtos/reservation-product-dto';

@Injectable({
  providedIn: 'root'
})
export class ReservationProductsService {

  baseUrl = environment;

  //date = format(new Date(), 'yyyy-MM-dd');

  dateModel = {
    date: new Date()

  }

  constructor(private http: HttpClient) { }

  getAllList() {
    return this.http.get<ServiceResponse<ReservationProductDto[]>>(`${this.baseUrl}/getAllReservationProducts`);
  }
}
