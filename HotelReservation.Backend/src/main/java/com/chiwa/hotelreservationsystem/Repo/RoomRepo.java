package com.chiwa.hotelreservationsystem.Repo;

import com.chiwa.hotelreservationsystem.Model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepo extends JpaRepository<Room, Integer> {
}
