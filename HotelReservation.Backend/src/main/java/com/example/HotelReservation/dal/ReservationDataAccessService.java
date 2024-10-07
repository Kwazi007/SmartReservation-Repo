package com.example.HotelReservation.dal;

import com.example.HotelReservation.model.Reservation;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class ReservationService implements ReservationDao {
    //private static List<Reservation> DB = new ArrayList<>();
    private static List<Reservation> reservations = new ArrayList<Reservation>();

    @Override
    public int insertReservation(UUID id, Reservation reservation) {
        reservations.add(new Reservation(id, reservation.getName(), reservation.getSurname(), reservation.getAddress(), reservation.getCountry(), reservation.getPhone(), reservation.getEmail(), reservation.getIdNo(), reservation.getAdultPax(), reservation.getChildPax(), reservation.getTotalAmount(), reservation.getCheckInDate(), reservation.getCheckOutDate()));
        return 1;
    }
}
