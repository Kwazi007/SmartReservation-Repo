package com.chiwa.hotelreservationsystem.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ReservationProducts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private int roomId;

    @Column(nullable = false)
    private String roomType;

    @Column(nullable = false)
    private int childPax;

    @Column(nullable = false)
    private int adultPax;

    @Column(nullable = false)
    private double unitPrice;

    @Column(nullable = false)
    private double totalAmount;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "reservation_id")
    private Reservation reservation;

//    @Column(nullable = false)
//    private int reservationId;
//
//    public int getReservationId() {
//        return reservationId;
//    }
//
//    public void setReservationId(int reservationId) {
//        this.reservationId = reservationId;
//    }

//    @ManyToOne
//    @JoinColumn(name = "course_id")
//    private Course course;
}
