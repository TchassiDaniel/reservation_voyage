package com.reservation.reservation_voyage.models;

import java.util.Date;

import org.springframework.context.annotation.Primary;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import com.reservation.reservation_voyage.enumeration.StatutReservation;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Reservation {
    
    @PrimaryKey
    private int idReservation;

    private Date dateReserbation;
    private StatutReservation statut;
}
