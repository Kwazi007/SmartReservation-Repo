package com.chiwa.hotelreservationsystem.Service;

import com.chiwa.hotelreservationsystem.Model.Reservation;

import java.util.List;

public interface IReservationService {
    public Reservation getReservation(int id);
    public List<Reservation> getReservations();
    public Reservation createReservation(Reservation reservation);
    public Reservation updateReservation(Reservation reservation);
    public String deleteReservation(int id);
}
