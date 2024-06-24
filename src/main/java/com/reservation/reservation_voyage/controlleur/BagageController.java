package com.reservation.reservation_voyage.controlleur;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.reservation.reservation_voyage.dto.ApiError;
import com.reservation.reservation_voyage.dto.BagageDto;
import com.reservation.reservation_voyage.services.BagageService;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@RestController
@RequestMapping("/bagage")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BagageController {
    @Autowired
    private BagageService bagageService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public ApiError creer(@RequestBody BagageDto bagageDto){
        ApiError apiError = new ApiError();
        this.bagageService.creerBagage(bagageDto, apiError);
        return apiError;
    }

    @GetMapping(path = "/{idBagage}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ApiError getBagageById(@PathVariable UUID idBagage){
        ApiError apiError = new ApiError();
        this.bagageService.getBagageById(idBagage, apiError);
        return apiError;
    }

    @GetMapping(path = "/allByPassager/{idPassager}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ApiError getAllBagageByPassager(@PathVariable UUID idPassager){
        ApiError apiError = new ApiError();
        this.bagageService.getAllBagageByPassager(idPassager, apiError);
        return apiError;
    }

}
