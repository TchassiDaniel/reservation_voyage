package com.reservation.reservation_voyage.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reservation.reservation_voyage.repository.VoyageUtiliseVehiculeRepository;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Service
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class VoyageUtiliseVehiculeService {

    @Autowired
    VoyageUtiliseVehiculeRepository voyageUtiliseVehiculeRepository;
}
