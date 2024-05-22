package com.agency.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.agency.server.entities.Agent;

@Repository
public interface AgentRepository extends JpaRepository<Agent, Integer> {
    boolean existsByPhoneNumber(String phoneNumber);
}
