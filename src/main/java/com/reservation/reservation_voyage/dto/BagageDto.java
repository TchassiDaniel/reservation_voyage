package com.reservation.reservation_voyage.dto;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BagageDto {
    private int nbreBagage;
    private double poids; // en kg
    private double prix;
    private UUID idPassager; // Foreign key [FK]    
}
