package com.chiwa.hotelreservationsystem.Service;

import com.chiwa.hotelreservationsystem.Model.Reservation;
import com.chiwa.hotelreservationsystem.Repo.ReservationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationService implements IReservationService {

    @Autowired
    private ReservationRepo reservationRepo;

    @Override
    public Reservation getReservation(int id) {
        return reservationRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));
    }

    @Override
    public List<Reservation> getReservations() {
        return reservationRepo.findAll();
    }

    @Override
    public Reservation createReservation(Reservation reservation) {
        reservationRepo.save(reservation);
        return reservation;
    }

    @Override
    public Reservation updateReservation(Reservation reservation) {
        //Student currentStudent = studentRepo.findById(student.getId()).get();
        reservationRepo.save(reservation);
        return reservation;
    }

    @Override
    public String deleteReservation(int id) {
        reservationRepo.deleteById(id);
        return "Reservation Has Been Deleted";
    }
}
