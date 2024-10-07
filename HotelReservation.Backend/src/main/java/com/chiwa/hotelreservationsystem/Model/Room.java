package com.chiwa.hotelreservationsystem.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String roomType;

    @Column(nullable = false)
    private double rate;

    @Column(nullable = false)
    private int pax;

    @Column(nullable = false)
    private boolean isBooked;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL)
    private List<ReservationProducts> reservationProducts;

//    @ManyToMany
//    @JoinTable(
//            name = "lecturer_courses", // Name of the join table
//            joinColumns = @JoinColumn(name = "lecturer_id"),  // Foreign key to Lecturer
//            inverseJoinColumns = @JoinColumn(name = "course_id")  // Foreign key to Course
//    )
//    private List<Course> courses;  // List of courses this lecturer teaches
}
