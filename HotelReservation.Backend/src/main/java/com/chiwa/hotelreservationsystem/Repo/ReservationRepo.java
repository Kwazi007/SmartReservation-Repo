package com.chiwa.hotelreservationsystem.Repo;

import com.chiwa.hotelreservationsystem.Model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepo extends JpaRepository<Reservation, Integer> {
}
