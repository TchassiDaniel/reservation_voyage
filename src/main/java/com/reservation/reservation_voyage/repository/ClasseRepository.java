package com.reservation.reservation_voyage.repository;

import org.springframework.data.cassandra.repository.CassandraRepository;

import com.reservation.reservation_voyage.models.Classe;

public interface ClasseRepository extends CassandraRepository<Classe, Integer>{
    
}
