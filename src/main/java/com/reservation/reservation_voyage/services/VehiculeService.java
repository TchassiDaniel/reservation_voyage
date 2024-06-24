package com.reservation.reservation_voyage.services;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reservation.reservation_voyage.dto.ApiError;
import com.reservation.reservation_voyage.repository.VehiculeRepository;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Service
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class VehiculeService {
    @Autowired
    private VehiculeRepository vehiculeRepository;

    public void getVehiculeById(UUID idVehicule, ApiError apiError) {
        if(this.vehiculeRepository.findById(idVehicule).isEmpty() == true){
            apiError.setText("Vehicule introuvable");
        }
        else{
            apiError.setData(this.vehiculeRepository.findById(idVehicule));
            apiError.setText("Vehicule retrouve");
        }
    }    
}
