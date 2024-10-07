package com.chiwa.hotelreservationsystem.Controller;

import com.chiwa.hotelreservationsystem.Model.Room;
import com.chiwa.hotelreservationsystem.Service.IRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RoomController {

    @Autowired
    private IRoomService roomService;

    @GetMapping(value = "/room/{id}")
    public Room getRoom(@PathVariable int id) {
        return roomService.getRoom(id);
    }

    @GetMapping(value = "/rooms")
    public List<Room> getRooms() {
        return roomService.getRooms();
    }

    @PostMapping(value = "/room")
    public Room createRoom(@RequestBody Room room) {
        return roomService.createRoom(room);
    }

    @PutMapping(value = "/room")
    public Room updateRoom(@RequestBody Room room) {
        return roomService.updateRoom(room);
    }

    @DeleteMapping(value = "/room/{id}")
    public String deleteRoom(@PathVariable int id) {
        return roomService.deleteRoom(id);
    }
}
