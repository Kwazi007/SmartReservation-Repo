package com.chiwa.hotelreservationsystem.Service;

import com.chiwa.hotelreservationsystem.Model.Room;
import com.chiwa.hotelreservationsystem.Repo.RoomRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService implements IRoomService {

    @Autowired
    public RoomRepo roomRepo;

    @Override
    public Room getRoom(int id) {
        return roomRepo.findById(id).get();
    }

    @Override
    public List<Room> getRooms() {
        return roomRepo.findAll();
    }

    @Override
    public Room createRoom(Room room) {
        roomRepo.save(room);
        return room;
    }

    @Override
    public Room updateRoom(Room room) {
        roomRepo.save(room);
        return room;
    }

    @Override
    public String deleteRoom(int id) {
        roomRepo.deleteById(id);
        return "Room with id " + id + " deleted";
    }
}
