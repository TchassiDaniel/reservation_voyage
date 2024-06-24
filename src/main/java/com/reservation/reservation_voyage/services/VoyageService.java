package com.reservation.reservation_voyage.services;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reservation.reservation_voyage.dto.ApiError;
import com.reservation.reservation_voyage.dto.PlaceVoyageDto;
import com.reservation.reservation_voyage.enumeration.StatutReservation;
import com.reservation.reservation_voyage.models.Passager;
import com.reservation.reservation_voyage.models.Reservation;
import com.reservation.reservation_voyage.models.Voyage;
import com.reservation.reservation_voyage.models.VoyageUtiliseVehicule;
import com.reservation.reservation_voyage.repository.PassagerRepository;
import com.reservation.reservation_voyage.repository.ReservationRepository;
import com.reservation.reservation_voyage.repository.VehiculeRepository;
import com.reservation.reservation_voyage.repository.VoyageRepository;
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
public class VoyageService {
    @Autowired
    private VoyageRepository voyageRepository;
    @Autowired
    private PassagerRepository passagerRepository;
    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private VoyageUtiliseVehiculeRepository voyageUtiliseVehiculeRepository;
    @Autowired
    private VehiculeRepository vehiculeRepository;


    public void getVoyageById(UUID idVoyage, ApiError apiError) {
        if(this.voyageRepository.findById(idVoyage).isEmpty() == true){
            apiError.setText("Voyage introuvable");
        }
        else{
            apiError.setData(this.voyageRepository.findById(idVoyage));
            apiError.setText("Voyage retrouve");
        }
    }

    public void getBordereauVoyageById(UUID idVoyage, ApiError apiError) {
        if(this.voyageRepository.findById(idVoyage).isEmpty() == true){
            apiError.setText("Voyage introuvable");
        }
        else{
            List<Passager> bordereauPassagers = new ArrayList<Passager>();
            List<Reservation> listReservations = this.reservationRepository.findByIdVoyage(idVoyage);
            
            for(Reservation reservation : listReservations){
                if(reservation.getStatutReservation() == StatutReservation.CONFIRME){
                    bordereauPassagers.addAll(this.passagerRepository.findByIdReservation(reservation.getIdReservation()));
                }
            }
            apiError.setData(bordereauPassagers);

            apiError.setText("Voyage retrouve");
        }
}

    public void getPlaceVoyageById(UUID idVoyage, ApiError apiError) {
        if(this.voyageRepository.findById(idVoyage).isEmpty() == true){
            apiError.setText("Voyage introuvable");
        }else{
            PlaceVoyageDto placeVoyageDto = new PlaceVoyageDto();
            VoyageUtiliseVehicule v1 = this.voyageUtiliseVehiculeRepository.findByIdVoyage(idVoyage).get(0);
            Voyage voyage = this.voyageRepository.findById(idVoyage).orElse(null);
            //Nombre place disponible
            placeVoyageDto.setNbrePlaceRestante(v1.getNbrePlaceRestante());
            //Nombre place totale
            placeVoyageDto.setNbrePlaceTotale(this.vehiculeRepository.findById(v1.getIdVehicule()).orElse(null).getNombrePlace());
            //Nombre place confirme
            placeVoyageDto.setNombrePlaceConfirme(voyage.getNombrePlaceConfirme());
            //Nombre place reserve
            placeVoyageDto.setNombrePlaceReserve(voyage.getNombrePlaceReserve());
            apiError.setData(placeVoyageDto);
            apiError.setText("Nombre de place retrouve");
        }
       
    }
    
}
