package com.reservation.reservation_voyage.models;

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
public class Classe {
    
    @PrimaryKey
    private int idClasse;

    private String typeVoyage;
    private String nomClasse;
    private double prix;
}
