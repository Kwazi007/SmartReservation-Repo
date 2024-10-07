package com.chiwa.hotelreservationsystem.Repo;

import com.chiwa.hotelreservationsystem.Model.ReservationProducts;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationProductRepo extends JpaRepository<ReservationProducts, Integer> {
}
