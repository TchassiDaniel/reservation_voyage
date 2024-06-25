package com.reservation.reservation_voyage.services;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reservation.reservation_voyage.dto.ApiError;
import com.reservation.reservation_voyage.dto.ReservationDto;
import com.reservation.reservation_voyage.dto.StatisqueReservationDto;
import com.reservation.reservation_voyage.enumeration.StatutReservation;
import com.reservation.reservation_voyage.models.Reservation;
import com.reservation.reservation_voyage.models.Voyage;
import com.reservation.reservation_voyage.models.VoyageUtiliseVehicule;
import com.reservation.reservation_voyage.repository.ReservationRepository;
import com.reservation.reservation_voyage.repository.UtilisateurRepository;
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
public class ReservationService {
    
    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private UtilisateurRepository utilisateurRepository;
    @Autowired
    private VoyageRepository voyageRepository;
    @Autowired
    private VoyageUtiliseVehiculeRepository voyageUtiliseVehiculeRepository;

    public void creerReservation(ReservationDto reservationdto, ApiError apiError) {
        
        
        //On verifie si l'utilisateur existe
        if(this.utilisateurRepository.findById(reservationdto.getIdUtilisateur()).isEmpty() == true){
            apiError.setText("L'utilisateur n'existe pas");
        }else{
            if(this.voyageRepository.findById(reservationdto.getIdVoyage()).isEmpty() == true){
                apiError.setText("Le voyage n'existe pas");
            }else{
                //On regarde si on peut encore faire des reservations
                VoyageUtiliseVehicule voyageUtiliseVehicule = this.voyageUtiliseVehiculeRepository.findByIdVoyage(reservationdto.getIdVoyage()).get(0);
                if(voyageUtiliseVehicule.getNbrePlaceRestante() < reservationdto.getNbrePassager()){
                    apiError.setText("Le nombre de place restante est insuffisant");
                }else{
                    if(reservationdto.getNbrePassager() <= 0 || reservationdto.getPrixTotal() <= 0 || reservationdto.getDateReservation() == null){
                        apiError.setText("Les données sont incomplètes ou incorrectes");
                    }
                    else{
                        Voyage voyage= this.voyageRepository.findById(reservationdto.getIdVoyage()).orElse(null);

                        //On enregistre la reservation

                        Reservation reservation = new Reservation();
                        reservation.setIdReservation(UUID.randomUUID());
                        reservation.setDateReservation(new Date());//date actuelle
                        reservation.setNbrePassager(reservationdto.getNbrePassager());
                        reservation.setPrixTotal(reservationdto.getPrixTotal());
                        reservation.setStatutReservation(StatutReservation.EN_ATTENTE_DE_CONFIRMATION);
                        reservation.setIdUtilisateur(reservationdto.getIdUtilisateur());
                        reservation.setIdVoyage(reservationdto.getIdVoyage());
                        reservation.setTimerDate(voyage.getDateArriveePrevue().getTime()/1000 - 3600*48 - (new Date()).getTime()/1000);
                        this.reservationRepository.save(reservation);

                        //On met a jour le nombre de place restante
                        voyageUtiliseVehicule.setNbrePlaceRestante(voyageUtiliseVehicule.getNbrePlaceRestante() - reservationdto.getNbrePassager());
                        this.voyageUtiliseVehiculeRepository.save(voyageUtiliseVehicule);
                        //On met à jour le nombre de place reservée
                        voyage.setNombrePlaceReserve(voyage.getNombrePlaceReserve() + reservationdto.getNbrePassager());
                        this.voyageRepository.save(voyage);
                        apiError.setValue(reservation.getIdReservation().toString());
                        apiError.setText("La création s'est bien déroulé");
                    }
                }   
            }
        }
    }

    public void getAllReservationByUtilisateur(UUID idUtilisateur, ApiError apiError) {
        if(this.utilisateurRepository.findById(idUtilisateur).isEmpty() == true){
            apiError.setText("L'utilisateur n'existe pas");
        }else{
            apiError.setData(this.reservationRepository.findByIdUtilisateur(idUtilisateur));
            apiError.setText("Liste des reservations");
        }
    }

    public void getAllReservationByVoyage(UUID idVoyage, ApiError apiError) {
        if(this.voyageRepository.findById(idVoyage).isEmpty() == true){
            apiError.setText("Le voyage n'existe pas");
        }else{
            apiError.setData(this.reservationRepository.findByIdVoyage(idVoyage));
            apiError.setText("Liste des reservations");
        }
    }

    public void getReservationById(UUID idReservation, ApiError apiError) {
        if(this.reservationRepository.findById(idReservation).isEmpty() == true){
            apiError.setText("La reservation n'existe pas");
        }else{
            apiError.setData(this.reservationRepository.findById(idReservation));
            apiError.setText("La reservation");
        }
    }

    /**
     * @param idUtilisateur
     * @param apiError
     */
    public void getDayStatistique(UUID idUtilisateur, ApiError apiError) {
        if(this.utilisateurRepository.findById(idUtilisateur).isEmpty() == true){
            apiError.setText("L'utilisateur n'existe pas");
        }else{
            List<Reservation> reservations = this.reservationRepository.findByIdUtilisateur(idUtilisateur);
            StatisqueReservationDto statisqueReservation = new StatisqueReservationDto();
            String[] labels = {"1H", "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "10H",
            "11H", "12H", "13H", "14H", "15H", "16H", "17H", "18H", "19H", 
            "20H", "21H", "22H", "23H", "24H"};
            statisqueReservation.setLabels(labels);
        ;
            for(int i = 0; i < 24; i++){
                for(Reservation reservation : reservations){
                    if(reservation.getDateReservation().getHours() == i){
                        if(reservation.getStatutReservation() == StatutReservation.EN_ATTENTE_DE_CONFIRMATION){}
                            
                        }
                    }
            }
        }
    }

    public void getMonthStatistique(UUID idUtilisateur, ApiError apiError) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getMonthStatistique'");
    }

    public void getYearStatistique(UUID idUtilisateur, ApiError apiError) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getYearStatistique'");
    }

    public void modifierReservation(Reservation reservation, ApiError apiError) {
        if(this.reservationRepository.findById(reservation.getIdReservation()).isEmpty() == true){
            apiError.setText("La reservation n'existe pas");
        }else{
            this.reservationRepository.save(reservation);
            apiError.setText("La reservation a bien été modifié");
            
        }
    }
}
