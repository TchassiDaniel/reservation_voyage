package com.reservation.reservation_voyage.repository;

import org.springframework.data.cassandra.repository.CassandraRepository;

import com.reservation.reservation_voyage.models.Conducteur;

public interface ConducteurRespository extends CassandraRepository<Conducteur, Integer>{
    
}
