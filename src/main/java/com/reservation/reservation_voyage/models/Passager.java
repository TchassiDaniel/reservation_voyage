package com.reservation.reservation_voyage.models;

import java.util.UUID;

import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import com.reservation.reservation_voyage.enumeration.GenrePassager;
import com.reservation.reservation_voyage.enumeration.TypePassager;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Passager {
    @PrimaryKey
    private UUID idPassager; // Auto-increment [PK]

    private String nom;
    private String prenom; 
    private TypePassager type;
    private GenrePassager genre;
    private int age;
    private String NumPieceIdentification; // Unique

    private UUID idReservation; // Foreign key [FK]
}
