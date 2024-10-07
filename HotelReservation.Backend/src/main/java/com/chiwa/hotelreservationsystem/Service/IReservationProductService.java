package com.chiwa.hotelreservationsystem.Service;

import com.chiwa.hotelreservationsystem.Model.ReservationProducts;

import java.util.List;

public interface IReservationProductService {
    public ReservationProducts getReservationProduct(int id);
    public List<ReservationProducts> getReservationProducts();
    public ReservationProducts createReservationProduct(ReservationProducts reservationProducts);
    public ReservationProducts updateReservationProduct(ReservationProducts reservationProducts);
    public String deleteReservationProduct(int id);

}
