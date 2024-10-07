package com.chiwa.hotelreservationsystem.Model.AggregatedRoots;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@MappedSuperclass
public class BasicAggregatedRoot<T> {
//    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int Id;
}
