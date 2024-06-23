package com.reservation.reservation_voyage.models;

import java.util.UUID;

import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class VoyageUtiliseVehicule {
    @PrimaryKey
    private UUID idUtilise; // Auto-increment [PK]
    
    private UUID idVehicule; // Foreign key [FK]
    private UUID idVoyage; // Foreign key [FK]

    private int nbrePlaceRestante;

}