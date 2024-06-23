package com.reservation.reservation_voyage.dto;

import java.util.Date;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ReservationDto {

    private Date dateReservation;
    private int nbrePassager;
    private double prixTotal;

    private UUID idUtilisateur; // Foreign key [FK]
    private UUID idVoyage; // Foreign key [FK]
}
