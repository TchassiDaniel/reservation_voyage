package com.reservation.reservation_voyage.dto;

import java.util.UUID;

import com.reservation.reservation_voyage.enumeration.GenrePassager;
import com.reservation.reservation_voyage.enumeration.TypePassager;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PassagerDto {
    private String nom;
    private String prenom; 
    private TypePassager type;
    private GenrePassager genre;
    private int age;
    private String NumPieceIdentification;

    private UUID idReservation; // Foreign key [FK]
}
