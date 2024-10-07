package com.chiwa.hotelreservationsystem.Service;

import com.chiwa.hotelreservationsystem.Model.Payment;
import com.chiwa.hotelreservationsystem.Repo.PaymentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService implements IPaymentService {

    @Autowired
    private PaymentRepo paymentRepo;

    @Override
    public Payment getPayment(int id) {
        return paymentRepo.findById(id).orElse(null);
    }

    @Override
    public List<Payment> getPayments() {
        return paymentRepo.findAll();
    }

    @Override
    public Payment createPayment(Payment payment) {
        return paymentRepo.save(payment);
    }

    @Override
    public Payment updatePayment(Payment payment) {
        return paymentRepo.save(payment);
    }

    @Override
    public String deletePayment(int id) {
        paymentRepo.deleteById(id);
        return "Payment deleted";
    }
}
