package com.reservation.reservation_voyage.models;

import java.util.Date;
import java.util.UUID;

import org.springframework.context.annotation.Primary;
import org.springframework.data.cassandra.core.mapping.Column;
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
    private UUID idReservation; // Auto-increment [PK]

    private Date dateReservation;
    private int nbrePassager;
    private double prixTotal;
    private StatutReservation statutReservation;
    private Long timerDate;

    private UUID idUtilisateur; // Foreign key [FK]
    private UUID idVoyage; // Foreign key [FK]
    
}
