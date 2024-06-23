package com.reservation.reservation_voyage.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PlaceVoyageDto {
    private int nbrePlaceRestante;
    private int nbrePlaceTotale;
    private int nombrePlaceConfirme;
    private int nombrePlaceReserve;
}
