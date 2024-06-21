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
public class Voyage {
    @PrimaryKey
    private int idVoyage;

    private int idCond;

    private int idVeh;

    private double duree;

    private Date dateHeureDepart;

    private String destination;

    private String villeDepart;

    private int prixPeage;

    private int prixBillet;
}
