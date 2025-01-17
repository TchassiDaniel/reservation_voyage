package com.reservation.reservation_voyage.repository;

import java.util.UUID;

import org.springframework.data.cassandra.repository.AllowFiltering;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import com.reservation.reservation_voyage.models.Reservation;
import java.util.List;


@Repository
public interface ReservationRepository extends CassandraRepository<Reservation, UUID>{
    @AllowFiltering
    public List<Reservation> findByIdUtilisateur(UUID idUtilisateur);
    @AllowFiltering
    public List<Reservation> findByIdVoyage(UUID idVoyage);
}
