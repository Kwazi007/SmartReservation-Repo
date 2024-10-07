package com.chiwa.hotelreservationsystem.Service;

import com.chiwa.hotelreservationsystem.Model.ReservationProducts;
import com.chiwa.hotelreservationsystem.Repo.ReservationProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationProductService implements IReservationProductService {
    
    @Autowired
    private ReservationProductRepo reservationProductRepo;

    @Override
    public ReservationProducts getReservationProduct(int id) {
        return reservationProductRepo.findById(id).get();
    }

    @Override
    public List<ReservationProducts> getReservationProducts() {
        return reservationProductRepo.findAll();
    }

    @Override
    public ReservationProducts createReservationProduct(ReservationProducts reservationProducts) {
        reservationProductRepo.save(reservationProducts);
        return reservationProducts;
    }

    @Override
    public ReservationProducts updateReservationProduct(ReservationProducts reservationProducts) {
        reservationProductRepo.save(reservationProducts);
        return reservationProducts;
    }

    @Override
    public String deleteReservationProduct(int id) {
        reservationProductRepo.deleteById(id);
        return "Enrollment with id " + id + " deleted";
    }
}
