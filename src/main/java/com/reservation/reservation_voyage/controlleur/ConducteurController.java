package com.reservation.reservation_voyage.controlleur;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.reservation.reservation_voyage.dto.ApiError;
import com.reservation.reservation_voyage.services.ConducteurService;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@RestController
@RequestMapping("/conducteur")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ConducteurController {
    @Autowired
    private ConducteurService conducteurService;

    @GetMapping("/{idConducteur}")
    @ResponseStatus(value = HttpStatus.OK)
    public ApiError getConducteurById(@PathVariable UUID idConducteur){
        ApiError apiError = new ApiError();
        this.conducteurService.getConducteurById(idConducteur, apiError);
        return apiError;
    }
}
