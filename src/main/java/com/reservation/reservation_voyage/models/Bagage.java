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
public class Bagage {
    @PrimaryKey
    
    private UUID idBagage; // Auto-increment [PK]
    
    private int nbreBagage;
    private double poids; // en kg
    private double prix;
    private UUID idPassager; // Foreign key [FK]

}