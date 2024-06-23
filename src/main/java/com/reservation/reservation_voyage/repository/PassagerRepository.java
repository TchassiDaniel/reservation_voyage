package com.reservation.reservation_voyage.repository;

import java.util.UUID;

import org.springframework.data.cassandra.repository.AllowFiltering;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import com.reservation.reservation_voyage.models.Passager;
import java.util.List;


@Repository
public interface PassagerRepository extends CassandraRepository<Passager, UUID> {

    @AllowFiltering
    public List<Passager> findByIdReservation(UUID idReservation);
}
