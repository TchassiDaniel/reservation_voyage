package com.reservation.reservation_voyage.controlleur;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import com.reservation.reservation_voyage.dto.ApiError;
import com.reservation.reservation_voyage.dto.PassagerDto;
import com.reservation.reservation_voyage.services.PassagerService;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@RestController
@RequestMapping("/passager")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PassagerControler {
    @Autowired
    PassagerService passagerService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public ApiError creer(@RequestBody PassagerDto passagerDto){
        ApiError apiError = new ApiError();
        this.passagerService.creerPassager(passagerDto, apiError);
        return apiError;
    }

    @GetMapping(path = "/{idPassager}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ApiError getPassagerById(@PathVariable UUID idPassager){
        ApiError apiError = new ApiError();
        this.passagerService.getPassagerById(idPassager, apiError);
        return apiError;
    }

    @GetMapping(path = "/allByReservation/{idReservation}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ApiError getAllPassagerByReservation(@PathVariable UUID idReservation){
        ApiError apiError = new ApiError();
        this.passagerService.getAllPassagerByReservation(idReservation, apiError);
        return apiError;
    }
}
