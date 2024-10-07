package com.chiwa.hotelreservationsystem.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String paymentMethod;

    @Column(nullable = false)
    private double amount;

    @Column(nullable = false)
    private int creditHours;

    @Column(nullable = true)
    private String cardNo;

    @Column(nullable = true)
    private String bank;

    @ManyToOne
    @JoinColumn(name = "reservation_id")
    @JsonIgnore
    private Reservation reservation;

    @ManyToOne
    @JoinColumn(name = "currency_id")
    @JsonIgnore
    private Currency currency;

//    @OneToMany(mappedBy = "course") // Refers to the "course" field in Enrollment
//    @JsonIgnore
//    private List<ReservationProducts> reservationProducts;  // List of enrollments for this course
//    @ManyToMany(mappedBy = "courses")  // Lecturer side owns the relationship
//    private List<Room> rooms;  // List of lecturers teaching this course

}
