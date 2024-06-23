package com.reservation.reservation_voyage.controlleur;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.reservation.reservation_voyage.dto.ApiError;
import com.reservation.reservation_voyage.dto.ReservationDto;
import com.reservation.reservation_voyage.services.ReservationService;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@RestController
@RequestMapping("/reservation")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ReservationController {

    @Autowired
    private ReservationService reservationService;


        @GetMapping("/test")
    public String test() throws URISyntaxException, IOException, InterruptedException {
        return "user-service is still running"; //cryptoExchange.generateWallet().get("privateKey").toString();
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public ApiError creer(@RequestBody ReservationDto reservationDto){
        ApiError apiError = new ApiError();
        this.reservationService.creerReservation(reservationDto, apiError);
        return apiError;
    }


    @GetMapping(path = "/{idReservation}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ApiError getReservationById(@PathVariable UUID idReservation){
        ApiError apiError = new ApiError();
        this.reservationService.getReservationById(idReservation, apiError);
        return apiError;
    }

    @GetMapping(path = "/allByUser/{idUtilisateur}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ApiError getAllReservationByUtilisateur(@PathVariable UUID idUtilisateur){
        ApiError apiError = new ApiError();
        this.reservationService.getAllReservationByUtilisateur(idUtilisateur, apiError);
        return apiError;
    }

    @GetMapping(path = "/allByVoyage/{idVoyage}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ApiError getAllReservationByVoyage(@PathVariable UUID idVoyage){
        ApiError apiError = new ApiError();
        this.reservationService.getAllReservationByVoyage(idVoyage, apiError);
        return apiError;
    }
}
