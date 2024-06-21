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
public class Client{
    
    @PrimaryKey
    private int idClient; // Identifiant unique
    private String nom;
    private String prenom;
    private String adresse;
    private String email;
    private String telephone;
}
