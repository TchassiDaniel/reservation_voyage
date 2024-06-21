package com.reservation.reservation_voyage.repository;

import org.springframework.data.cassandra.repository.CassandraRepository;

import com.reservation.reservation_voyage.models.Vehicule;

public interface VehiculeRepository extends CassandraRepository<Vehicule, Integer>{
    
}
