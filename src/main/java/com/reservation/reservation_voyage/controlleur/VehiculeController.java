package com.reservation.reservation_voyage.controlleur;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reservation.reservation_voyage.dto.ApiError;
import com.reservation.reservation_voyage.services.VehiculeService;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@RestController
@RequestMapping("/vehicule")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class VehiculeController {
    @Autowired
    private VehiculeService vehiculeService;


    @GetMapping("/{idVehicule}")
    public ApiError getVehiculeById(@PathVariable UUID idVehicule) {
        ApiError apiError = new ApiError();
        this.vehiculeService.getVehiculeById(idVehicule, apiError);
        return apiError;
    }
}
