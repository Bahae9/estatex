package com.agency.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.agency.server.entities.Agent;
import com.agency.server.repositories.AgentRepository;

import java.util.List;
import java.util.Optional;

@Service
public class AgentService {

    @Autowired
    private AgentRepository agentRepository;

    public List<Agent> findAll() {
        return agentRepository.findAll();
    }

    public Optional<Agent> findById(Integer id) {
        return agentRepository.findById(id);
    }

    public Agent create(Agent agent) {
        return agentRepository.save(agent);
    }

    public Agent update(Integer id, Agent agentDetails) {
        Agent agent = agentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Agent not found with id: " + id));
        agent.setFullName(agentDetails.getFullName());
        agent.setPhoneNumber(agentDetails.getPhoneNumber());

        return agentRepository.save(agent);
    }

    public void delete(Integer id) {
        agentRepository.deleteById(id);
    }
}
