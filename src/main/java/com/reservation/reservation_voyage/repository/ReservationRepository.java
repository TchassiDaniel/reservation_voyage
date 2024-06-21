package com.reservation.reservation_voyage.repository;

import org.springframework.data.cassandra.repository.CassandraRepository;

import com.reservation.reservation_voyage.models.Reservation;

public interface ReservationRepository extends CassandraRepository<Reservation, Integer>{
    
}
