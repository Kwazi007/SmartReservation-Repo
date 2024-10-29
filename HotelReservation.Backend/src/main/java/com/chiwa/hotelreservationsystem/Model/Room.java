package com.chiwa.hotelreservationsystem.Model;

import com.chiwa.hotelreservationsystem.enums.ROOMTYPE;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigInteger;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private ROOMTYPE roomType;

    @Column(nullable = false)
    private double rate;

    @Column(nullable = false)
    private int pax;

    @Column(nullable = false)
    private Boolean isBooked;

//    @ManyToMany
//    @JoinTable(
//            name = "lecturer_courses", // Name of the join table
//            joinColumns = @JoinColumn(name = "lecturer_id"),  // Foreign key to Lecturer
//            inverseJoinColumns = @JoinColumn(name = "course_id")  // Foreign key to Course
//    )
//    private List<Course> courses;  // List of courses this lecturer teaches
}
