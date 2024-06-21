package com.reservation.reservation_voyage.repository;

import org.springframework.data.cassandra.repository.CassandraRepository;

import com.reservation.reservation_voyage.models.Voyage;

public interface VoyageRepository extends CassandraRepository<Voyage, Integer>{
    
}
