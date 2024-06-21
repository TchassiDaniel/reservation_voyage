package com.reservation.reservation_voyage.models;

import java.util.Date;

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
public class Conducteur {
    @PrimaryKey
    private int code;

    private String photos;
    private String nom;
    private String prenom;
    private String adresse;
    private short etat;
    private short speedBox;
    private String categorie;
    private int volumeHoraire;
    private int salaireHeure;

}
