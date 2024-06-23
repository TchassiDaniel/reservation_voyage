package com.reservation.reservation_voyage.repository;

import java.util.UUID;

import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import com.reservation.reservation_voyage.models.Conducteur;

@Repository
public interface ConducteurRespository extends CassandraRepository<Conducteur, UUID>{
    
}