package com.reservation.reservation_voyage.services;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reservation.reservation_voyage.dto.ApiError;
import com.reservation.reservation_voyage.dto.PassagerDto;
import com.reservation.reservation_voyage.models.Passager;
import com.reservation.reservation_voyage.repository.PassagerRepository;
import com.reservation.reservation_voyage.repository.ReservationRepository;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Service
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PassagerService {
    @Autowired
    private PassagerRepository passagerRepository;
    @Autowired
    private ReservationRepository reservationRepository;
public void creerPassager(PassagerDto passagerDto, ApiError apiError) {
        if(this.reservationRepository.findById(passagerDto.getIdReservation()).isEmpty() == true){
            apiError.setText("La reservation n'existe pas");
        }else{
            if(passagerDto.getAge() <= 0 || passagerDto.getGenre() == null || passagerDto.getNom() == null || passagerDto.getPrenom() == null || passagerDto.getType() == null || passagerDto.getNumPieceIdentification() == null){
                apiError.setText("Les données sont incomplètes ou incorrectes");
            }else{
                Passager passager = new Passager();
                passager.setIdPassager(UUID.randomUUID());
                passager.setAge(passagerDto.getAge());
                passager.setGenre(passagerDto.getGenre());
                passager.setNom(passagerDto.getNom());
                passager.setPrenom(passagerDto.getPrenom());
                passager.setType(passagerDto.getType());
                passager.setNumPieceIdentification(passagerDto.getNumPieceIdentification());
                passager.setIdReservation(passagerDto.getIdReservation());
                this.passagerRepository.save(passager);
                apiError.setValue(passager.getIdPassager().toString());
                apiError.setText("La création s'est bien dérouée");
            }
        }

    }
public void getPassagerById(UUID idPassager, ApiError apiError) {
    if(this.passagerRepository.findById(idPassager).isEmpty() == true){
        apiError.setText("Le passager n'existe pas");
    }else{
        apiError.setData(this.passagerRepository.findById(idPassager));
        apiError.setText("La recherche s'est bien dérouée");
    }
}
public void getAllPassagerByReservation(UUID idReservation, ApiError apiError) {
    if(this.reservationRepository.findById(idReservation).isEmpty() == true){
        apiError.setText("La reservation n'existe pas");
    }else{
        apiError.setData(this.passagerRepository.findByIdReservation(idReservation));
        apiError.setText("La recherche s'est bien dérouée");
    }
}
public void updatePassager(Passager passager, ApiError apiError) {
    if(this.passagerRepository.findById(passager.getIdPassager()).isEmpty() == true){
        apiError.setText("Le passager n'existe pas");
    }else{
        if(passager.getAge() <= 0 || passager.getGenre() == null || passager.getNom() == null || passager.getPrenom() == null || passager.getType() == null || passager.getNumPieceIdentification() == null){
            apiError.setText("Les données sont incomplètes ou incorrectes");
        }else{
            this.passagerRepository.save(passager);
            apiError.setText("La mise à jour s'est bien dérouée");
        }
    }
}    
    
}
