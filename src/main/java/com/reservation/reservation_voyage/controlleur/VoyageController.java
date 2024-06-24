package com.reservation.reservation_voyage.controlleur;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.reservation.reservation_voyage.dto.ApiError;
import com.reservation.reservation_voyage.services.VoyageService;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@RestController
@RequestMapping("/voyage")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
//@CrossOrigin(origins = "http://localhost:3000")
public class VoyageController {
    @Autowired
    private VoyageService voyageService;

    @GetMapping(path = "/{idVoyage}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ApiError getVoyageById(@PathVariable UUID idVoyage){
        ApiError apiError = new ApiError();
        this.voyageService.getVoyageById(idVoyage, apiError);
        return apiError;
    }

    @GetMapping(path = "/bordereau/{idVoyage}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ApiError getBordereauVoyageById(@PathVariable UUID idVoyage){
        ApiError apiError = new ApiError();
        this.voyageService.getBordereauVoyageById(idVoyage, apiError);
        return apiError;
    }

    @GetMapping(path = "/place/{idVoyage}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ApiError getPlaceRestanteVoyageById(@PathVariable UUID idVoyage){
        ApiError apiError = new ApiError();
        this.voyageService.getPlaceVoyageById(idVoyage, apiError);
        return apiError;
    }
}
