package com.reservation.reservation_voyage.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class StatisqueReservationDto {
    private String[] labels;
    private int[] confirmed;
    private int[] cancelled;
    private int[] pending;
    private int[] pieData;
}
