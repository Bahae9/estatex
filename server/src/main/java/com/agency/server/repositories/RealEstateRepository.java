package com.agency.server.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.agency.server.entities.RealEstate;

@Repository
public interface RealEstateRepository extends JpaRepository<RealEstate, Integer> {
    @Query(value = "SELECT * FROM realestates ORDER BY updatedAt DESC LIMIT :limit", nativeQuery = true)
    List<RealEstate> findLatestRealEstates(@Param("limit") int limit);

    List<RealEstate> findAllByUserId(Integer userId);
}
