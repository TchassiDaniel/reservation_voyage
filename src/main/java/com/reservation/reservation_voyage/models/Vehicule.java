package com.reservation.reservation_voyage.models;

import java.util.Date;
import java.util.UUID;

import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import com.reservation.reservation_voyage.enumeration.EtatVehicule;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Vehicule {
    @PrimaryKey
    private UUID idVehicule; // Auto-increment [PK]

    private String marque;
    private String modele;
    private Date anneeFabrication;
    private int nombrePlace;
    private double poidsBagage; // en kg
    private double vitesse; // en km/h
    private String immatriculation;
    private String lienPhoto;
    private EtatVehicule disponible;

}
