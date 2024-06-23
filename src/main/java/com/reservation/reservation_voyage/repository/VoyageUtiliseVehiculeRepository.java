package com.reservation.reservation_voyage.repository;

import java.util.UUID;

import org.springframework.data.cassandra.repository.AllowFiltering;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import com.reservation.reservation_voyage.models.VoyageUtiliseVehicule;
import java.util.List;


@Repository
public interface VoyageUtiliseVehiculeRepository extends CassandraRepository<VoyageUtiliseVehicule, UUID>{
    @AllowFiltering
    List<VoyageUtiliseVehicule> findByIdVoyage(UUID idVoyage);

    
}
