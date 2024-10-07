package com.chiwa.hotelreservationsystem.Service;

import com.chiwa.hotelreservationsystem.Model.Room;

import java.util.List;

public interface IRoomService {
    public Room getRoom(int id);
    public List<Room> getRooms();
    public Room createRoom(Room room);
    public Room updateRoom(Room room);
    public String deleteRoom(int id);
}
