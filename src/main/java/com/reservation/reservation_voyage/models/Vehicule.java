package com.reservation.reservation_voyage.models;

import java.util.Date;

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
    private int numeroChassis;

    private short speedBox;
    private String categorie;
    private String photo;
    private int capacite;
    private int tempsRevision;
    private Date miseCirculation;
    private int prixRevision;
    private int prixConso;
    private EtatVehicule etat;
    private String immatriculation;
}
