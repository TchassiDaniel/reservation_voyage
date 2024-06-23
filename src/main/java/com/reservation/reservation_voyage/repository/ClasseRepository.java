package com.reservation.reservation_voyage.repository;

import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import com.reservation.reservation_voyage.models.Classe;

@Repository
public interface ClasseRepository extends CassandraRepository<Classe, Integer>{
    
}
