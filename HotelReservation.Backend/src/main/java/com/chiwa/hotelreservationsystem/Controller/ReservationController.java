package com.chiwa.hotelreservationsystem.Controller;

import com.chiwa.hotelreservationsystem.Model.Reservation;
import com.chiwa.hotelreservationsystem.Service.IReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReservationController {

    @Autowired
    private IReservationService reservationService;

    @GetMapping(value = "/reservation/{id}")
    public Reservation getReservation(@PathVariable int id) {
        return reservationService.getReservation(id);
    }

    @GetMapping(value = "/reservations")
    public List<Reservation> getReservations() {
        return reservationService.getReservations();
    }

    @PostMapping(value = "/reservation")
    public Reservation createReservation(@RequestBody Reservation reservation) {
        return reservationService.createReservation(reservation);
    }

    @PutMapping(value = "/reservation")
    public Reservation updateReservation(@RequestBody Reservation reservation) {
        return reservationService.updateReservation(reservation);
    }

    @DeleteMapping(value = "/reservation/{id}")
    public String deleteReservation(@PathVariable int id) {
        return reservationService.deleteReservation(id);
    }
}
