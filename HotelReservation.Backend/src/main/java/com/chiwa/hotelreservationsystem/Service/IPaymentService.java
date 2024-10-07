package com.chiwa.hotelreservationsystem.Service;

import com.chiwa.hotelreservationsystem.Model.Payment;

import java.util.List;

public interface IPaymentService {
    public Payment getPayment(int id);
    public List<Payment> getPayments();
    public Payment createPayment(Payment payment);
    public Payment updatePayment(Payment payment);
    public String deletePayment(int id);
}
