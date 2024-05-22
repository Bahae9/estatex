package com.agency.server.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.agency.server.entities.Contract;

@Repository
public interface ContractRepository extends JpaRepository<Contract, Integer> {

    @Query(value = "SELECT * FROM contracts ORDER BY id DESC LIMIT :limit", nativeQuery = true)
    List<Contract> findLatestContracts(@Param("limit") int limit);
}