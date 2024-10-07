package com.chiwa.hotelreservationsystem.Controller;

import com.chiwa.hotelreservationsystem.Model.ReservationProducts;
import com.chiwa.hotelreservationsystem.Service.IReservationProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReservationProductController {
    @Autowired
    private IReservationProductService reservationProductService;

    @GetMapping(value = "/reservationProducts")
    public List<ReservationProducts> getAllReservationProducts() {
        return reservationProductService.getReservationProducts();
    }

    @PostMapping(value = "/reservationProduct")
    public ReservationProducts createReservationProduct(@RequestBody ReservationProducts reservationProducts) {
        return reservationProductService.createReservationProduct(reservationProducts);
    }

    @GetMapping(value = "/reservationProduct/{id}")
    public ReservationProducts getReservationProductById(@PathVariable int id) {
        return reservationProductService.getReservationProduct(id);
    }

    @PutMapping(value = "/reservationProduct")
    public ReservationProducts updateReservationProduct(@RequestBody ReservationProducts reservationProducts) {
        return reservationProductService.updateReservationProduct(reservationProducts);
    }

    @DeleteMapping(value = "/reservationProduct/{id}")
    public String deleteReservationProduct(@PathVariable int id) {
        return reservationProductService.deleteReservationProduct(id);
    }
}
