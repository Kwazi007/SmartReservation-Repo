package com.chiwa.hotelreservationsystem.Service;

import com.chiwa.hotelreservationsystem.Model.Payment;
import com.chiwa.hotelreservationsystem.Model.Reservation;
import com.chiwa.hotelreservationsystem.Model.ReservationProducts;
import com.chiwa.hotelreservationsystem.Repo.PaymentRepo;
import com.chiwa.hotelreservationsystem.Repo.ReservationProductRepo;
import com.chiwa.hotelreservationsystem.Repo.ReservationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationService implements IReservationService {

    @Autowired
    private ReservationRepo reservationRepo;
    @Autowired
    private ReservationProductRepo reservationProductRepo;
    @Autowired
    private PaymentRepo paymentRepo;

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

        Reservation newReservation = new Reservation();
        newReservation.setCheckInDate(reservation.getCheckInDate());
        newReservation.setCheckOutDate(reservation.getCheckOutDate());
        newReservation.setFirstName(reservation.getFirstName());
        newReservation.setLastName(reservation.getLastName());
        newReservation.setPhone(reservation.getPhone());
        newReservation.setEmail(reservation.getEmail());
        newReservation.setAdultPax(reservation.getAdultPax());
        newReservation.setChildPax(reservation.getChildPax());
        newReservation.setIdNo(reservation.getIdNo());
        newReservation.setAddress((reservation.getAddress()));
        newReservation.setCountry(reservation.getCountry());
        newReservation.setTotalAmount(reservation.getTotalAmount());


        Reservation savedReservation = reservationRepo.save(newReservation);

        // Create reservation products
        for (ReservationProducts productDto : reservation.getReservationProducts()) {
            ReservationProducts product = new ReservationProducts();
            product.setReservation(savedReservation);
            product.setAdultPax(productDto.getAdultPax());
            product.setChildPax(productDto.getChildPax());
            product.setUnitPrice(productDto.getUnitPrice());
            product.setTotalAmount(productDto.getTotalAmount());
            product.setRoomType(productDto.getRoomType());
            product.setRoomId(productDto.getRoomId());
            product.setTotalAmount(productDto.getTotalAmount());

            reservationProductRepo.save(product);
        }

        for (Payment payment : reservation.getPayments()){
            Payment newPayment = new Payment();
            newPayment.setReservation(savedReservation);
            newPayment.setAmount(payment.getAmount());
            newPayment.setPaymentMethod(payment.getPaymentMethod());
            newPayment.setBank(payment.getBank());
            newPayment.setCurrency(payment.getCurrency());
            newPayment.setCardNo(payment.getCardNo());
            newPayment.setCreditHours(payment.getCreditHours());

            paymentRepo.save(newPayment);
        }
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
