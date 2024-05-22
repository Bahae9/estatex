package com.agency.server.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.agency.server.entities.Feedback;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {
    @Query("SELECT f FROM Feedback f WHERE f.userId != :userId ORDER BY f.rate DESC, f.updatedAt DESC LIMIT :limit")
    List<Feedback> findBestFeedbacksExcludingUser(@Param("userId") Integer userId, @Param("limit") Integer limit);

    @Query("SELECT f FROM Feedback f WHERE f.userId = :userId ORDER BY f.updatedAt DESC LIMIT :limit")
    List<Feedback> findLimiteFeedbacksBydUser(@Param("userId") Integer userId, @Param("limit") Integer limit);

    List<Feedback> findAllByUserIdNot(Integer userIdToExclude);

    List<Feedback> findAllByUserId(Integer userId);

    @Query("SELECT f.id, f.rate FROM Feedback f")
    List<Object[]> findAllIdsAndRates();
}
