package com.reservation.reservation_voyage.services;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reservation.reservation_voyage.dto.ApiError;
import com.reservation.reservation_voyage.repository.ConducteurRespository;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Service
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ConducteurService {
    @Autowired
    private ConducteurRespository conducteurRespository;

    public void getConducteurById(UUID idConducteur, ApiError apiError) {
        if(this.conducteurRespository.findById(idConducteur).isEmpty() == true){
            apiError.setText("Le conducteur n'existe pas dans la BD");
        }else{
            apiError.setData(this.conducteurRespository.findById(idConducteur));
            apiError.setText("La recherche s'est bien dérouée");
        }
    }
}
