package com.reservation.reservation_voyage.models;

import java.util.Date;
import java.util.UUID;

import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import com.reservation.reservation_voyage.enumeration.ClasseVoyage;
import com.reservation.reservation_voyage.enumeration.StatutVoyage;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Voyage {
    @PrimaryKey
    private UUID idVoyage; // Auto-increment [PK]

    private Date dateDepartPrevue; //Heure et Date
    private Date dateDepartEffective; //Heure et Date
    private Date dateArriveePrevue; //Heure et Date
    private Date dateArriveeEffective; //Heure et Date

    private double duree; // durée en minute
    private double prix;
    private String lieuDepart;
    private String lieuArrivee;
    private ClasseVoyage classeVoyage;

    private int nombrePlaceConfirme;
    private int nombrePlaceReserve;

    private StatutVoyage statut;


}
