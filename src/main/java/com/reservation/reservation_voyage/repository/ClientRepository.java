package com.reservation.reservation_voyage.repository;

import org.springframework.data.cassandra.repository.CassandraRepository;

import com.reservation.reservation_voyage.models.Client;

public interface ClientRepository extends CassandraRepository<Client, Integer>{
    
}
