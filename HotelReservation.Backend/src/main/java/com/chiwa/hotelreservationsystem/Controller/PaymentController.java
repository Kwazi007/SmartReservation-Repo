package com.chiwa.hotelreservationsystem.Controller;

import com.chiwa.hotelreservationsystem.Model.Payment;
import com.chiwa.hotelreservationsystem.Service.IPaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PaymentController {

    @Autowired
    private IPaymentService paymentService;

    @GetMapping(value = "/payments")
    public List<Payment> getAllPayments() {
        return paymentService.getPayments();
    }

    @PostMapping(value = "/payment")
    public Payment createPayment(@RequestBody Payment payment) {
        return paymentService.createPayment(payment);
    }

    @GetMapping(value = "/payment/{id}")
    public Payment getPaymentById(@PathVariable int id) {
        return paymentService.getPayment(id);
    }

    @PutMapping(value = "/payment")
    public Payment updatePayment(@RequestBody Payment payment) {
        return paymentService.updatePayment(payment);
    }

    @DeleteMapping(value = "/payment/{id}")
    public String deletePayment(@PathVariable int id) {
        return paymentService.deletePayment(id);
    }
}
