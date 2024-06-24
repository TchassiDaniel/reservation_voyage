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
public class Conducteur {
    @PrimaryKey
    private UUID code;

    private String nom;
    private String prenom;
    private String adresse;
    private String categorie;
    private String telephone;
    private String email;
    private String lienPhoto;

}
