package com.reservation.reservation_voyage.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.cassandra.repository.AllowFiltering;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import com.reservation.reservation_voyage.models.Bagage;

@Repository
public interface BagageRepository extends CassandraRepository<Bagage, UUID> {
    @AllowFiltering
    public List<Bagage> findByIdPassager(UUID idPassager);
}
