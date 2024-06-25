package com.reservation.reservation_voyage.services;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reservation.reservation_voyage.dto.ApiError;
import com.reservation.reservation_voyage.dto.BagageDto;
import com.reservation.reservation_voyage.models.Bagage;
import com.reservation.reservation_voyage.repository.BagageRepository;
import com.reservation.reservation_voyage.repository.PassagerRepository;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Service
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BagageService {

    @Autowired
    PassagerRepository passagerRepository;
    @Autowired
    BagageRepository bagageRepository;
    public void creerBagage(BagageDto bagageDto, ApiError apiError) {
        if(this.passagerRepository.findById(bagageDto.getIdPassager()).isEmpty() == true){
            apiError.setText("Le passager n'existe pas");
        }else{
            if(bagageDto.getPoids() < 0 || bagageDto.getPrix() < 0 || bagageDto.getNbreBagage() < 0){
                apiError.setText("Les données sont incomplètes");
            }else{
                Bagage bagage = new Bagage();
                bagage.setIdBagage(UUID.randomUUID());
                bagage.setPoids(bagageDto.getPoids());
                bagage.setIdPassager(bagageDto.getIdPassager());
                bagage.setPrix(bagageDto.getPrix());
                bagage.setNbreBagage(bagageDto.getNbreBagage());
                this.bagageRepository.save(bagage);
                apiError.setValue(bagage.getIdBagage().toString());
                apiError.setText("La création s'est bien dérouée");
            }
        }
    }
    public void getBagageById(UUID idBagage, ApiError apiError) {
        if(this.bagageRepository.findById(idBagage).isEmpty() == true){
            apiError.setText("Le bagage n'existe pas");
        }else{
            apiError.setData(this.bagageRepository.findById(idBagage));
            apiError.setText("La recherche s'est bien dérouée");
        }
    }
    public void getAllBagageByPassager(UUID idPassager, ApiError apiError) {
        if(this.passagerRepository.findById(idPassager).isEmpty() == true){
            apiError.setText("Le passager n'existe pas");
        }else{
            apiError.setData(this.bagageRepository.findByIdPassager(idPassager).get(0));
            apiError.setText("La recherche s'est bien dérouée");
        }
    }
    public void updateBagage(Bagage bagage, ApiError apiError) {
        if(this.bagageRepository.findById(bagage.getIdBagage()).isEmpty() == true){
            apiError.setText("Le bagage n'existe pas");
        }else{
            if(bagage.getPoids() < 0 || bagage.getPrix() < 0 || bagage.getNbreBagage() < 0){
                apiError.setText("Les données sont incomplètes");
            }else{
                this.bagageRepository.save(bagage);
                apiError.setText("La mise à jour s'est bien dérouée");
            }
        }
    }
    
}
