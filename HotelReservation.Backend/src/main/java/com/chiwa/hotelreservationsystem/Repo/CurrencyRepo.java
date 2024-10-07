package com.chiwa.hotelreservationsystem.Repo;

import com.chiwa.hotelreservationsystem.Model.Currency;
import com.chiwa.hotelreservationsystem.Model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CurrencyRepo extends JpaRepository<Currency, Integer> {
}
