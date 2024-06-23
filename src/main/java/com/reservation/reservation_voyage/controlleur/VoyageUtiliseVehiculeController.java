package com.reservation.reservation_voyage.controlleur;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reservation.reservation_voyage.repository.VoyageUtiliseVehiculeRepository;
import com.reservation.reservation_voyage.services.VoyageUtiliseVehiculeService;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@RestController
@RequestMapping("/voyageUtiliseVehicule")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class VoyageUtiliseVehiculeController {
    @Autowired
    VoyageUtiliseVehiculeService voyageUtiliseVehiculeService;

}
