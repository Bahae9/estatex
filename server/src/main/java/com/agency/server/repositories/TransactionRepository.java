package com.agency.server.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.agency.server.entities.Transaction;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
   @Query(value = "SELECT * FROM transactions ORDER BY id DESC LIMIT :limit", nativeQuery = true)
    List<Transaction> findLatestTransactions(@Param("limit") int limit);
}